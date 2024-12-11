import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import Registration from "./pages/Registration";
import CustomerRegister from "./pages/CustomerRegister";
import DeviceRegistery from "./pages/DeviceRegistery";
import DevicePage from "./pages/DevicePage";
import Cluster from "./pages/Cluster";
import PondPage from "./pages/PondPage";
import CustomerProfile from "./pages/CustomerProfile";

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
          <Route path="/cluster/:customer_id" element={<Cluster />} />
          <Route path="/pond/:customer_id" element={<PondPage />} />
          <Route path="/customerprofile/:customer_id" element={<CustomerProfile />} />


        </Routes>
        </div>      
      </div>
    </Router>
  );
}

export default App;
