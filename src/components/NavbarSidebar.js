import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  FileTextOutlined,
  FormOutlined,
  SettingOutlined,
  MonitorOutlined,
  CarOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Sider, Header, Content } = Layout;
const { SubMenu } = Menu;

const NavbarSidebar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      {/* Header */}
      <Header
        style={{
          background: "#001529",
          padding: "0 16px",
          position: "fixed",
          width: "100%",
          zIndex: 1, // Z-index diubah agar tidak konflik
          display: "flex",
          top: 0, // Pastikan berada di atas
          left: 0,
        }}
      >
        <img
          src="/Logo.png"
          alt="Logo"
          style={{ width: 120, height: 60, marginLeft: 20 }}
        />
        <div style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>
          <Link to="/" style={{ color: "#C0C0C0" }}>
            Asset Care Team
          </Link>
          <Button
            type="primary"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{
              marginLeft: 10,
            }}
          />
        </div>
      </Header>

      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={200}
        theme="dark"
        breakpoint="md"
        collapsedWidth="80"
        style={{
          position: "fixed",
          left: 0,
          top: 64, // Offset untuk menyesuaikan dengan tinggi Header
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />}>
            <Link to="/komplain">Komplain</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<FileTextOutlined />}>
            <Link to="/pengaduan">Form Pengaduan</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<FormOutlined />}>
            <Link to="/permintaan">Permintaan Perbaikan</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<SettingOutlined />} title="Form Pemeliharaan">
            <Menu.Item key="4.1" icon={<HomeOutlined />}>
              <Link to="/form-pemeliharaan">Form Gedung/Bangunan</Link>
            </Menu.Item>
            <Menu.Item key="4.2" icon={<CarOutlined />}>
              <Link to="/form-service">Form Service Kendaraan</Link>
            </Menu.Item>
            <Menu.Item key="4.3" icon={<SettingOutlined />}>
              <Link to="/form-peralatan-bmn">Form Peralatan BMN</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5" icon={<MonitorOutlined />}>
            <Link to="/pengajuan">Monitoring Permintaan</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<MonitorOutlined />}>
            <Link to="/monitoring-listrik">Monitoring Listrik</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<MonitorOutlined />}>
            <Link to="/monitoring-data">Monitoring Data</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Content */}
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200, // Sesuaikan margin kiri agar sejalan dengan lebar sidebar
          marginTop: 64, // Offset untuk menghindari overlap dengan Header
          transition: "margin 0.3s ease-in-out",
        }}
      >
        <Content
          style={{
            margin: "0",
            padding: 0,
            background: "#fff",
            minHeight: "100vh",
            transition: "margin 0.3s ease-in-out",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default NavbarSidebar;
