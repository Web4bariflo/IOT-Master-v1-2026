import React, { useState } from "react";
import barifloLogo from "../../../assets/Images/LOGO BARIFLO CYBERNETICS 2025-03-03.png";
import { AiOutlineLogout } from "react-icons/ai";

const Nav = () => {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("authToken");
    setShowLogoutPopup(false);
    window.location.replace("https://newlogin.bc-pl.com/");
  };

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <header className="w-full h-[76px] bg-white border-b border-gray-200 flex items-center px-6 py-3">
        {/* ===== LEFT: Logo + Breadcrumb ===== */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <img src={barifloLogo} alt="Logo" className="h-10 object-contain" />

          {/* Divider */}
          <div className="h-6 w-px bg-gray-300" />

          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 whitespace-nowrap">
            <span className="hover:text-gray-700 cursor-pointer">
              Farm Dashboard
            </span>
            <span className="mx-2">›</span>
            <span className="font-semibold text-gray-700">Cluster</span>
          </div>
        </div>

        {/* ===== RIGHT: Alerts + Profile + Logout ===== */}
        <div className="ml-auto flex items-center gap-6">
          {/* Alerts */}
          <div className="flex items-center gap-4 text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-md border">
            <div className="flex items-center gap-1">
              <span className="font-semibold">8</span>
              <span className="text-xs text-gray-500">Alerts</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              <span className="text-xs">Low Battery</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <span className="text-xs">Offline</span>
            </div>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <i className="bi bi-person-circle text-sm" />

            <span className="text-sm font-semibold text-gray-800">
              Mr. Amit
            </span>
          </div>

          {/* Logout */}
          <div className="relative group">
            <AiOutlineLogout
              className="text-red-600 hover:text-red-700 text-xl cursor-pointer transition-transform hover:scale-110"
              onClick={() => setShowLogoutPopup(true)}
            />
            <span className="absolute right-0 mt-2 px-2 py-1 text-xs rounded-md bg-white border shadow opacity-0 group-hover:opacity-100 transition">
              Logout
            </span>
          </div>
        </div>
      </header>

      {/* ===== LOGOUT MODAL ===== */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[320px]">
            <h3 className="text-base font-semibold mb-4">
              Are you sure you want to log out?
            </h3>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
                onClick={() => setShowLogoutPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
                onClick={handleLogout}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
