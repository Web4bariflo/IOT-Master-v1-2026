import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DeviceRegistery = () => {
  const [customers, setCustomers] = useState([]); // Initialize customers as an empty array
  const [search, setSearch] = useState("");
  const URL = process.env.REACT_APP_IP;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${URL}/deviceregistry_view/customer_id/`
        );
        console.log("response of deviceregistry:",response)
        // Ensure the data is always an array, even if the response is empty
        if (Array.isArray(response.data)) {
          setCustomers(response.data);
        } else {
          console.error("Response data is not an array", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter customers based on search input
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen w-full">
      {/* Title Section */}
      <div className="flex items-center w-full max-w-7xl px-2 mt-20">
        <div className="bg-white px-4 py-2 text-base font-semibold shadow-md rounded-lg ml-4">
          Device Registery
        </div>
        <div className="flex-grow border-t border-gray-800 mx-2"></div>
        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
      </div>

      {/* Search Bar */}
      <div className="mb-4 relative ml-20 mt-4">
        <input
          type="text"
          placeholder="  Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 lg:w-1/4 h-10 px-4 py-2 pl-10 border border-gray-300 rounded-3xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <i className="bi bi-search absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-max"></i>
      </div>

      {/* Table Section */}
      <div className="shadow-lg rounded-lg mt-8 lg:my-10 lg:mx-20">
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
              <tr className="bg-white border-b hover:bg-gray-100 text-center">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">Magnum Seafood and Exports</td>
                <td className="px-4 py-3">
                  <Link
                    to={`/devicepage`}
                    className="text-blue-800 hover:bg-slate-300 hover:scale-110 transition-transform duration-200 inline-block transform"
                  >
                    123456
                  </Link>
                </td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
              </tr>

              {/* Dynamic Rows */}
              {filteredCustomers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className="bg-white border-b hover:bg-gray-50 text-center"
                >
                  <td className="px-4 py-3">{index + 2}</td>
                  <td className="px-4 py-3 text-blue-800 hover:underline">
                    {customer.name}
                  </td>
                  {/* Aeration now has the link */}
                  <td className="px-4 py-3">
                    {customer.aeration && customer.aeration.length > 0
                      ? customer.aeration.map((id, idx) => (
                          <div key={`aeration-${idx}`}>
                            <Link
                              to={`/devicepage/${id}`}
                              className="text-blue-600 hover:bg-slate-300 hover:scale-110 transition-transform duration-200 inline-block transform"
                            >
                              {id}
                            </Link>
                          </div>
                        ))
                      : "N/A"}
                  </td>
                  {/* Power Circuit has the link */}
                  <td className="px-4 py-3">
                    {customer.powerCircuit && customer.powerCircuit.length > 0
                      ? customer.powerCircuit.map((id, idx) => (
                          <div key={`powerCircuit-${idx}`}>
                            <Link
                              to={`/devicepage/${id}`}
                              className="text-blue-600 hover:bg-slate-300 hover:scale-110 transition-transform duration-200 inline-block transform"
                            >
                              {id}
                            </Link>
                          </div>
                        ))
                      : "N/A"}
                  </td>
                  <td className="px-4 py-3">{customer.monitoring || "N/A"}</td>
                  <td className="px-4 py-3">
                    {customer.automatedFeeder || "N/A"}
                  </td>
                  <td className="px-4 py-3">{customer.checktray || "N/A"}</td>
                  <td className="px-4 py-3">{customer.loraGateway || "N/A"}</td>
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
