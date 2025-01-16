import React, { useState } from "react";
import barifloLogo from "../assets/Images/Bariflo logo on-01.png";
import { AiOutlineLogout } from "react-icons/ai";

const Nav = () => {
  // State to track whether the logout popup is visible or not
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // Function to handle logout (can be customized as per your logic)
  const LogoutPopUp = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("data");
    setShowLogoutPopup(false);
    window.location.href = "https://newloginbg.bc-pl.com/";
  };

  return (
    <>
      <div className="w-full h-[50px] bg-sky-100 z-20 shadow-2xl flex items-center justify-between">
        <div>
          <img src={barifloLogo} alt="Logo" className="h-[65px]" />
        </div>

        <div>
          <div className="relative group">
            <AiOutlineLogout
              className="text-red-600 hover:text-red-700 text-2xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 me-11"
              onClick={() => setShowLogoutPopup(true)} // Show the popup when clicked
            />
            <span className="absolute transform text-black-50 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2">
              LogOut
            </span>
          </div>
        </div>
      </div>

      {/* Logout confirmation popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" style={{zIndex:"2000"}}>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to log out?</h3>
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
