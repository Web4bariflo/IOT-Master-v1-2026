import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DevicePage = () => {
  const navigate = useNavigate();
  const URL = process.env.REACT_APP_IP;
  const {  id } = useParams();
  const [deviceData, setDeviceData] = useState(null);

  const back = () => {
    navigate(-1);
  };


  useEffect(() => {
    // Fetch device data
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/device_details/${id}/`);
        if (response.data) {
          console.log(response.data);
          setDeviceData(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  },[id])

  const calculateWarrantyDate = (createdAt) => {
    const createdDate = new Date(createdAt); 
    createdDate.setFullYear(createdDate.getFullYear() + 1); 
    // Format the new date to 'YYYY-MM-DD' format (or adjust to preferred format)
    return createdDate.toISOString().split('T')[0];
  };


  return (
    <div className="h-screen w-full">
      <div className="flex items-center w-full max-w-7xl px-2 mt-20">
        <div className="bg-white px-4 py-2 text-base font-semibold shadow-md rounded-lg ml-4">
          Registration Form
        </div>
        <div className="flex-grow border-t border-gray-800 mx-2"></div>
        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
      </div>

      <div className=" flex justify-end me-6">
        <button className=" bg-blue-600 p-2 rounded-md text-white w-20" onClick={back}>
          <i class="bi bi-arrow-left" ></i>Back
        </button>
      </div>

      {/* Device Details Section */}

      <div className=" bg-[#E1E3E7] mt-6 shadow-md rounded-xl lg:my-10 lg:mx-20">
        <div className="flex justify-center items-center text-gray-900 font-bold p-3 text-2xl">
          Device Details
        </div>

        <div className=" overflow-auto bg-[#E1E3E7]">
          <div className="p-4 space-y-3 mb-8 bg-white">
            <div className="flex gap-2 border-b border-gray-300 pb-1 px-5">
              <span className="font-semibold text-gray-800">Device Id:</span>

              <span className="text-gray-500">{deviceData && deviceData[0].device_id}</span>
            </div>

            <div className="flex gap-2 border-b border-gray-300 pb-1 px-5">
              <span className="font-semibold text-gray-800">Device Type:</span>

              <span className="text-gray-500">{deviceData && deviceData[0].device_type}</span>
            </div>

            <div className="flex gap-2 border-b border-gray-300 pb-1 px-5">
              <span className="font-semibold text-gray-800">Start Date:</span>

              <span className="text-gray-500">{deviceData && deviceData[0].created_at}</span>
            </div>

            <div className="flex gap-2 border-b border-gray-300 pb-1 px-5">
              <span className="font-semibold text-gray-800">Address:</span>

              <span className="text-gray-500">{deviceData && deviceData[0].address}</span>
            </div>

            <div className="flex gap-2 border-b border-gray-300 pb-1 px-5">
              <span className="font-semibold text-gray-800">Warranty:</span>

              <span className="text-gray-500">
              {deviceData && deviceData[0].created_at
                  ? calculateWarrantyDate(deviceData[0].created_at)
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
