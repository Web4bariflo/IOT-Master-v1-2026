import { useState } from "react";
import FarmCard from "./FarmCard";

const feeders = [
  { id: "789458" },
  { id: "789459" },
  { id: "789460" },
];

const FarmGrid = () => {
  const [view, setView] = useState("grid");

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
              view === "grid"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            <i className="bi bi-grid-3x3-gap text-sm" />
          </button>

          <button
            onClick={() => setView("list")}
            className={`p-1.5 rounded ${
              view === "list"
                ? "bg-white shadow text-blue-600"
                : "text-gray-500"
            }`}
          >
            <i className="bi bi-list-ul text-sm" />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-2 gap-4"
            : "flex flex-col gap-3"
        }
      >
        {feeders.map((feeder) => (
          <FarmCard
            key={feeder.id}
            feeder={feeder}
            view={view}
          />
        ))}
      </div>
    </div>
  );
};

export default FarmGrid;
