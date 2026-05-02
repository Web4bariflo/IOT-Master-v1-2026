// import AutoFeederStatusPanel from "../feeders/AutoFeederStatusPanel";
// import AlertsPanel from "../alerts/AlertsPanel";
// import FeederActive from "../../../assets/Images/FeedersActive.png";
// import CheckTrayActive from "../../../assets/Images/checktrayActive.png";
// import { POND_TABS } from "../../constants/PondTabs";

// const RightPanel = ({ activeTab }) => {
//   if (activeTab === POND_TABS.MAP) return null;

//   const feederImageMap = {
//     [POND_TABS.FEEDER]: FeederActive,
//     [POND_TABS.FARM]: CheckTrayActive,
//   };

//   const feederImage = feederImageMap[activeTab] || FeederActive;

//   return (
//     <div className="w-80 border-l p-3 space-y-4 bg-gray-50">
//       {/* Pass feederImage as a prop */}
//       <AutoFeederStatusPanel feederImage={feederImage} />
//       <AlertsPanel feederImage={feederImage} />
//     </div>
//   );
// };

// export default RightPanel;


import DeviceStatusPanel from "../common/DeviceStatusPanel";
import { DEVICE_CONFIG } from "../../constants/DeviceConfig";
import { POND_TABS } from "../../constants/PondTabs";
import FeederActive from "../../../assets/Images/FeedersActive.png";
import CheckTrayActive from "../../../assets/Images/checktrayActive.png";
import PowerMonImg from "../../../assets/Images/PowerMon.png";
import AlertsPanel from "../alerts/AlertsPanel";
const tabMap = {
  [POND_TABS.FEEDER]: DEVICE_CONFIG.FEEDER,
  [POND_TABS.FARM]: DEVICE_CONFIG.FARM,
  [POND_TABS.POWER_MON]: DEVICE_CONFIG.POWER,
};

const RightPanel = ({ activeTab }) => {
  if (activeTab === POND_TABS.MAP) return null;

  const config = tabMap[activeTab] || DEVICE_CONFIG.FEEDER;

  // ✅ ADD THIS PART
  const feederImageMap = {
    [POND_TABS.FEEDER]: FeederActive,
    [POND_TABS.FARM]: CheckTrayActive,
    [POND_TABS.POWER_MON]: PowerMonImg,
  };

  const feederImage = feederImageMap[activeTab] || FeederActive;

  return (
    <div className="w-80 border-l p-3 bg-gray-50 flex flex-col gap-8">
      <DeviceStatusPanel 
        config={config} 
        feederImage={feederImage}
      />
      <AlertsPanel feederImage={feederImage} />
    </div>
  );
};

export default RightPanel;