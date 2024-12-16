import React, { useState } from "react";
import RegistrationForm from "./registrationPage/RegistrationForm";
import AddCluster from "../components/ClusterCard";
import { RegistrationProvider } from "../context/RegistrationContext";
import AddDevice from "./registrationPage/AddDevice";

const Registration = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [clusters, setClusters] = useState([]);
  const [isClusterCreated, setIsClusterCreated] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category

  const handleSubmit = (e) => {
    console.log("form submitted");
    setIsRegistered(true); // Set registered state to true
  };

  const handleClusterCreationSuccess = () => {
    setIsClusterCreated(true); // Mark cluster as created
  };

  // const handleCategorySelect = (userCategory) => {
  //   console.log("selected Category:", userCategory);
  //   setSelectedCategory(userCategory); // Set the selected category
  // };

  return (
    <RegistrationProvider>
      <form className="flex-col w-full" onSubmit={handleSubmit}>
        <div className="flex w-full text-center mt-12 mx-24">
          <div className="bg-white p-3 h-10 text-lg font-normal shadow-md rounded-lg ">
            Registration Form
          </div>
          <div className="flex-grow border-t max-w-7xl border-white bg-black h-0.5 mt-5"></div>
          <div className="w-3 h-3 bg-black rounded-full mt-4"></div>
        </div>
        <div className="w-auto my-20 mx-24 bg-white shadow-lg">
          <RegistrationForm
            onSuccess={handleSubmit}
          />
          {isRegistered && (
            <div className="mx-32 p-10">
              <AddCluster
                clusters={clusters}
                setClusters={setClusters}
                onClusterCreated={handleClusterCreationSuccess}
              />
              {isClusterCreated && <AddDevice />}
            </div>
          )}
        </div>
      </form>
    </RegistrationProvider>
  );
};

export default Registration;
