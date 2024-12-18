import React, { useState } from "react";
import RegistrationForm from "./registrationPage/RegistrationForm";
import AddCluster from "./registrationPage/ClusterCard";
// import AddDevice from "./registrationPage/AddDevice";

const Registration = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [clusters, setClusters] = useState([]);
  const [isClusterCreated, setIsClusterCreated] = useState(false);
  

  const handleSubmit = () => {
    console.log("form submitted");
    setIsRegistered(true); // Set registered state to true
  };

  // const handleClusterCreationSuccess = () => {
  //   setIsClusterCreated(true); // Mark cluster as created
  // };



  return (
   <div>
      <form className="flex-col w-full" onSubmit={handleSubmit}>
        <div className="flex w-full text-center mt-12 mx-24">
          <div className="bg-white p-3 h-10 text-lg font-normal shadow-md rounded-lg ">
            Registration Form
          </div>
          <div className="flex-grow border-t max-w-7xl border-white bg-black h-0.5 mt-5"></div>
          <div className="w-3 h-3 bg-black rounded-full mt-4"></div>
        </div>
        <div className="w-full my-20 mx-24 bg-white shadow-lg">
          <RegistrationForm
            onSuccess={handleSubmit}
          />
          {isRegistered && (
            <div className="mx-32 p-10">
              <AddCluster
             
                // onClusterCreated={handleClusterCreationSuccess}
              />
              {/* {isClusterCreated && <AddDevice/>} */}
            </div>
          )}
        </div>
      </form>
      </div>
  );
};

export default Registration;
