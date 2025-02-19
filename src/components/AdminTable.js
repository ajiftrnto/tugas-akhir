import React from 'react';
import { Table, Button, message } from 'antd';

const AdminTable = ({ pengaduanData, onUpdateStatus }) => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nama', dataIndex: 'nama', key: 'nama' },
    { title: 'Kontak', dataIndex: 'kontak', key: 'kontak' },
    { title: 'Kategori', dataIndex: 'kategori', key: 'kategori' },
    { title: 'Deskripsi', dataIndex: 'deskripsi', key: 'deskripsi' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Tanggal', dataIndex: 'tanggal', key: 'tanggal' },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (record) => (
        record.status !== 'Selesai' && (
          <Button
            type="primary"
            onClick={() => {
              onUpdateStatus(record.id, 'Selesai');
              message.success(`Pengaduan ID ${record.id} ditandai sebagai selesai`);
            }}
          >
            Tandai Selesai
          </Button>
        )
      ),
    },
  ];

  return (
    <Table
      dataSource={pengaduanData}
      columns={columns}
      rowKey="id"
      bordered
    />
  );
};

export default AdminTable;
