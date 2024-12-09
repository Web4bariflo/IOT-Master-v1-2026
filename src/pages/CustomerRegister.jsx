import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomerRegister = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://your-backend-api-url/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container min-h-screen w-auto mx-auto py-4 px-3  xl:p-10">
        {/* <div className="min-h-screen bg-gray-100 p-4"> */}
      {/* Title Section */}
      <div className="flex items-center w-80 xl:w-full max-w-full px-0 mb-6">
        <div className="bg-white px-6 py-2 text-lg font-semibold shadow-md rounded-lg">
         customer registry
        </div>
        <div className="flex-grow border-t border-gray-400 mx-4"></div>
        <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
      </div>

      {/* Table Section with Horizontal Scrolling */}
      <div className="shadow-lg rounded-lg mt-10 w-80 xl:w-full">
      {/* <div className="overflow-x-scroll xl:overflow-y-scroll xl:overflow-x-hidden bg-[#E1E3E7] rounded-xl"> */}
      <div className=" overflow-auto bg-[#E1E3E7] rounded-xl">
          <table className="w-full min-w-[600px] text-sm text-left text-black mb-8">
            <thead>
              <tr className=" text-gray-800 text-center">
                <th className="px-4 py-3">S.L</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Mobile No</th>
                <th className="px-4 py-3">Customer Id</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-[#51586E]">
              {/* Static Rows */}
              <tr className="bg-white border-b hover:bg-gray-50 text-center shadow-sm">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">Magnum Seafood and Exports</td>
                <td className="px-4 py-3">Email</td>
                <td className="px-4 py-3">Mobile No</td>
                <td className="px-4 py-3">12345678910</td>
                <td className="px-4 py-3 flex justify-center gap-2">
                  <button className="bg-blue-700 text-white px-3 py-1 rounded shadow hover:bg-blue-600">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="bg-teal-700 text-white px-3 py-1 rounded shadow hover:bg-teal-600">
                    <i className="bi bi-clipboard"></i>
                  </button>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50 text-center shadow-sm">
                <td className="px-4 py-3">2</td>
                <td className="px-4 py-3">Magnum Seafood and Exports</td>
                <td className="px-4 py-3">Email</td>
                <td className="px-4 py-3">Mobile No</td>
                <td className="px-4 py-3">12345678910</td>
                <td className="px-4 py-3 flex justify-center gap-2">
                  <button className="bg-blue-700 text-white px-3 py-1 rounded shadow hover:bg-blue-600">
                    <i className="bi bi-eye"></i>
                  </button>
                  <button className="bg-teal-700 text-white px-3 py-1 rounded shadow hover:bg-teal-600">
                    <i className="bi bi-clipboard"></i>
                  </button>
                </td>
              </tr>
              {/* Dynamic Rows */}
              {customers.map((customer, index) => (
                <tr
                  key={customer.id}
                  className="bg-white border-b hover:bg-gray-50 text-center shadow-sm"
                >
                  <td className="px-4 py-3">{index + 3}</td>
                  <td className="px-4 py-3">{customer.name}</td>
                  <td className="px-4 py-3">{customer.email}</td>
                  <td className="px-4 py-3">{customer.mobile}</td>
                  <td className="px-4 py-3">{customer.customerId}</td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                    <button className="bg-blue-700 text-white px-3 py-1 rounded-full shadow hover:bg-blue-600">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button className="bg-teal-700 text-white px-3 py-1 rounded-full shadow hover:bg-teal-600">
                      <i className="bi bi-clipboard"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;