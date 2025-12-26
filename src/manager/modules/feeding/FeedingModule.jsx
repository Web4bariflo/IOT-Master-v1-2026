import React from "react";
import Feeding from "./devices/Feeding";
import FeedI from "./devices/FeedI";

const FeedingModule = ({ pondId }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-2">{pondId}</h2>
      <Feeding />
      <div className="my-6 border-t border-gray-200" />
      <FeedI />
    </>
  );
};

export default FeedingModule;
