import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className="d-flex flex-column text-black"
      style={{
        backgroundColor: "#D9D9D9",
      }}
    >
      {/* Sidebar */}
      <div className="d-flex flex-column align-items-center justify-content-between p-4">
        <div className="d-flex flex-column align-items-center mb-6">
          {/* Toggle Button */}
          <div onClick={toggleSidebar} className="fs-1 cursor-pointer mb-">
            <i className="bi bi-list"></i>
          </div>

          {/* Sidebar Icons */}
          <div className="d-flex flex-column align-items-center gap-2">
            <div className="d-flex flex-column align-items-center">
              <i className="bi bi-grid fs-3 mt-3"></i>
            </div>
            <div className="d-flex flex-column align-items-center">
              <i className="bi bi-person-fill fs-3 mt-3"></i>
            </div>
            <div className="d-flex flex-column align-items-center">
              <i className="bi bi-diagram-3 fs-3 mt-3"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
