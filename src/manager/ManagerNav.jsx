import React, { useState } from "react";
import barifloLogo from "../assets/Images/LOGO BARIFLO CYBERNETICS 2025-03-03.png";
import { AiOutlineLogout } from "react-icons/ai";

const Nav = () => {
  // State to track whether the logout popup is visible or not
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // Function to handle logout (can be customized as per your logic)
  const LogoutPopUp = () => {
    console.log("logout click");
    localStorage.removeItem("auth");
    localStorage.removeItem("authToken");

    setShowLogoutPopup(false);

    window.location.replace("https://newlogin.bc-pl.com/");
  };

  return (
    <>
      <div
        className="w-full h-[70px] z-20 flex items-center justify-between px-6 md:px-12
                bg-white border-b border-gray-200
                backdrop-blur-md bg-white/90
                shadow-sm"
      >
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={barifloLogo}
            alt="Logo"
            className="h-[70px] md:h-[60px] object-contain"
          />
        </div>

        {/* Logout */}
        <div className="relative group">
          <AiOutlineLogout
            className="text-red-600 hover:text-red-700 text-2xl cursor-pointer 
                 transition duration-300 ease-in-out transform hover:scale-110"
            onClick={() => setShowLogoutPopup(true)}
          />
          <span
            className="absolute right-0 mt-2 px-2 py-1 text-xs rounded-md
                     bg-white shadow-md border border-gray-200
                     text-gray-600 opacity-0 group-hover:opacity-100
                     transition-opacity duration-200"
          >
            Logout
          </span>
        </div>
      </div>

      {/* Logout confirmation popup */}
      {showLogoutPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          style={{ zIndex: "2000" }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to log out?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-gray-800 p-2 rounded-md hover:bg-gray-400"
                onClick={() => setShowLogoutPopup(false)} // Close popup without logging out
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                onClick={LogoutPopUp} // Call LogoutPopUp function
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
