import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(null);
  const [isAquaMenuVisible, setIsAquaMenuVisible] = useState(false);

  // Toggle the sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle the submenu open/close
  const toggleSubmenu = (menu) => {
    setSubmenuOpen(submenuOpen === menu ? null : menu);
  };

  // Handle Aqua Logo click
  const handleAquaLogoClick = () => {
    setIsAquaMenuVisible(!isAquaMenuVisible);
  };

  return (
    <div className="">
      {/* Sidebar for larger screens */}
      <aside
        className={`${
          isSidebarOpen ? "w-44" : " w-44"
        } hidden md:block h-full bg-sky-100 shadow-md transition-all duration-300`}
        style={{ zIndex: 1000 }}
      >
        <div className="flex flex-col p-3">
          {/* Toggle Sidebar Button */}
          <button
            className="text-black p-3 rounded cursor-pointer"
            onClick={toggleSidebar}
          >
            <FaBars className="text-xl" />
          </button>

          {/* Aqua Logo */}
          <div
            className="text-black p-3 mb-3 cursor-pointer flex items-center rounded-xl hover:bg-white absolute top-28"
            onClick={handleAquaLogoClick}
          >
            {/* Logo */}
            {/* <i className="bi bi-droplet-fill text-xl mr-2" /> */}

            {/* Heading */}
            <div className="text-sm font-black">Aqua Farming</div>
          </div>

          {/* Aqua Menu */}
          {isAquaMenuVisible && (
            <div className="relative top-16">
              {/* Customers Menu */}
              <div
                className="items-center relative text-black p-3 rounded hover:bg-white cursor-pointer"
                onClick={() => toggleSubmenu("customers")}
              >
                <i className="bi bi-person-fill text-xl opacity-70 hover:opacity-100 transition-opacity duration-300"></i>
                <span
                  className={`${
                    isSidebarOpen
                      ? "inline opacity-100 transition-opacity duration-500"
                      : "hidden opacity-0"
                  } ml-2 text-sm`}
                >
                  Customers
                </span>
                {(submenuOpen === "customers" || submenuOpen === "both") && (
                  <div className="mt-3 w-40 bg-sky-100 shadow-md">
                    <Link
                      to="/aquafarming/registration"
                      className="no-underline text-black"
                    >
                      <div className="p-2 hover:bg-white text-sm">
                        New Registration
                      </div>
                    </Link>
                    <Link to="/aquafarming/" className="no-underline text-black">
                      <div className="p-2 hover:bg-white text-sm">
                        Customer Registry
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Device Registry Menu */}
              <div className="flex items-center text-black p-3 rounded hover:bg-white cursor-pointer">
                <Link
                  to="/aquafarming/device-registry"
                  className="flex items-center no-underline text-black"
                >
                  <i className="bi bi-diagram-3-fill text-xl opacity-70 hover:opacity-100 transition-opacity duration-300"></i>
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
          )}

    

          <div
            className="text-black p-3 mb-3 cursor-pointer flex items-start rounded-xl hover:bg-white top-22 mt-14"
            // onClick={}
          >
            <div className="text-sm font-black">Water Body</div>       
          </div>
        </div>
      </aside>

      {/* for mobile screen */}
      <aside
        className="absolute ml-3 md:hidden block bg-sky-100 mt-4"
        style={{ zIndex: 1000 }}
      >
        {/* Toggle Sidebar Button */}
        <button
          className="text-black p-3 rounded hover:bg-white cursor-pointer"
          onClick={toggleSidebar}
        >
          <FaBars className="text-xl" />
        </button>

        {isSidebarOpen && (
          <div className="flex flex-col p-3">
            {/* Aqua Farming Logo */}
            <div
              className="relative text-black p-3 rounded hover:bg-white cursor-pointer"
              onClick={handleAquaLogoClick}
            >
              <i className="bi bi-droplet-fill text-2xl"></i>
              <span className="text-sm ml-2">Aqua Farming</span>
            </div>

            {/* Customers Section (visible when Aqua Farming is clicked) */}
            {isAquaMenuVisible && (
              <>
                <div
                  className="relative text-black p-3 rounded hover:bg-white cursor-pointer"
                  onClick={() => toggleSubmenu("customers")}
                >
                  <i className="bi bi-person-fill text-2xl"></i>
                  <span className="text-sm ml-2">Customers</span>

                  {/* Submenu for Customers */}
                  {submenuOpen === "customers" && (
                    <div className="mt-3 w-40 bg-sky-100 shadow-md">
                      <Link
                        to="/aquafarming/registration"
                        className="no-underline text-black"
                      >
                        <div className="p-2 hover:bg-white text-sm">
                          New Registration
                        </div>
                      </Link>
                      <Link to="/aquafarming/" className="no-underline text-black">
                        <div className="p-2 hover:bg-white text-sm">
                          Customer Registry
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Device Registry */}
                <div className="flex items-center text-black p-3 rounded hover:bg-white cursor-pointer">
                  <Link
                    to="/aquafarming/device-registry"
                    className="flex items-center no-underline text-black"
                  >
                    <i className="bi bi-diagram-3-fill text-xl opacity-70 hover:opacity-100 transition-opacity duration-300"></i>
                    <span className="ml-2 text-sm">Device Registry</span>
                  </Link>
                </div>
              </>
            )}

            {/* Aqua Body */}
            <div className="text-black p-3 rounded hover:bg-white cursor-pointer flex">
              <i className="bi bi-water text-2xl"></i>
              <Link to="/aquafarming/waterbody" className="no-underline text-black">
                <div className="p-2 hover:bg-white text-sm">water Body</div>
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;