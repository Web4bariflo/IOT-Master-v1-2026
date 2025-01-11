import React from "react";
import barifloLogo from '../assets/Images/Bariflo logo on-01.png'

const Nav = () => {
  return (
    <>
      <div className="w-full h-[50px] bg-sky-100 z-20  shadow-2xl flex items-center">
        <img src={barifloLogo} alt="Logo" className="h-[70px] ml-4" />
      </div>
    </>
  );
};

export default Nav;
