import FarmStatusBanner from "../../components/farm i/FarmStatusBanner";
import GlobalFarmControl from "../../components/farm i/GlobalFarmControl";
import FarmGrid from "../../components/farm i/FarmGrid";


const FarmTab = () => {
  return (
    <div className="space-y-4">
      <FarmStatusBanner />
      <GlobalFarmControl />
      <FarmGrid />
    </div>
  );
};
export default FarmTab