import { useState } from "react";
import FarmCard from "./FarmCard";
import CheckTrayActive from "../../../assets/Images/checktrayActive.png"; // Farm image

const FarmGrid = ({ applyAll }) => {
  const [view, setView] = useState("grid");

  const feeders = [
    { id: "Feeder 1" },
    { id: "Feeder 2" },
    { id: "Feeder 3" },
  ];

  return (
    <div className="border rounded-lg p-3 bg-white space-y-3">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-800">Feeders</h3>

        {/* ICON TOGGLE */}
        <div className="">
          <button
            onClick={() => setView("grid")}
            className={`p-1.5 rounded ${
              view === "grid" ? "bg-white shadow text-blue-600" : "text-gray-500"
            }`}
          >
            <i className="bi bi-grid-3x3-gap text-sm" />
          </button>

          <button
            onClick={() => setView("list")}
            className={`p-1.5 rounded ${
              view === "list" ? "bg-white shadow text-blue-600" : "text-gray-500"
            }`}
          >
            <i className="bi bi-list-ul text-sm" />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className={`grid ${view === "grid" ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
        {feeders.map((feeder) => (
          <FarmCard
            key={feeder.id}
            feeder={feeder}
            applyAll={applyAll}
            feederImage={CheckTrayActive} // Pass the farm image here
          />
        ))}
      </div>
    </div>
  );
};

export default FarmGrid;
