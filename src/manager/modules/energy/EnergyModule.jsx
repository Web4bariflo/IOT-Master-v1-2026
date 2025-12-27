import React from "react";
import Aeration from "./devices/Aeration";
import EPFC from "./devices/EPFC";

const EnergyModule = ({ pondname }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-2">{pondname}</h2>
      <Aeration/>
      <div className="my-6 border-t border-gray-200" />
      <EPFC/>
    </>
  );
};

export default EnergyModule;
