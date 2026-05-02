// import { useMqtt } from "../../../context/MqttContext";

// const AlertsPanel = ({ feederImage }) => {
//   const { deviceStatus } = useMqtt();

//   const alerts = Object.entries(deviceStatus)
//     .filter(([_, d]) => d.alert)
//     .map(([id, d]) => ({
//       id,
//       message: d.alert,
//       time: d.lastSeen,
//     }));

//   if (!alerts.length) {
//     return (
//       <div className="bg-green-50 border rounded-xl p-3 text-sm">
//         ✅ No active alerts
//       </div>
//     );
//   }

//   return (
//     <div className="bg-[#FFECEC] border border-[#f5c2c2] rounded-xl p-3 space-y-3">
//       <h3 className="text-sm font-semibold">Alerts</h3>

//       {alerts.map((a) => (
//         <div key={a.id} className="bg-[#FFF1F1] rounded-lg p-3">
//           <div className="flex gap-3">
//             <img src={feederImage} className="w-8 h-8" />
//             <div>
//               <div className="text-sm font-semibold">{a.id}</div>
//               <div className="text-xs">{a.message}</div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
// export default AlertsPanel;

import { useMqtt } from "../../../context/MqttContext";

const AlertsPanel = ({ feederImage }) => {
  const { deviceStatus } = useMqtt();

  const alerts = Object.entries(deviceStatus)
    .filter(([_, d]) => d.alert)
    .map(([id, d]) => ({
      id,
      message: d.alert,
      time: d.lastSeen,
    }));

  if (!alerts.length) {
    return (
      <div className="bg-green-50 border rounded-xl p-3 text-sm">
        ✅ No active alerts
      </div>
    );
  }

  return (
    <div className="bg-[#FFECEC] border border-[#f5c2c2] rounded-xl p-3 space-y-3">
      <h3 className="text-sm font-semibold">Alerts</h3>

      {alerts.map((a) => (
        <div key={a.id} className="bg-[#FFF1F1] rounded-lg p-3">
          <div className="flex gap-3">
            <img src={feederImage} className="w-8 h-8" />
            <div>
              <div className="text-sm font-semibold">{a.id}</div>
              <div className="text-xs">{a.message}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AlertsPanel;