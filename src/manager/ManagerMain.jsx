import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ManagerPrivateRoute from "../Private/ManagerPrivateRoute";
import Loader from "../Private/Loader";
import PondModulePage from "./modules/PondModulePage";
import FeedingModule from "./modules/feeding/FeedingModule";

const ManagerMain = () => {
  const BASEURL = process.env.REACT_APP_IP;
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const mobno = urlParams.get("mobno") || localStorage.getItem("mobno");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mobno) {
      setIsLoading(false);
      return;
    }

    // Save mobno to localStorage
    localStorage.setItem("mobno", mobno);

    const data = {
      Mob: parseInt(mobno, 10),
    };

    axios
      .post(`${BASEURL}/common_login/`, data)
      .then((response) => {
        localStorage.setItem("auth", JSON.stringify(response.data));
        // navigate("/manager/", { replace: true });
      })
      .catch((error) => {
        console.error("Login API error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [mobno, BASEURL, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route element={<ManagerPrivateRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="feeding" element={<FeedingModule />} />
        <Route path="pond-module/:pondId" element={<PondModulePage />} />
      </Route>
    </Routes>
  );
};

export default ManagerMain;
