import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubmenu = (menu) => {
    setSubmenuOpen(submenuOpen === menu ? null : menu);
  };

  return (
    <div className="relative z-10 shadow-xl">
      {/* Hamburger Button (Visible on all screens now) */}
      <button
        className="fixed top-28 left-6 z-30 p-2 text-black rounded-md"
        onClick={toggleSidebar}
      >
        <FaBars className="text-xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } fixed top-0 left-0 h-full shadow-md bg-sky-100 transition-all duration-300 ease-in-out z-20 group`}
      >
        <div className="flex flex-col items-center space-y-6 mt-44 ">
          {/* Customers Menu */}
          <div
            className="relative flex items-center w-full p-3 rounded hover:bg-white cursor-pointer"
            onClick={() => toggleSubmenu("customers")}
          >
            <i className="bi bi-person-fill text-2xl" style={{ width: "50px" }}></i>
            <span
              className={`${
                isSidebarOpen ? "inline" : "hidden"
              } ml-2 text-black`}
            >
              Customers
            </span>
            {submenuOpen === "customers" && (
              <div
                className="absolute left-full top-0 mt-3 w-40 bg-sky-100 shadow-md"
                
              >
                <Link to="/" className="no-underline text-black">
                <div className="p-2 hover:bg-white">New Registration</div>
              </Link>
              <Link to="/customer-registry" className="no-underline text-black">
                <div className="p-2 hover:bg-white">Customer Registry</div>
              </Link>
              </div>
            )}
          </div>

          {/* Device Registry Menu */}
          <div
            className="flex items-center w-full p-3 rounded hover:bg-white cursor-pointer"
            onClick={() => toggleSubmenu("deviceRegistry")}
          >
            <i className="bi bi-diagram-3-fill text-2xl" style={{ width: "50px" }}></i>
            <span
              className={`${
                isSidebarOpen ? "inline" : "hidden"
              } ml-2 text-black`}
            >
              Device Registry
            </span>
            
          </div>
        </div>
      </div>

      {/* Removed the Overlay */}
    </div>
  );
};

export default Sidebar;
