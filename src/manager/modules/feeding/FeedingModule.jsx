import React from "react";
import Feeding from "./devices/Feeding";
import FeedI from "./devices/FeedI";

const FeedingModule = ({ pondId, pondName }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-2">{pondName}</h2>
      <Feeding pondId={pondId} />
      <div className="my-6 border-t border-gray-200" />
      <FeedI pondId={pondId} />
    </>
  );
};

export default FeedingModule;
