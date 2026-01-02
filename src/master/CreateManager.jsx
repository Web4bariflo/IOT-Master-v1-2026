import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoArrowBack } from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";

const CreateManager = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const URL = process.env.REACT_APP_IP;
  const navigate = useNavigate();

  // Fetch company details

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/viewuser_all/`);
        if (Array.isArray(response.data)) {
          setCustomers(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle company selection change
  const handleChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCompany) {
      toast.error("Please select a company.");
      return;
    }

    if (!userName) {
      toast.error("Username cannot be empty.");
      return;
    }

    const formData = {
      company_name: selectedCompany,
      username: userName,
      password: password,
      Mob: mobile,
      email: email,
    };

    console.log("Form Data to Submit:", formData);

    try {
      const response = await axios.post(
        `${URL}/manager_details_post/${encodeURIComponent(selectedCompany)}/`,
        formData
      );
      console.log("Form submitted successfully:", response.data);

      // Reset form fields
      setUserName("");
      setPassword("");
      setMobile("");
      setEmail("");
      setSelectedCompany("");

      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error);
      toast.error("There was an error submitting the form.");
    }
  };

  return (
    <div className="container h-screen bg-gray-100">

      <div className="flex items-center justify-center">
        {/* Back Button */}
        <button
          className="absolute top-16 right-96 flex gap-2 bg-gray-200 text-gray-800 rounded-md px-4 py-2 shadow hover:bg-gray-300 transition-transform duration-200"
          onClick={() => navigate(-1)}
        >
          <IoArrowBack className="text-lg" />
          {/* Back */}
        </button>

        <div className="w-96 xl:w-1/3 bg-white shadow-lg rounded-lg p-6 mt-10 mx-5">
          <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">
            Select a Company
          </h2>
          <div>
            <select
              value={selectedCompany}
              onChange={handleChange}
              className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 h-11"
            >
              <option value="" disabled>
                Choose a Company
              </option>
              {customers.map((customer, index) => (
                <option key={index} value={customer.company_name}>
                  {customer.company_name}
                </option>
              ))}
            </select>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="block text-gray-700 font-semibold"
              >
                Username:
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Username"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Password"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-semibold"
              >
                Mobile:
              </label>
              <input
                type="text"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Mobile Number"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold"
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Email Address"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-auto bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-3 hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Toast container (this will be used for displaying the toasts) */}
      <ToastContainer />
    </div>
  );
};

export default CreateManager;
