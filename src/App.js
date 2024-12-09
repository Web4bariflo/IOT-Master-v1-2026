import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
// import Registration from "./pages/registrationPage/RegistrationForm"; // Correct the import if needed
// import AddDevice from "./pages/registrationPage/AddDevice";
import DrawPicture from "./pages/registrationPage/DrawPicture";

function App() {
  return (
    <Router>
      <div className="App">
        
        <Nav />
        <Sidebar />

        <Routes>
          <Route path="/" element={<DrawPicture/>} />
          
          {/* <Route path="/customer-registry" element={<CustomerRegistry />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
