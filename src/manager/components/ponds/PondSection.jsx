import React, { useEffect, useState } from "react";
import axios from "axios";

import PondMap from "./PondMap";
import PondSummaryCard from "./PondSummaryCard";
import FeederGrid from "../feeders/FeederGrid";
import FeedingStatusBanner from "../feeders/FeedingStatusBanner";
import GlobalFeederControl from "../feeders/GlobalFeederControl";
import FarmTab from "../../pages/tabs/FarmTab";
import { POND_TABS } from "../../constants/PondTabs";

const PondSection = ({ activeTab }) => {
  const [applyAll, setApplyAll] = useState(false);


  return (
    <div className="space-y-4">
      {/* MAP + SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 w-full">
          <PondMap />
        </div>
        <div className="w-full">
          <PondSummaryCard />
        </div>
      </div>

      {/* FEEDING TAB */}
      {activeTab === POND_TABS.FEEDING && (
        <>
          <FeedingStatusBanner applyAll={applyAll} />
          <GlobalFeederControl
            applyAll={applyAll}
            setApplyAll={setApplyAll}
          />
          <FeederGrid applyAll={applyAll}/>
        </>
      )}

      {/* FARM TAB */}
      {activeTab === POND_TABS.FARM && (
        <FarmTab applyAll={applyAll} setApplyAll={setApplyAll} />
      )}
    </div>
  );
};

export default PondSection;
