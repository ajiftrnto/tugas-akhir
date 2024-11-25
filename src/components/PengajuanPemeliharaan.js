import React, { useContext } from "react";
import { Table, Tag } from "antd";
import { RequestContext } from "../context/RequestContext"; // Import context

const PengajuanPemeliharaan = () => {
  const { requests } = useContext(RequestContext); // Ambil data permintaan dari context

  const columns = [
    { title: "Nama Pemohon", dataIndex: "nama_pemohon", key: "nama_pemohon" },
    { title: "Unit Kerja", dataIndex: "unit_kerja", key: "unit_kerja" },
    { title: "Jenis Kerusakan", dataIndex: "jenis_kerusakan", key: "jenis_kerusakan" },
    { title: "Deskripsi", dataIndex: "deskripsi", key: "deskripsi" },
    { title: "Tanggal Pengajuan", dataIndex: "tanggal", key: "tanggal" },
    { title: "Tanggal Proses", dataIndex: "tanggal_proses", key: "tanggal_proses" },
    { title: "Tanggal Selesai", dataIndex: "tanggal_selesai", key: "tanggal_selesai" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Selesai" ? "green" : status === "Diproses" ? "blue" : "red"}>
          {status || "Belum Diproses"}
        </Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Daftar Pengajuan Pemeliharaan</h2>
      <Table
        dataSource={requests.map((item, index) => ({ ...item, key: index }))}
        columns={columns}
        rowKey="key"
      />
    </div>
  );
};

export default PengajuanPemeliharaan;
