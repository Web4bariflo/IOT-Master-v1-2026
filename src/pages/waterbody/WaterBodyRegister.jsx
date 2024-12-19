import React, { useState } from "react";
import RegistrationForm from "../Aquafarming/registrationPage/RegistrationForm";
import { RegistrationProvider } from "../../context/RegistrationContext";
import AddDevice from "../Aquafarming/registrationPage/AddDevice";

const WaterBodyRegister = () => {
  const [isRegistered, setIsRegistered] = useState(false); // Track registration success

  const handleFormSuccess = () => {
    console.log("Water body registration form submitted successfully");
    setIsRegistered(true); // Set the form submission state to true
  };

  return (
    <RegistrationProvider>
      <div className="flex-col w-full">
        {/* Header Section */}
        <div className="flex w-full text-center mt-12 mx-24">
          <div className="bg-white p-3 h-10 text-lg font-normal shadow-md rounded-lg">
            Water Body Registration
          </div>
          <div className="flex-grow border-t max-w-7xl border-white bg-black h-0.5 mt-5"></div>
          <div className="w-3 h-3 bg-black rounded-full mt-4"></div>
        </div>

        {/* Main Content Section */}
        <div className="w-auto my-20 mx-24 bg-white shadow-lg p-10 rounded-lg">
          {/* Registration Form */}
          <h2 className="text-xl font-semibold mb-4">Registration Form</h2>
          <RegistrationForm onSuccess={handleFormSuccess} />

          {/* Add Device Section - Shown After Form Submission */}
          {isRegistered && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Add Devices</h2>
              <AddDevice />
            </div>
          )}
        </div>
      </div>
    </RegistrationProvider>
  );
};

export default WaterBodyRegister;