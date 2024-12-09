import React, { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    panNumber: "",
    email: "",
    gstNumber: "",
    phone: "",
    password: "",
    verifyPassword: "",
    address: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Form Data: ", formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center w-full max-w-4xl  mb-6 ">
        <div className="bg-white px-6 py-2 text-lg font-semibold shadow-md rounded-lg">
          Registration Form
        </div>
        <div className="flex-grow border-t border-gray-400 mx-4"></div>
        <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-4">
          {/* Input Fields */}
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-black bg-gray-200 ">
              <i className="bi bi-building"></i>
            </span>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full h-12 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <i className="bi bi-credit-card"></i>
            </span>
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              placeholder="PAN Number"
              className="w-full h-12 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full h-12 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <i className="bi bi-receipt"></i>
            </span>
            <input
              type="text"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleChange}
              placeholder="GST Number"
              className="w-full h-12 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <i className="bi bi-telephone"></i>
            </span>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone No"
              className="w-full h-12 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <i className="bi bi-lock"></i>
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full h-12 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative col-span-1">
      <span className="absolute top-3 left-3 text-gray-500">
        <i className="bi bi-geo-alt"></i>
      </span>
      <textarea
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        className="w-full h-28 pl-10 pt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex flex-col gap-4 col-span-1">
      {/* Verify Password Field */}
      <div className="relative">
        <span className="absolute top-3 left-3 text-gray-500">
          <i className="bi bi-lock"></i>
        </span>
        <input
          type="password"
          name="verifyPassword"
          value={formData.verifyPassword}
          onChange={handleChange}
          placeholder="Verify Password"
          className="w-full h-12 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category Field */}
      <div className="relative">
        <span className="absolute top-3 left-3 text-gray-500">
          <i className="bi bi-grid"></i>
        </span>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full h-12 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Category
          </option>
          <option value="Category1">Category 1</option>
          <option value="Category2">Category 2</option>
        </select>
      </div>
    </div>
        </form>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
