import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ModuleSidebar from "./ModuleSidebar";
import FeedingModule from "./feeding/FeedingModule";
import EnergyModule from "./energy/EnergyModule";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const PondModulePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pondId = location.state?.pondId;
  const pondName = location.state?.pondName;

  const [activeModule, setActiveModule] = useState("feeding");

  return (
    <div className="flex h-full">
      {/* LEFT SIDEBAR */}
      <ModuleSidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
      />

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-6 bg-gray-50">
        <button
          onClick={() => navigate("/manager")}
          className="ml-auto p-1 rounded hover:bg-gray-100"
          aria-label="Back"
          title="Back to Manager"
        >
          <AiOutlineArrowLeft className="text-xl text-gray-600" />
        </button>

        {activeModule === "feeding" && (
          <FeedingModule pondId={pondId} pondName={pondName} />
        )}

        {activeModule === "energy" && <EnergyModule pondname={pondName} />}
      </div>
    </div>
  );
};

export default PondModulePage;
