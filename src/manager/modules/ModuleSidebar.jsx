import React from "react";

const ModuleSidebar = ({ activeModule, setActiveModule }) => {
  return (
    <div className="w-56 bg-white border-r p-4 space-y-3">
      <button
        onClick={() => setActiveModule("feeding")}
        className={`w-full py-2 rounded-lg font-medium ${
          activeModule === "feeding"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        Feeding Module
      </button>

      <button
        onClick={() => setActiveModule("energy")}
        className={`w-full py-2 rounded-lg font-medium ${
          activeModule === "energy"
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        Energy Module
      </button>
    </div>
  );
};

export default ModuleSidebar;
