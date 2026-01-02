import React, { createContext, useContext, useState } from "react";

// Create the context
export const RegistrationContext = createContext();

// Create a custom hook to use the context
export const useRegistrationContext = () => {
  return useContext(RegistrationContext);
};

// Create a provider component to wrap your app
export const RegistrationProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [mob, setMob] = useState("");
  const [coustmerId, setCoustmerId] = useState("");
  const [clusterId, setClusterId] = useState("");

  const value = {
    name,
    setName,
    mob,
    setMob,
    coustmerId,
    setCoustmerId,
    clusterId,
    setClusterId,
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};
