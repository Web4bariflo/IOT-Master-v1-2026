import FeederGrid from "../feeders/FeederGrid";
import FeedingStatusBanner from "../feeders/FeedingStatusBanner";
import GlobalFeederControl from "../feeders/GlobalFeederControl";
import PondMap from "./PondMap";
import PondSummaryCard from "./PondSummaryCard";
import FarmTab from "../../pages/tabs/FarmTab";

import { POND_TABS } from "../../constants/PondTabs";

const PondSection = ({ activeTab }) => {
  return (
    <div className="space-y-4">
      {/* COMMON HEADER (Feeding + Farm) */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <PondMap />
        </div>
        <PondSummaryCard />
      </div>

      {/* FEEDING TAB */}
      {activeTab === POND_TABS.FEEDING && (
        <>
          <FeedingStatusBanner />
          <GlobalFeederControl />
          <FeederGrid />
        </>
      )}

      {/* FARM TAB */}
      {activeTab === POND_TABS.FARM && <FarmTab />}
    </div>
  );
};

export default PondSection;
