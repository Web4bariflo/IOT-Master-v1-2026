import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Routes, Route, useNavigate } from "react-router-dom";
import ClusterviewDetails from "../manager/ClusterviewDetails";
import SetTime from "./SetTime";
import Nav from "./ManagerNav";
import ManagerSidebar from "./ManagerSidebar";
import ManagerPrivateRoute from "../Private/ManagerPrivateRoute";
import Economy from "./Economy";

const ManagerMain = () => {
  const BASEURL = process.env.REACT_APP_IP;
  const urlParams = new URLSearchParams(window.location.search);
  const mobno = urlParams.get("mobno") || localStorage.getItem("mobno");
  const navigate = useNavigate();

  // Track loading state to prevent rendering before mobno is processed
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (mobno) {
      // Save mobno to localStorage if it's found and not already stored
      localStorage.setItem("mobno", mobno);
    }

    if (mobno) {
      const data = { Mob: parseInt(mobno) };

      // Make the API request only if mobno is available
      axios
        .post(`${BASEURL}/common_login/`, data)
        .then((response) => {
          console.log(response);
          // Store the response data in localStorage if login is successful
          localStorage.setItem("auth", JSON.stringify(response.data));
          navigate(`/manager/`);
        })
        .catch((error) => {
          console.log("There was an error fetching data!", error);
        })
        .finally(() => {
          // After the request finishes, update loading state
          setIsLoading(false);
        });
    } else {
      setIsLoading(false); // No mobno, stop loading
    }
  }, [mobno, BASEURL]); // Adding dependencies to avoid continuous rendering

  if (isLoading) {
    return (
      <div>Loading...</div> // Or any loading indicator you prefer
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Nav />
      <div className="flex flex-1">
        <ManagerSidebar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Routes>
            <Route element={<ManagerPrivateRoute />}>
              <Route path="/" element={<SetTime />} />
              <Route path="/economy/:id" element={<Economy />} />
              <Route path="/clusterview/:id" element={<ClusterviewDetails />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ManagerMain;
