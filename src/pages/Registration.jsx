import React from "react";
import RegistrationForm from "./registrationPage/RegistrationForm";
import DrawPicture from "./registrationPage/DrawPicture";

const Registration = () => {
  return (
    <div className="flex-col w-full">
      <div className="flex w-full text-center  mt-12 mx-24">
        <div className="bg-white p-3 h-10 text-lg font-normal shadow-md rounded-lg ">
          Registration Form
        </div>
        <div className="flex-grow border-t max-w-7xl border-white bg-black h-0.5 mt-5"></div>
        <div className="w-3 h-3 bg-black rounded-full mt-4"></div>
      </div>
      <div className="w-auto my-20 mx-24 bg-white shadow-lg">
        <RegistrationForm />
        <DrawPicture/>
      </div>
    </div>
  );
};

export default Registration;
