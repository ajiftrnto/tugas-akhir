import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import NavbarSidebar from "./components/NavbarSidebar";
import Dashboard from "./components/Dashboard";
import MonitoringListrik from "./components/MonitoringListrik"; // Mengarahkan ke "/"
import { RequestProvider } from "./context/RequestContext";
import DataTable from "./components/DataTable";

const { Content } = Layout;

function App() {
  return (
    <Layout style={{ marginLeft: 200 }}>
      <NavbarSidebar />
      <Content style={{ marginTop: 50 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/monitoring-listrik" element={<MonitoringListrik />} />
          {/* <Route path="/monitoring-data" element={<DataTable />} /> */}
        </Routes>
      </Content>
    </Layout>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <RequestProvider>
        <App />
      </RequestProvider>
    </Router>
  );
}

export default AppWithRouter;
