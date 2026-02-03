import React from "react";
import { useLocation } from "react-router-dom";
import Feeding from "./devices/Feeding";
import FeedI from "./devices/FeedI";

const FeedingModule = (props) => {
  const location = useLocation();
  
  // Priority: props -> location state -> empty
  // const pondId = props.pondId || location.state?.pondId;
  const pondName = props.pondName || location.state?.pondName || "Unknown Pond";

  return (
    <>
      <div className=" p-6">
        <h2 className="text-lg font-semibold mb-4">{pondName}</h2>

        {/* FEEDING */}
        <div className=" mb-6">
          <Feeding/>
        </div>

        {/* FARM I */}
        <div className="">
          <FeedI />
        </div>
      </div>
    </>
  );
};

export default FeedingModule;