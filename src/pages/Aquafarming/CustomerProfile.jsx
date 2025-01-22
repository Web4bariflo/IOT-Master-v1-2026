import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";

const CustomerProfile = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState([]);
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_IP;

  // Fetch customer data
  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`${URL}/viewuser/${id}/`);
      setProfileData(response.data); // Assuming API returns an array of customer profiles
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };
  //   6371276263

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const back = () => {
    navigate(-1);
  };

  return (
    <React.Fragment>
      <div className="w-full h-screen ">
        {/* Header */}
        <div className="flex items-center w-full max-w-7xl px-2 mt-20">
          <div className="bg-white px-4 py-2 text-base font-semibold shadow-md rounded-lg ml-4">
            Customer Profiles
          </div>
          <div className="flex-grow border-t border-gray-800 mx-2"></div>
          <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
        </div>

        {/* Back Button */}
        <button
          className="absolute top-14 right-8 flex gap-2 bg-gray-200 text-gray-800 rounded-md px-4 py-2 shadow hover:bg-gray-300 transition-transform duration-200"
          onClick={() => navigate(-1)}
        >
          <IoArrowBack className="text-lg" />
          {/* Back */}
        </button>

        {/* Display Customer Data */}
        <div className="w-full max-w-7xl bg-[#E1E3E7] rounded-lg shadow-lg mt-4 lg:my-10 lg:mx-12 md:mx-12">
          <div className="flex justify-center items-center text-gray-900 font-bold p-3 text-2xl">
            Customer Profiles
          </div>

          {profileData.length > 0 ? (
            profileData.map((customer, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 bg-white p-10 mb-10"
              >
                {/* Render Customer Data */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 border-r border-gray-300 rounded-lg">
                    <i className="bi bi-building"></i>
                  </span>
                  <input
                    type="text"
                    value={customer.company_name || ""}
                    readOnly
                    placeholder="Company Name"
                    className="w-full h-12 pl-12 pr-3 border border-gray-300 rounded-lg focus:outline-none bg-white"
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 border-r border-gray-300 rounded-lg">
                    <i className="bi bi-credit-card"></i>
                  </span>
                  <input
                    type="text"
                    value={customer.pan_no || ""}
                    readOnly
                    placeholder="PAN Number"
                    className="w-full h-12 pl-12 pr-3 border border-gray-300 rounded-lg focus:outline-none bg-white"
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 border-r border-gray-300 rounded-lg">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    value={customer.email || ""}
                    readOnly
                    placeholder="Email"
                    className="w-full h-12 pl-12 pr-3 border border-gray-300 rounded-lg focus:outline-none bg-white"
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 border-r border-gray-300 rounded-lg">
                    <i className="bi bi-receipt"></i>
                  </span>
                  <input
                    type="text"
                    value={customer.gst_no || ""}
                    readOnly
                    placeholder="GST Number"
                    className="w-full h-12 pl-12 pr-3 border border-gray-300 rounded-lg focus:outline-none bg-white"
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 border-r border-gray-300 rounded-lg">
                    <i className="bi bi-telephone"></i>
                  </span>
                  <input
                    type="text"
                    value={customer.mob || ""}
                    readOnly
                    placeholder="Phone No"
                    className="w-full h-12 pl-12 pr-3 border border-gray-300 rounded-lg focus:outline-none bg-white"
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 border-r border-gray-300 rounded-lg">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="text"
                    value={customer.password || ""}
                    readOnly
                    placeholder="Password"
                    className="w-full h-12 pl-12 pr-3 border border-gray-300 rounded-lg focus:outline-none bg-white"
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">
              No customer profiles available.
            </p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CustomerProfile;
