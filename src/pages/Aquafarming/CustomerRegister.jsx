import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link  } from "react-router-dom";


const CustomerRegister = () => {
  const [customers, setCustomers] = useState([]);
  const URL = process.env.REACT_APP_IP


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${URL}/viewuser_all/`
        );
        console.log(response.data);
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="flex items-center w-full max-w-7xl px-2 mt-20">
        <div className="bg-white px-4 py-2 text-base font-semibold shadow-md rounded-lg ml-4">
          Customer Registry
        </div>
        <div className="flex-grow border-t border-gray-800 mx-2"></div>
        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
      </div>

      {/* Table Section with Horizontal Scrolling */}
      <div className="shadow-lg rounded-lg mt-10 lg:my-10 lg:mx-12 md:mx-12">
        <div className="overflow-auto bg-[#E1E3E7] rounded-xl">
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
              {customers.map((customer, index) => (
                <tr
                  key={customer.mob}
                  className="bg-white border-b hover:bg-gray-50 text-center shadow-sm"
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{customer.company_name}</td>
                  <td className="px-4 py-3">{customer.email}</td>
                  <td className="px-4 py-3">{customer.Mob}</td>
                  <td className="px-4 py-3">{customer.customer_id}</td>
                  <td className="px-4 py-3 flex justify-center gap-2">
                  <Link
                      to={`/customerprofile/${customer.customer_id}`}  
                      className="text-blue-800 hover:bg-slate-300 hover:scale-110 transition-transform duration-200 inline-block transform"
                    >
                      <button className="bg-teal-700 text-white px-3 py-1 rounded shadow hover:bg-teal-600">
                      <i class="bi bi-eye-fill"></i>
                      </button>
                    </Link>
                    <Link
                      to={`/cluster/${customer.customer_id}`}  
                      className="text-blue-800 hover:bg-slate-300 hover:scale-110 transition-transform duration-200 inline-block transform"
                    >
                      <button className="bg-teal-700 text-white px-3 py-1 rounded shadow hover:bg-teal-600">
                        <i className="bi bi-clipboard"></i>
                      </button>
                    </Link>
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