import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import Registration from "./pages/Aquafarming/Registration";
import CustomerRegister from "./pages/Aquafarming/CustomerRegister";
import DeviceRegistery from "./pages/Aquafarming/DeviceRegistery";
import DevicePage from "./pages/Aquafarming/DevicePage";
import Cluster from "./pages/Aquafarming/Cluster";
import PondPage from "./pages/Aquafarming/PondPage";
import CustomerProfile from "./pages/Aquafarming/CustomerProfile";
import PondDetails from "./pages/Aquafarming/PondDetails";
import WaterBodyRegister from "./pages/waterbody/WaterBodyRegister";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <div className="App flex">
        <Sidebar/>
        <Routes>
          <Route exact path="/" element={<CustomerRegister/>} />
          <Route exact path="/registration" element={<Registration/>} />
          <Route exact path="/device-registry" element={<DeviceRegistery/>} />
          <Route exact path="/devicepage" element={<DevicePage/>} />
          <Route path="/cluster/:mob" element={<Cluster />} />
          <Route path="/pond/:id" element={<PondPage />} />
          <Route path="/customerprofile/:id" element={<CustomerProfile />} />
          <Route path="/ponddetails/:id" element={<PondDetails/>} />
          <Route path="/waterbody" element={<WaterBodyRegister/>} />

        </Routes>
        </div>      
      </div>
    </Router>
  );
}

export default App;
