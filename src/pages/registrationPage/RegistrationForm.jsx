import React, { useState } from "react";
import axios from "axios";
import { useRegistrationContext } from "../../context/RegistrationContext";

const RegistrationForm = ({ onSuccess }) => {
  const { setName, setMob } = useRegistrationContext(); // Access context setters
  const [userCategory, setUserCategory] = useState(""); //track the catagory
  const [formData, setFormData] = useState({
    company_name: "",
    Pan_no: "",
    email: "",
    GST_no: "",
    mobno: "",
    password: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const URL = process.env.REACT_APP_IP;

  const validateForm = () => {
    const newErrors = {};

    // Company Name Validation
    if (!formData.company_name.trim()) {
      newErrors.company_name = "Company Name is required";
    }

    // PAN Number Validation
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (!formData.Pan_no.trim()) {
      newErrors.Pan_no = "PAN Number is required";
    } else if (!panPattern.test(formData.Pan_no)) {
      newErrors.Pan_no = "Invalid PAN Number format";
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // GST Number Validation
    const gstPattern =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[0-9]{1}[Z]{1}[0-9]{1}$/;
    if (!formData.GST_no.trim()) {
      newErrors.GST_no = "GST Number is required";
    } else if (!gstPattern.test(formData.GST_no)) {
      newErrors.GST_no = "Invalid GST Number format";
    }

    // Verify Password Validation
    if (!formData.verifyPassword.trim()) {
      newErrors.verifyPassword = "Please confirm your password";
    } else if (formData.password !== formData.verifyPassword) {
      newErrors.verifyPassword = "Passwords do not match";
    }

    // Address Validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    // Category Validation
    // if (!formData.category) {
    //   newErrors.category = "Please select a category";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Pan_no") {
      const input = value.toUpperCase();
      setFormData({ ...formData, Pan_no: input });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Handle category selection
    // if (name === "category") {
    //   setUserCategory(value); // Update the category state
    // }

    // Clear specific error when user starts typing
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (validateForm()) {
        const res = await axios.post(`${URL}/signup/`, formData);
        console.log("Submitted Form Data: ", formData);

        // Store name and mobno to context
        setName(formData.company_name);
        setMob(formData.mobno);

        // Call the parent `onCategorySelect` with the selected category value

        if (onSuccess) {
          onSuccess();
        }

        console.log("Response from server:", res.data);
      } else {
        setPopupMessage("Please correct the errors in the form.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        setPopupMessage(
          `Error: ${
            error.response.data.message ||
            "There was an issue with your submission."
          }`
        );
      } else if (error.request) {
        setPopupMessage("Network error. Please check your connection.");
      } else {
        setPopupMessage(
          "There was an error submitting the form. Please try again."
        );
      }

      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      {/* Form Container */}
      <div className="w-full max-w-6xl bg-white rounded-lg p-8">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {/* Input Fields */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 border-r border-gray-300 rounded-lg">
              <i className="bi bi-building"></i>
            </span>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              placeholder="Company Name"
              className={`w-full h-12 pl-12 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.company_name ? "border-red-500" : ""
              }`}
            />
            {errors.company_name && (
              <span className="mt-1 text-red-500 text-xs absolute bottom-[-15px] left-0">
                {errors.company_name}
              </span>
            )}
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 border-r border-gray-300 rounded-lg">
              <i className="bi bi-credit-card"></i>
            </span>
            <input
              type="text"
              name="Pan_no"
              value={formData.Pan_no}
              onChange={handleChange}
              placeholder="PAN Number"
              className={`w-full h-12 pl-12 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.Pan_no ? "border-red-500" : ""
              }`}
            />
            {errors.Pan_no && (
              <span className="text-red-500 text-xs absolute bottom-[-15px] left-0">
                {errors.Pan_no}
              </span>
            )}
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 border-r border-gray-300 rounded-lg">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full h-12 pl-12 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs absolute bottom-[-15px] left-0">
                {errors.email}
              </span>
            )}
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 border-r border-gray-300 rounded-lg">
              <i className="bi bi-receipt"></i>
            </span>
            <input
              type="text"
              name="GST_no"
              value={formData.GST_no}
              onChange={handleChange}
              placeholder="GST Number"
              className={`w-full h-12 pl-12 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.GST_no ? "border-red-500" : ""
              }`}
            />
            {errors.GST_no && (
              <span className="text-red-500 text-xs absolute bottom-[-15px] left-0">
                {errors.GST_no}
              </span>
            )}
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 border-r border-gray-300 rounded-lg">
              <i className="bi bi-telephone"></i>
            </span>
            <input
              type="number"
              name="mobno"
              value={formData.mobno}
              onChange={handleChange}
              placeholder="mobno No"
              className={`w-full h-12 pl-12 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.mobno ? "border-red-500" : ""
              }`}
            />
            {errors.mobno && (
              <span className="text-red-500 text-xs absolute bottom-[-15px] left-0">
                {errors.mobno}
              </span>
            )}
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 border-r border-gray-300 rounded-lg">
              <i className="bi bi-lock"></i>
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full h-12 pl-12 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            {/* {errors.password && (
              <span className="text-red-500 text-xs absolute bottom-[-15px] left-0">
                {errors.password}
              </span>
            )} */}
          </div>

          <div className="relative col-span-1">
            <span className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 border-r border-gray-300 rounded-lg h-28">
              <i className="bi bi-geo-alt"></i>
            </span>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className={`w-full h-28 pl-12 pt-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.address ? "border-red-500" : ""
              }`}
            />
            {errors.address && (
              <span className="text-red-500 text-xs absolute bottom-[-15px] left-0">
                {errors.address}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-4 col-span-1">
            {/* Verify Password Field */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 border-r border-gray-300 rounded-lg">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                name="verifyPassword"
                value={formData.verifyPassword}
                onChange={handleChange}
                placeholder="Verify Password"
                className={`w-full h-12 pl-12 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.verifyPassword ? "border-red-500" : ""
                }`}
              />
              {errors.verifyPassword && (
                <span className="text-red-500 text-xs absolute bottom-[-15px] left-0">
                  {errors.verifyPassword}
                </span>
              )}
            </div>

            {/* Category Field
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center bg-gray-300 px-3 border-r border-gray-300 rounded-lg">
                <i className="bi bi-grid"></i>
              </span>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.category ? "border-red-500" : ""
                }`}
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="Aquafarming">Aquafarming</option>
                <option value="WaterBody">Water Body</option>
              </select>
              {errors.category && (
                <span className="text-red-500 text-xs absolute bottom-[-15px] left-0">
                  {errors.category}
                </span>
              )}
            </div> */}
          </div>
        </form>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-red-500">{popupMessage}</p>
            <button
              onClick={handleModalClose}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
