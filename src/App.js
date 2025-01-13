import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AquaMainPage from "./pages/Aquafarming/AquaMainPage";
import ManagerMain from "./manager/ManagerMain";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/master/*" element={<AquaMainPage />} />
        <Route path="/manager/*" element={<ManagerMain />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}

export default App;
