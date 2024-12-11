import React from "react";
import RegistrationForm from "./registrationPage/RegistrationForm";
import DrawPicture from "./registrationPage/DrawPicture";

const Registration = () => {
  return (
    <div className="flex-col w-full">
      <div className="flex items-center w-full max-w-7xl px-2 mt-24">
        <div className="bg-white px-4 py-2 text-base font-semibold shadow-md rounded-lg ml-4">
          Registration Form
        </div>
        <div className="flex-grow border-t border-gray-800 mx-2"></div>
        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
      </div>

      <div className="w-auto lg:my-10 lg:mx-24   bg-white shadow-lg">
        <RegistrationForm />
        <DrawPicture />
      </div>
    </div>
  );
};

export default Registration;
