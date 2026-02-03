import AutoFeederStatusPanel from "../feeders/AutoFeederStatusPanel";
import AlertsPanel from "../alerts/AlertsPanel";
import FeederActive from "../../../assets/Images/FeedersActive.png";
import CheckTrayActive from "../../../assets/Images/checktrayActive.png";
import { POND_TABS } from "../../constants/PondTabs";

const RightPanel = ({ activeTab }) => {
  if (activeTab === POND_TABS.MAP) return null;

  const feederImageMap = {
    [POND_TABS.FEEDER]: FeederActive,
    [POND_TABS.FARM]: CheckTrayActive,
  };

  const feederImage = feederImageMap[activeTab] || FeederActive;

  return (
    <div className="w-80 border-l p-3 space-y-4 bg-gray-50">
      {/* Pass feederImage as a prop */}
      <AutoFeederStatusPanel feederImage={feederImage} />
      <AlertsPanel feederImage={feederImage} />
    </div>
  );
};

export default RightPanel;
