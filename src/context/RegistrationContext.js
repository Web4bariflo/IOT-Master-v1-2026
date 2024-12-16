import React, { createContext, useContext, useState } from "react";

// Create the context
const RegistrationContext = createContext();

// Create a custom hook to use the context
export const useRegistrationContext = () => {
  return useContext(RegistrationContext);
};

// Create a provider component to wrap your app
export const RegistrationProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [mob, setMob] = useState("");

  const value = {
    name,
    setName,
    mob,
    setMob,
  };

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
};
