import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarSidebar from "./components/NavbarSidebar";
import Dashboard from "./components/Dashboard";
import MonitoringListrik from "./components/MonitoringListrik";
import Lantai4A from "./pages/Lantai4A";

function App() {
  return (
    <Router>
      <NavbarSidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/monitoring-listrik" element={<MonitoringListrik />} />
          <Route path="/monitoring/lantai4A" element={<Lantai4A />} />
        </Routes>
      </NavbarSidebar>
    </Router>
  );
}

export default App;
