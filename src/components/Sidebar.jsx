import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);

  // Toggle the sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle the submenu open/close
  const toggleSubmenu = (menu) => {
    setSubmenuOpen(submenuOpen === menu ? null : menu);
  };

  return (
    <div>
      {/* for larger screen */}
      <aside
        style={{
          height: "100vh", // Full viewport height
          top: 0, // Positioning at the top
          left: 0, // Positioning on the left side
          zIndex: 1000, // Ensuring the sidebar stays above other elements
        }}
        className={`${
          isSidebarOpen ? "w-52" : "w-16"
        } md:block hidden top-0 left-0 h-full bg-sky-100 shadow-md transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col p-3">
          {/* Toggle Sidebar Button */}
          <button
            className="text-black p-3 rounded  cursor-pointer"
            onClick={toggleSidebar}
          >
            <FaBars className="text-xl" />
          </button>

          {/* Customers Menu */}
          <div
            className=" items-center relative text-black p-3 rounded hover:bg-white cursor-pointer"
            onClick={() => toggleSubmenu("customers")}
          >
            <i className="bi bi-person-fill text-2xl"></i>
            <span
              className={`${
                isSidebarOpen
                  ? "inline opacity-100 transition-opacity duration-500"
                  : "hidden opacity-0"
              } ml-2 text-sm`}
            >
              Customers
            </span>
            {/* Submenu for Customers */}
            {submenuOpen === "customers" && (
              <div className=" top-10 mt-3 w-40 bg-sky-100 shadow-md">
                <Link to="/registration" className="no-underline text-black">
                  <div className="p-2 hover:bg-white text-sm">
                    New Registration
                  </div>
                </Link>
                <Link
                  to="/"
                  className="no-underline text-black"
                >
                  <div className="p-2 hover:bg-white text-sm">
                    Customer Registry
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Device Registry Menu */}
          <div className="flex items-center text-black p-3 rounded hover:bg-white cursor-pointer">
  <Link to="/device-registry" className="flex items-center no-underline text-black">
    <i className="bi bi-diagram-3-fill text-2xl"></i>
    <span
      className={`ml-2 text-sm transition-opacity duration-500 ${
        isSidebarOpen ? "inline opacity-100" : "hidden opacity-0"
      }`}
    >
      Device Registry
    </span>
  </Link>
</div>

        </div>
      </aside>

      {/* for mobile screeen */}
      <aside
        className="absolute  ml-3 md:hidden block bg-sky-100 mt-4 "
        style={{ zIndex: 1000 }}
      >
        <button
          className="text-black p-3 rounded hover:bg-white cursor-pointer"
          onClick={toggleSidebar}
        >
          <FaBars className="text-xl" />
        </button>
        {isSidebarOpen && (
          <div className="flex flex-col p-3">
            <div
              className="relative text-black p-3 rounded hover:bg-white cursor-pointer"
              onClick={() => toggleSubmenu("customers")}
            >
              <i className="bi bi-person-fill text-2xl"></i>
              <span className="text-sm ml-2">Customers</span>
              {submenuOpen === "customers" && (
                <div className="  top-10 mt-3 w-40 bg-sky-100 shadow-md">
                  <Link to="/registration" className="no-underline text-black">
                    <div className="p-2 hover:bg-white text-sm">
                      New Registration
                    </div>
                  </Link>
                  <Link
                    to="/"
                    className="no-underline text-black"
                  >
                    <div className="p-2 hover:bg-white text-sm">
                      Customer Registry
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <div className="text-black p-3 rounded hover:bg-white cursor-pointer flex">
              <i className="bi bi-diagram-3-fill text-2xl"></i>
              <Link to="/device-registry" className="no-underline text-black">
                <div className="p-2 hover:bg-white text-sm">
                  Device Registry
                </div>
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;
