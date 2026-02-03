// import React, { useState, useEffect } from "react";

// import axios from "axios";
// import PondMap from "./PondMap";
// import PondSummaryCard from "./PondSummaryCard";
// import FeederGrid from "../feeders/FeederGrid";
// import FeedingStatusBanner from "../feeders/FeedingStatusBanner";
// import GlobalFeederControl from "../feeders/GlobalFeederControl";
// import FarmTab from "../../pages/tabs/FarmTab";
// import { POND_TABS } from "../../constants/PondTabs";

// const PondSection = ({ activeTab }) => {
//   const [applyAll, setApplyAll] = useState(false);
//   const [devices, setDevices] = useState([]);

//   useEffect(() => {
//   if (activeTab === POND_TABS.FEEDING) {
//     axios
//       .get("http://192.168.1.40:8001/deviceid_view/31/?device_type=Feeding")
//       .then((res) => {
//         console.log("API RESPONSE:", res.data);
//         setDevices(res.data.devices);
//       })
//       .catch((err) => {
//         console.error("API ERROR:", err);
//       });
//   }
// }, [activeTab]);



//   return (
//     <div className="space-y-4">

//   {/* MAP + SUMMARY */}
//   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//     <div className="md:col-span-2 w-full">
//       <PondMap />
//     </div>
//     <div className="w-full">
//       <PondSummaryCard />
//     </div>
//   </div>

//   {/* FEEDING TAB */}
//   {activeTab === POND_TABS.FEEDING && (
//     <>
//       <FeedingStatusBanner applyAll={applyAll} />
//       <GlobalFeederControl applyAll={applyAll} setApplyAll={setApplyAll} />
//       <FeederGrid applyAll={applyAll} devices={devices} />
//     </>
//   )}

//   {/* FARM TAB */}
//   {activeTab === POND_TABS.FARM && (
//     <FarmTab applyAll={applyAll} setApplyAll={setApplyAll} />
//   )}
// </div>

//   );
// };

// export default PondSection;

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
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // ⛔ Clear devices when not on Feeding tab
    if (activeTab !== POND_TABS.FEEDING) {
      setDevices([]);
      return;
    }

    const fetchDevices = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.40:8001/deviceid_view/31/?device_type=Feeding"
        );

        console.log("API RESPONSE:", response.data);

        // ✅ Safe assignment
        setDevices(response.data?.devices || []);
      } catch (error) {
        console.error("API ERROR:", error);
        setDevices([]); // ⬅️ important to avoid stale UI
      }
    };

    fetchDevices();
  }, [activeTab]);

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
          <FeederGrid applyAll={applyAll} devices={devices} />
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
