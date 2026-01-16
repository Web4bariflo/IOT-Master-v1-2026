import { useState } from "react";
import { useMqtt } from "../../context/MqttContext";
import { MQTT_TOPICS } from "../../mqtt/mqttTopics";
import { scheduleFeeding, abortFeeding } from "../../mqtt/mqttActions";
import PondSection from "../components/ponds/PondSection";
import RightPanel from "../components/common/RightPanel";
import PondTabs from "../components/PondTabs";
import { POND_TABS } from "../constants/PondTabs";
import MapTab from "./tabs/MapTab";
import FarmTab from "./tabs/FarmTab";


// export const Dashboard = () => {
//   const { connected, deviceState, deviceId, client, rawMessages } = useMqtt();

//   /* ---------------- FORM STATE ---------------- */
//   const [time, setTime] = useState("06:00");
//   const [duration, setDuration] = useState(60);
//   const [feedRpm, setFeedRpm] = useState(100);
//   const [sprinklerRpm, setSprinklerRpm] = useState(2000);

//   const disabled =
//     !connected ||
//     !deviceState.online ||
//     deviceState.mode !== "auto" ||
//     deviceState.acPower !== "ON";

//   return (
//     <div className="p-4 space-y-4 bg-gray-100 min-h-screen">
//       {/* ================= TOP STATUS ================= */}
//       <div className="border rounded p-4 bg-white flex justify-between items-center">
//         <div>
//           <h3 className="font-semibold text-lg">AUTO Feeder Dashboard</h3>
//           <p className="text-sm text-gray-500">Device ID: {deviceId}</p>
//         </div>

//         <div className="flex gap-6 text-sm">
//           <span>MQTT: {connected ? "🟢 Connected" : "🔴 Disconnected"}</span>
//           <span>Device: {deviceState.online ? "🟢 Online" : "🔴 Offline"}</span>
//           <span>
//             Mode: <b>{deviceState.mode?.toUpperCase()}</b>
//           </span>
//           <span>
//             Power: {deviceState.acPower === "ON" ? "⚡ ON" : "❌ OFF"}
//           </span>
//         </div>
//       </div>

//       {/* ================= MAIN GRID ================= */}
//       <div className="grid grid-cols-2 gap-4">
//         {/* ================= SCHEDULE ================= */}
//         <div className="border rounded p-4 bg-white">
//           <h4 className="font-semibold mb-3">Schedule Feeding</h4>

//           <div className="grid grid-cols-2 gap-3 text-sm">
//             <div>
//               <label className="block text-gray-500">Start Time</label>
//               <input
//                 type="time"
//                 value={time}
//                 onChange={(e) => setTime(e.target.value)}
//                 className="w-full border rounded px-2 py-1"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-500">Duration (minutes)</label>
//               <input
//                 type="number"
//                 value={duration}
//                 onChange={(e) => setDuration(Number(e.target.value))}
//                 className="w-full border rounded px-2 py-1"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-500">Feeder RPM (0–200)</label>
//               <input
//                 type="number"
//                 value={feedRpm}
//                 onChange={(e) => setFeedRpm(Number(e.target.value))}
//                 className="w-full border rounded px-2 py-1"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-500">Sprinkler RPM</label>
//               <select
//                 value={sprinklerRpm}
//                 onChange={(e) => setSprinklerRpm(Number(e.target.value))}
//                 className="w-full border rounded px-2 py-1"
//               >
//                 <option value={1000}>1000</option>
//                 <option value={2000}>2000</option>
//                 <option value={3000}>3000</option>
//                 <option value={4000}>4000</option>
//               </select>
//             </div>
//           </div>

//           <button
//             disabled={disabled}
//             onClick={() =>
//               scheduleFeeding(
//                 client,
//                 deviceId,
//                 time,
//                 duration,
//                 feedRpm,
//                 sprinklerRpm
//               )
//             }
//             className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
//           >
//             Schedule Feeding
//           </button>

//           {disabled && (
//             <p className="text-xs text-red-500 mt-2">
//               Device must be ONLINE, AUTO mode & AC ON
//             </p>
//           )}
//         </div>

//         {/* ================= FEEDING STATUS ================= */}
//         <div className="border rounded p-4 bg-white">
//           <h4 className="font-semibold mb-2">Feeding Status</h4>

//           <p>
//             Status:{" "}
//             <b
//               className={
//                 deviceState.feedingStatus === "Active"
//                   ? "text-green-600"
//                   : "text-gray-700"
//               }
//             >
//               {deviceState.feedingStatus}
//             </b>
//           </p>

//           {deviceState.feedingWindow && (
//             <p className="mt-1">Window: {deviceState.feedingWindow}</p>
//           )}

//           <div className="mt-3 text-xs text-gray-500 border-t pt-2">
//             {deviceState.lastAutoStatus}
//           </div>

//           <button
//             disabled={!deviceState.online}
//             onClick={() => abortFeeding(client, deviceId)}
//             className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
//           >
//             Abort Feeding
//           </button>
//         </div>
//       </div>

//       {/* ================= ALERT ================= */}
//       {deviceState.alert && (
//         <div className="border rounded p-3 bg-red-50 text-red-700">
//           ⚠️ {deviceState.alert}
//         </div>
//       )}

//       {/* ================= DEBUG ================= */}
//       <div className="border rounded p-4 bg-white">
//         <h4 className="font-semibold mb-2">MQTT Debug (Last 10 Messages)</h4>

//         <div className="text-xs max-h-48 overflow-auto space-y-1">
//           {rawMessages.slice(0, 10).map((msg, i) => (
//             <div key={i}>
//               <b>{msg.topic}</b> → {msg.payload}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(POND_TABS.FEEDING);

  /* MAP TAB → FULL MAP ONLY */
  if (activeTab === POND_TABS.MAP) {
    return (
      <div className="p-4">
        <PondTabs activeTab={activeTab} onChange={setActiveTab} />
        <MapTab />
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Left Main Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <PondTabs activeTab={activeTab} onChange={setActiveTab} />
        <PondSection activeTab={activeTab} />
      </div>

      {/* Right Panel */}
      <RightPanel activeTab={activeTab} />
    </div>
  );
};

export default Dashboard;