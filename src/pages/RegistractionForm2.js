import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const RegistrationForm2 = () => {
  const [formdata, setFormData] = useState({
    companyName: "",
    panNo: "",
    email: "",
    gstNo: "",
    phoneNo: "",
    password: "",
    rePassword: "",
    address: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name) {
      setFormData({ ...formdata, [name]: value });
    } else {
      console.error("Missing name attribute on input element");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formdata);

    setFormData({
      companyName: "",
      panNo: "",
      email: "",
      gstNo: "",
      phoneNo: "",
      password: "",
      rePassword: "",
      address: "",
      category: "",
    });
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Form Section */}
      <div className="container d-flex flex-column align-items-start py-4">
        {/* Title */}
        <div className="w-auto text-start">
          <h1 className="h2 font-weight-bold mb-3">Registration Form</h1>
        </div>
        <div className="border-b-2 border-dark mb-4 w-full"></div>

        {/* Form Container */}
        <div
          className="container shadow p-5"
          style={{ backgroundColor: "rgb(217, 217, 217)" }}
        >
          {/* Form Fields */}
          <form className="row g-4 mt-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <input
                type="text"
                name="companyName" 
                placeholder="Company Name"
                className="form-control h-12"
                value={formdata.companyName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="panNo" 
                placeholder="PAN No"
                className="form-control h-12"
                value={formdata.panNo}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control h-12"
                value={formdata.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="gstNo"
                placeholder="GST No"
                className="form-control h-12"
                value={formdata.gstNo}
                onChange={handleChange}
              />
            </div>
            {/* Password and Phone No */}
            <div className="col-md-6">
              <input
                type="text"
                name="phoneNo"
                placeholder="Phone No"
                className="form-control h-12"
                value={formdata.phoneNo}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control h-12"
                value={formdata.password}
                onChange={handleChange}
              />
            </div>

            {/* Address on Left */}
            <div className="col-md-6">
              <textarea
                name="address"
                placeholder="Address"
                className="form-control"
                value={formdata.address}
                onChange={handleChange}
                rows="4"
              />
            </div>

            {/* Re-enter Password and Category on Right */}
            <div className="col-md-6 d-flex flex-column gap-3">
              <input
                type="password"
                name="rePassword"
                placeholder="Re-enter Password"
                className="form-control h-12"
                value={formdata.rePassword}
                onChange={handleChange}
              />
              <select
                name="category"
                className="form-select h-12"
                value={formdata.category}
                onChange={handleChange}
              >
                <option value="">Category</option>
                <option value="Aquafarming">Aquafarming</option>
                <option value="Water Body">Water Body</option>
              </select>
            </div>
          </form>

          {/* Save Button */}
          <div className="text-center mt-5">
            <button
              className="btn btn-light border-dark px-5 py-2"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm2;
