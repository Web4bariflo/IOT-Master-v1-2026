import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CustomerRegister = () => {
  const [customers, setCustomers] = useState([]);
  const URL = process.env.REACT_APP_IP;
  const [showModal, setShowModal] = useState(false);
  const [customerIdToDelete, setCustomerIdToDelete] = useState(null); // Store customer_id to delete
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/viewuser_all/`);
        console.log(response.data);
        setCustomers(response.data); // Store fetched customers in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteClick = (customerId, customerName) => {
    setCustomerIdToDelete(customerId); // Set the customer_id to delete
    setCustomerName(customerName);
    setShowModal(true); // Show confirmation modal
  };

  const handleCancelDelete = () => {
    setShowModal(false); // Close the modal
  };

  const handleConfirmDelete = async () => {
    if (customerIdToDelete === null) return; // Ensure we have a customer_id
  
    try {
      // Send the DELETE request with the customer_id
      const response = await axios.delete(`${URL}/user_delete/${customerIdToDelete}/`);
      
      if (response.status === 200 || response.status === 204) {
        alert("Customer deleted successfully");
  
        // Optimistically remove the customer from local state
        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer.customer_id !== customerIdToDelete)
        );
        window.location.href = window.location.href;  // Refreshes the entire page

      } else {
        alert("Failed to delete customer. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Error deleting customer. Please try again later.");
    } finally {
      setShowModal(false); // Close modal after delete operation
    }
  };
  

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
              <tr className="text-gray-800 text-center">
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
                  key={customer.Mob}
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
                        <i className="bi bi-eye-fill"></i>
                      </button>
                    </Link>
                    <Link
                      to={`/cluster/${customer.Mob}`}
                      className="text-blue-800 hover:bg-slate-300 hover:scale-110 transition-transform duration-200 inline-block transform"
                    >
                      <button className="bg-teal-700 text-white px-3 py-1 rounded shadow hover:bg-teal-600">
                        <i className="bi bi-clipboard"></i>
                      </button>
                    </Link>
                    <div className="text-blue-800 hover:bg-slate-300 hover:scale-110 transition-transform duration-200 inline-block transform">
                      <button
                        className="bg-teal-700 text-white px-3 py-1 rounded shadow hover:bg-teal-600"
                        onClick={() => handleDeleteClick(customer.customer_id, customer.company_name)} // Pass the customer_id to handleDeleteClick
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Confirmation Modal */}
          {showModal && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 50,
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "24px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <h5
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    marginBottom: "16px",
                  }}
                >
                  Confirm Deletion
                </h5>
                <p>Are you sure you want to delete this customer {customerName} ?</p>
                <div
                  style={{
                    marginTop: "16px",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "16px",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#f56565",
                      color: "white",
                      padding: "8px 16px",
                      borderRadius: "8px",
                    }}
                    onClick={handleConfirmDelete} // Handle delete
                  >
                    Yes
                  </button>
                  <button
                    style={{
                      backgroundColor: "#e2e8f0",
                      padding: "8px 16px",
                      borderRadius: "8px",
                    }}
                    onClick={handleCancelDelete}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerRegister;
