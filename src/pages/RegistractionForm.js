import React from "react";
import Sidebar from "../components/Sidebar";

const RegistrationForm = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Form Section */}
      <div className="relative w-md-full h-screen bg-gray-100 flex flex-col items-center">
        {/* Title */}
        <div className="w-auto">
          <h1 className="text-start text-3xl font-semibold mt-8">
            Registration Form
          </h1>
          <div className="border-b-2 border-black mt-2 mb-5 w-[1100px]"></div>
        </div>

        {/* Form Container */}
        <div className="w-[1100px] h-auto bg-[#D9D9D9] shadow-md rounded-lg p-8">
          {/* Form Fields */}
          <form className="grid grid-cols-2 gap-x-4 gap-y-6 mt-4">
            <input
              type="text"
              placeholder="Company Name"
              className="w-full h-[50px] bg-[#F9F9F9] border border-black px-4"
            />
            <input
              type="text"
              placeholder="PAN No"
              className="w-full h-[50px] bg-[#F9F9F9] border border-black px-4"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[50px] bg-[#F9F9F9] border border-black px-4"
            />
            <input
              type="text"
              placeholder="GST No"
              className="w-full h-[50px] bg-[#F9F9F9] border border-black px-4"
            />
            <input
              type="text"
              placeholder="Phone No"
              className="w-full h-[50px] bg-[#F9F9F9] border border-black px-4"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-[50px] bg-[#F9F9F9] border border-black px-4"
            />

            {/* Address on Left */}
            <textarea
              placeholder="Address"
              className="w-full h-[125px] bg-[#F9F9F9] border border-black px-4 resize-none col-span-1"
            />
            {/* Verify Password and Category on Right */}
            <div className="flex flex-col gap-y-6">
              <input
                type="password"
                placeholder="Verify Password"
                className="w-full h-[50px] bg-[#F9F9F9] border border-black px-4"
              />
              <select className="w-full h-[50px] bg-[#F9F9F9] border border-black px-4">
                <option value="">Category</option>
                <option value="Aquafarming">Aquafarming</option>
                <option value="Water Body">Water Body</option>
              </select>
            </div>
          </form>

          {/* Save Button */}
          <div className="text-center mt-16">
            <button className="bg-[#F9F9F9] text-black px-16 py-2 border border-black">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
