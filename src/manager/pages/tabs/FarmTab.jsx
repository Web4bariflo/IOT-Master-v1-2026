import FarmStatusBanner from "../../components/farm i/FarmStatusBanner";
import GlobalFeederControl from "../../components/feeders/GlobalFeederControl";
import FarmGrid from "../../components/farm i/FarmGrid";


const FarmTab = ({ applyAll, setApplyAll, activeTab }) => {
  return (
    <div className="space-y-4">
      <FarmStatusBanner applyAll={applyAll} />
      <GlobalFeederControl applyAll={applyAll} setApplyAll={setApplyAll} />
      <FarmGrid applyAll={applyAll} activeTab={activeTab} /> {/* pass activeTab */}
    </div>
  );
};

export default FarmTab;
