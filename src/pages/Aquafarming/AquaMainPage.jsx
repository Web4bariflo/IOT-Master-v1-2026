import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CustomerRegister from "./CustomerRegister";
import Registration from "./Registration";
import DeviceRegistery from "./DeviceRegistery";
import DevicePage from "./DevicePage";
import Cluster from "./Cluster";
import PondPage from "./PondPage";
import CustomerProfile from "./CustomerProfile";
import PondDetails from "./PondDetails";
import axios from "axios";
import AquaPrivateRoute from "../../Private/AquaPrivateRoute";
import CreateManager from "./CreateManager";

const AquaMainPage = () => {
  const BASEURl = process.env.REACT_APP_IP;
  const urlParams = new URLSearchParams(window.location.search);
  const mobno = urlParams.get("mobno") || localStorage.getItem("mobno");
  const csrf_token = urlParams.get("token") || localStorage.getItem("token");
  const category =
    urlParams.get("category") || localStorage.getItem("category");
  const navigate = useNavigate();
  console.log(mobno);

  if (mobno) localStorage.setItem("mobno", mobno);
  if (csrf_token) localStorage.setItem("token", csrf_token);
  if (category) localStorage.setItem("category", category);

  const url = `https://water.bc-pl.com/waterbody?category=${category}&token=${csrf_token}&mobno=${mobno}`;

  useEffect(() => {
    if (mobno) {
      const data = {
        Mob: parseInt(mobno),
      };
      axios
        .post(`${BASEURl}/common_login/`, data)
        .then((response) => {
          console.log(response);
          localStorage.setItem("auth", JSON.stringify(response.data));
          navigate(`/master/`);
        })
        .catch((error) => {
          console.log("There was an error fetching data!", error);
        });
    }
  }, [mobno]);

  return (
    <Routes>
      <Route element={<AquaPrivateRoute url={url} />}>
        <Route path="/" element={<CustomerRegister />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/device-registry" element={<DeviceRegistery />} />
        <Route path="/devicepage" element={<DevicePage />} />
        <Route path="/cluster/:mob" element={<Cluster />} />
        <Route path="/pond/:id" element={<PondPage />} />
        <Route path="/customerprofile/:id" element={<CustomerProfile />} />
        <Route path="/ponddetails/:id" element={<PondDetails />} />
        <Route path="/create-manager" element={<CreateManager />} />
      </Route>
    </Routes>
  );
};

export default AquaMainPage;
