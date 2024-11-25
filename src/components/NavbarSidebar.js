import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider, Header } = Layout;
const { SubMenu } = Menu;

const NavbarSidebar = () => {
  return (
    <Layout>
      {/* Sidebar */}
      <Sider
        width={200}
        theme="dark"
        style={{
          position: "fixed",
          left: 0,
          top: 64, // Space below the header
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/permintaan">Komplain</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/permintaan">Permintaan Perbaikan</Link>
          </Menu.Item>
          <SubMenu key="sub1" title="Form Pemeliharaan">
            <Menu.Item key="4.1">
              <Link to="/form-pemeliharaan">Form Gedung/Bangunan</Link>
            </Menu.Item>
            <Menu.Item key="4.2">
              <Link to="/form-service">Form Service Kendaraan</Link>
            </Menu.Item>
            <Menu.Item key="4.3">
              <Link to="/form-peralatan-bmn">Form Peralatan BMN</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="5">
            <Link to="/pengajuan">Monitoring Permintaan</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/monitoring-listrik">Monitoring Listrik</Link>
          </Menu.Item>
          {/* <Menu.Item key="7">
            <Link to="/monitoring-data">Data Monitoring</Link>
          </Menu.Item> */}
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: 200 }}> {/* Add marginLeft to account for sidebar */}
        {/* Header */}
        <Header
            style={{
              background: "#001529",
              padding: 0,
              position: "fixed",
              width: "100%",
              top: 0,
              zIndex: 1,
              left: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: 20,
              }}
            >
              <img
                src="/Logo.png"  // Ganti dengan path atau URL gambar Anda
                alt="Logo"
                style={{width: 150, height: 50}} // Ukuran dan jarak gambar
              />
              {/* Teks */}
              <div style={{ fontSize: 24, fontWeight: "bold", fontStyle: "italic" }}>
                <Link to="/" style={{ color: "#C0C0C0" }}>
                  Asset Care Team
                </Link>
              </div>
            </div>
          </Header>


        {/* Content Section (This part will be dynamically populated based on routes) */}
        <Layout.Content >
          {/* Your content goes here */}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default NavbarSidebar;
