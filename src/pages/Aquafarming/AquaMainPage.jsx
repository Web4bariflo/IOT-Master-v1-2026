import React, { useEffect } from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import Sidebar from "../../components/Sidebar";
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
import CreateManager from './CreateManager'

const AquaMainPage = () => {
  const BASEURl = process.env.REACT_APP_IP;
  const urlParams = new URLSearchParams(window.location.search);
  const mobno = urlParams.get("mobno");
  const navigate = useNavigate();
  console.log(mobno);

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
          navigate(`/aquafarming/`);
        })
        .catch((error) => {
          console.log("There was an error fetching data!", error);
        });
    }
  });

  return (
    <div>
      <Nav />
      <div className="App flex">
        <Sidebar />
        <Routes>
          <Route element={<AquaPrivateRoute />}>
            <Route path="/" element={<CustomerRegister />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/device-registry" element={<DeviceRegistery />} />
            <Route path="/devicepage" element={<DevicePage />} />
            <Route path="/cluster/:mob" element={<Cluster />} />
            <Route path="/pond/:id" element={<PondPage />} />
            <Route path="/customerprofile/:id" element={<CustomerProfile />} />
            <Route path="/ponddetails/:id" element={<PondDetails />} />
            <Route path="/create-manager" element={<CreateManager/>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default AquaMainPage;
