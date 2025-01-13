import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const DeviceRegistery = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedCustomers, setExpandedCustomers] = useState({});

  const URL = process.env.REACT_APP_IP;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/deviceregistry_all/`);
        if (Array.isArray(response.data)) {
          setCustomers(response.data);
          console.log(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Grouping by company name
  const groupedData = customers.reduce((acc, item) => {
    const { Company_name, name, device } = item;

    if (!acc[Company_name]) {
      acc[Company_name] = {
        Aeration: [],
        Feedtray: [],
        Feeding: [],
        // AutomatedFeeder: [],
        // LoraGateway: [],
        // PowerCircuit: [],
      };
    }

    if (name === "Aeration") acc[Company_name].Aeration.push(device);
    if (name === "Feed Tray") acc[Company_name].Feedtray.push(device);
    if (name === "Feeding") acc[Company_name].Feeding.push(device);
    
    // if (name === "Power Circuit") acc[Company_name].PowerCircuit.push(device);
    // if (name === "Automated Feeder")
      // acc[Company_name].AutomatedFeeder.push(device);
    // if (name === "Lora Gateway") acc[Company_name].LoraGateway.push(device);

    return acc;
  }, {});

  const filteredCustomers = Object.entries(groupedData).filter(([key]) =>
    key.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle customer expand/collapse
  const toggleCustomerDevices = (companyName) => {
    setExpandedCustomers((prevState) => ({
      ...prevState,
      [companyName]: !prevState[companyName],
    }));
  };

  return (
    <div className="h-screen w-full">
      {/* Header */}
      <div className="flex items-center w-full max-w-7xl px-2 mt-20">
        <div className="bg-white px-4 py-2 text-base font-semibold shadow-md rounded-lg ml-4">
          Device Registry
        </div>
        <div className="flex-grow border-t border-gray-800 mx-2"></div>
        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
      </div>

      {/* Search Input */}
      <div className="mb-4 relative ml-20 mt-4">
        <input
          type="text"
          placeholder="Search by Customer Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 lg:w-1/4 h-10 px-4 py-2 pl-10 border border-gray-300 rounded-3xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <i className="bi bi-search absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-max"></i>
      </div>

      {/* Table */}
      <div className="shadow-lg rounded-lg mt-8 lg:my-10 lg:mx-20">
        <div className="overflow-x-auto bg-[#E1E3E7] shadow-lg rounded-lg mb-10">
          <table className="min-w-full table-auto mb-8 border-separate">
            <thead className="bg-gray-200">
              <tr className="text-gray-800 text-center">
                <th className="px-4 py-3">S.L</th>
                <th className="px-4 py-3">Customer Name</th>
                <th className="px-4 py-3">Aeration</th>
                <th className="px-4 py-3">Feedtray</th>
                <th className="px-4 py-3">Feeding</th>
                
                {/* <th className="px-4 py-3">Automated Feeder</th> */}
                {/* <th className="px-4 py-3">Lora Gateway</th> */}
                {/* <th className="px-4 py-3">Power Circuit</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map(([companyName, devices], index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-100 text-center top-0"
                  >
                    <td className="px-4 py-3 align-top font-bold text-xl cursor-pointer">
                      {index + 1}
                    </td>

                    <td
                      className="px-4 py-3 align-top font-bold text-xl cursor-pointer flex items-center justify-center"
                      onClick={() => toggleCustomerDevices(companyName)}
                    >
                      <span>{companyName}</span>
                      <span className="ml-3 text-gray-600 transition-transform duration-300">
                        {expandedCustomers[companyName] ? (
                          <i className="bi bi-chevron-up text-sm"></i>
                        ) : (
                          <i className="bi bi-chevron-down text-sm"></i>
                        )}
                      </span>
                    </td>

                    <td className="px-4 py-3 align-top">
                      <div>
                        {/* Show only the first device for Aeration */}
                        <Link
                          to={`/master/devicepage`}
                          className="text-blue-800 hover:bg-slate-300 hover:scale-110 transition-transform duration-200"
                        >
                          {devices.Aeration[0]}
                        </Link>

                        {/* Show all devices if expanded */}
                        {expandedCustomers[companyName] && (
                          <>
                            {devices.Aeration.slice(1).map((device, idx) => (
                              <div key={idx} className="">
                                <Link
                                  to={`/master/devicepage`}
                                  className="text-blue-800 hover:bg-slate-300 hover:scale-110 transition-transform duration-200"
                                >
                                  {device}
                                </Link>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </td>

                  

                    <td className="px-4 py-3 align-top">
                      <div>
                        {/* Show only the first device for Check Tray */}
                        <Link
                          to={`/master/devicepage`}
                          className="text-blue-800 hover:bg-slate-300 hover:scale-110 transition-transform duration-200"
                        >
                          {devices.Feedtray[0]}
                        </Link>

                        {/* Show all devices if expanded */}
                        {expandedCustomers[companyName] && (
                          <>
                            {devices.Feedtray.slice(1).map((device, idx) => (
                              <div key={idx} className="b">
                                <Link
                                  to={`/master/devicepage`}
                                  className="text-blue-800 hover:bg-slate-300 hover:scale-110 transition-transform duration-200"
                                >
                                  {device}
                                </Link>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3 align-top">
                      <div>
                        {/* Show only the first device for Feeding */}
                        <Link
                          to={`/master/devicepage`}
                          className="text-blue-800 hover:bg-slate-300 hover:scale-110 transition-transform duration-200"
                        >
                          {devices.Feeding[0]}
                        </Link>

                        {/* Show all devices if expanded */}
                        {expandedCustomers[companyName] && (
                          <>
                            {devices.Feeding.slice(1).map((device, idx) => (
                              <div key={idx} className="">
                                <Link
                                  to={`/master/devicepage`}
                                  className="text-blue-800 hover:bg-slate-300 hover:scale-110 transition-transform duration-200"
                                >
                                  {device}
                                </Link>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </td>

                 
                
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center px-4 py-3 text-gray-500"
                  >
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeviceRegistery;