import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import Registraction2 from "./pages/RegistractionForm2"; // Correct the import if needed

function App() {
  return (
    <Router>
      <div className="App">
        
        <Nav />
        <Sidebar />

        <Routes>
          <Route path="/" element={<Registraction2 />} />
          
          {/* <Route path="/customer-registry" element={<CustomerRegistry />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
