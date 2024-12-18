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
import DrawPicture from "./pages/registrationPage/DrawPicture";
import PondDetails from "./pages/PondDetails";
// import AddCluster from "./pages/registrationPage/ClusterCard";

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
          <Route path="/pond/:id" element={<PondPage />} />
          <Route path="/customerprofile/:id" element={<CustomerProfile />} />
          <Route path="/ponddetails/:id" element={<PondDetails/>} />
          {/* <Route exact path="/drawpicture" element={<DrawPicture/>} /> */}
        </Routes>
        </div>      
      </div>
    </Router>
  );
}

export default App;
