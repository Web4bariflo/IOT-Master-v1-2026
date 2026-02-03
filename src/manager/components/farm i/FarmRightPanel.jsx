import RightPanel from "../common/RightPanel";
import CheckTrayActive from "../../../assets/Images/checktrayActive.png";

const FarmRightPanel = (props) => {
  return (
  <RightPanel {...props} activeTab={POND_TABS.FARM} />

  );
};

export default FarmRightPanel;
