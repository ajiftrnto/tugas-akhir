import React, { useContext } from "react";
import { Table, Button, Tag, Popconfirm, message } from "antd";
import { RequestContext } from "../context/RequestContext"; // Import context

const Permintaan = () => {
  const { requests, updateRequest } = useContext(RequestContext); // Destructure context

  const handleApprove1 = (id) => {
    const updatedRequests = requests.map((request) =>
      request.id === id && request.status === "Menunggu Persetujuan Admin 1"
        ? {
            ...request,
            status: "Menunggu Persetujuan Admin 2",
            tanggal_approve_admin1: new Date().toLocaleString(),
          }
        : request
    );
    updateRequest(updatedRequests);
    message.success("Permintaan disetujui oleh Admin 1.");
  };

  const handleApprove2 = (id) => {
    const updatedRequests = requests.map((request) =>
      request.id === id && request.status === "Menunggu Persetujuan Admin 2"
        ? {
            ...request,
            status: "Menunggu Pengerjaan",
            tanggal_approve_admin2: new Date().toLocaleString(),
          }
        : request
    );
    updateRequest(updatedRequests);
    message.success("Permintaan disetujui oleh Admin 2.");
  };

  const handleStartWork = (id) => {
    const updatedRequests = requests.map((request) =>
      request.id === id && request.status === "Menunggu Pengerjaan"
        ? {
            ...request,
            status: "Sedang Dikerjakan",
            tanggal_pengerjaan: new Date().toLocaleString(),
          }
        : request
    );
    updateRequest(updatedRequests);
    message.success("Pekerjaan dimulai.");
  };

  const handleCompleteWork = (id) => {
    const updatedRequests = requests.map((request) =>
      request.id === id && request.status === "Sedang Dikerjakan"
        ? {
            ...request,
            status: "Selesai",
            tanggal_selesai: new Date().toLocaleString(),
          }
        : request
    );
    updateRequest(updatedRequests);
    message.success("Pekerjaan selesai.");
  };

  const handleDelete = (id) => {
    const updatedRequests = requests.filter((request) => request.id !== id);
    updateRequest(updatedRequests);
    message.success("Permintaan berhasil dihapus.");
  };

  const columns = [
    { title: "Nama Pengaju", dataIndex: "nama_pemohon", key: "nama_pemohon" },
    { title: "Unit Kerja", dataIndex: "unit_kerja", key: "unit_kerja" },
    { title: "Jenis Kerusakan", dataIndex: "jenis_kerusakan", key: "jenis_kerusakan" },
    { title: "Deskripsi", dataIndex: "deskripsi", key: "deskripsi" },
    { title: "Tanggal Pengajuan", dataIndex: "tanggal_pengajuan", key: "tanggal_pengajuan" },
    { title: "Tanggal Approve Admin 1", dataIndex: "tanggal_approve_admin1", key: "tanggal_approve_admin1" },
    { title: "Tanggal Approve Admin 2", dataIndex: "tanggal_approve_admin2", key: "tanggal_approve_admin2" },
    { title: "Tanggal Pengerjaan", dataIndex: "tanggal_pengerjaan", key: "tanggal_pengerjaan" },
    { title: "Tanggal Selesai", dataIndex: "tanggal_selesai", key: "tanggal_selesai" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Selesai"
            ? "green"
            : status === "Sedang Dikerjakan"
            ? "blue"
            : status === "Menunggu Pengerjaan"
            ? "gold"
            : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (_, record) => (
        <>
          {record.status === "Menunggu Persetujuan Admin 1" && (
            <Button type="primary" onClick={() => handleApprove1(record.id)} style={{ marginRight: 8 }}>
              Approve Admin 1
            </Button>
          )}
          {record.status === "Menunggu Persetujuan Admin 2" && (
            <Button type="primary" onClick={() => handleApprove2(record.id)} style={{ marginRight: 8 }}>
              Approve Admin 2
            </Button>
          )}
          {record.status === "Menunggu Pengerjaan" && (
            <Button type="default" onClick={() => handleStartWork(record.id)} style={{ marginRight: 8 }}>
              Mulai Pekerjaan
            </Button>
          )}
          {record.status === "Sedang Dikerjakan" && (
            <Button type="primary" onClick={() => handleCompleteWork(record.id)} style={{ marginRight: 8 }}>
              Selesai
            </Button>
          )}
          <Popconfirm
            title="Yakin ingin menghapus permintaan ini?"
            onConfirm={() => handleDelete(record.id)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button type="danger">Hapus</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Daftar Permintaan Pemeliharaan</h2>
      <Table
        dataSource={requests} // Gunakan data asli
        columns={columns}
        rowKey="id" // Gunakan id unik sebagai key
      />
    </div>
  );
};

export default Permintaan;
