import React, { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import devicepage from "./DevicePage";

const DeviceRegistery = () => {
  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://your-backend-api-url/customers"
        );

        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen mx-auto py-6 px-4 p-4">
      {/* <div className="min-h-screen bg-gray-100 p-4"> */}

      {/* Title Section */}

      <div className="flex items-center w-80 xl:w-full max-w-full px-0 mb-6">
        <div className="bg-white px-6 py-2 text-lg font-semibold shadow-xl border rounded-lg">
          Device Registery
        </div>

        <div className="flex-grow border-t border-gray-400 mx-4"></div>

        <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
      </div>

      {/* Search Bar */}

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="  Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 lg:w-1/4 h-12 px-4 py-2 pl-10 border border-gray-300 rounded-3xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <i className="bi bi-search absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-max"></i>
      </div>

      {/* Table Section with Horizontal Scrolling for Mobile */}

      <div className="shadow-lg rounded-lg mt-8 w-80 xl:w-full">
        <div className="overflow-x-auto bg-[#E1E3E7] shadow-lg rounded-lg mb-10">
          <table className="min-w-full table-auto mb-8">
            <thead className="bg-gray-200">
              <tr className="text-gray-800 text-center">
                <th className="px-4 py-3">S.L</th>

                <th className="px-4 py-3">Customer Name</th>

                <th className="px-4 py-3">Aeration</th>

                <th className="px-4 py-3">Power Circuit</th>

                <th className="px-4 py-3">Monitoring</th>

                <th className="px-4 py-3">Automated Feeder</th>

                <th className="px-4 py-3">Checktray</th>

                <th className="px-4 py-3">Lora Gateway</th>
              </tr>
            </thead>

            <tbody className="text-[#51586E]">
              {/* Static Rows */}

              <tr className="bg-white border-b hover:bg-gray-50 text-center">
                <td className="px-4 py-3">1</td>

                <td className="px-4 py-3 text-blue-600 hover:underline">
                  <Link to={`/devicepage`}>Magnum Seafood and Exports</Link>
                </td>

                <td className="px-4 py-3">123456</td>

                <td className="px-4 py-3">Yes</td>

                <td className="px-4 py-3">Active</td>

                <td className="px-4 py-3">Yes</td>

                <td className="px-4 py-3">No</td>

                <td className="px-4 py-3">Connected</td>
              </tr>

              <tr className="bg-white border-b hover:bg-gray-50 text-center">
                <td className="px-4 py-3">1</td>

                <td className="px-4 py-3">Magnum Seafood and Exports</td>

                <td className="px-4 py-3">123456</td>

                <td className="px-4 py-3">Yes</td>

                <td className="px-4 py-3">Active</td>

                <td className="px-4 py-3">Yes</td>

                <td className="px-4 py-3">No</td>

                <td className="px-4 py-3">Connected</td>
              </tr>

              {/* Dynamic Rows */}

              {customers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className="bg-white border-b hover:bg-gray-50 text-center"
                >
                  <td className="px-4 py-3">{index + 2}</td>

                  <td className="px-4 py-3">{customer.name}</td>

                  <td className="px-4 py-3">{customer.aeration}</td>

                  <td className="px-4 py-3">{customer.powerCircuit}</td>

                  <td className="px-4 py-3">{customer.monitoring}</td>

                  <td className="px-4 py-3">{customer.automatedFeeder}</td>

                  <td className="px-4 py-3">{customer.checktray}</td>

                  <td className="px-4 py-3">{customer.loraGateway}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeviceRegistery;
