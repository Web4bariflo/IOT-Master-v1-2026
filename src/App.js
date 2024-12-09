import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import Registration from "./pages/Registration";
import CustomerRegister from "./pages/CustomerRegister";
import DeviceRegistery from "./pages/DeviceRegistery";
import DevicePage from "./pages/DevicePage";

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
        </Routes>
        </div>      
      </div>
    </Router>
  );
}

export default App;
