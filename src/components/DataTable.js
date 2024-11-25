import React from 'react';
import { Table } from 'antd';

const DataTable = () => {
  const columns = [
    {
      title: 'Tegangan AB',
      dataIndex: 'teganganAB',
      key: 'teganganAB',
    },
    {
      title: 'Tegangan BC',
      dataIndex: 'teganganBC',
      key: 'teganganBC',
    },
    {
      title: 'Tegangan CA',
      dataIndex: 'teganganCA',
      key: 'teganganCA',
    },
    {
      title: 'Tegangan RN',
      dataIndex: 'teganganRN',
      key: 'teganganRN',
    },
    {
      title: 'Tegangan SN',
      dataIndex: 'teganganSN',
      key: 'teganganSN',
    },
    {
      title: 'Tegangan TN',
      dataIndex: 'teganganTN',
      key: 'teganganTN',
    },
    {
      title: 'Arus R',
      dataIndex: 'arusR',
      key: 'arusR',
    },
    {
      title: 'Arus S',
      dataIndex: 'arusS',
      key: 'arusS',
    },
    {
      title: 'Arus T',
      dataIndex: 'arusT',
      key: 'arusT',
    },
    {
      title: 'Aktif',
      dataIndex: 'aktif',
      key: 'aktif',
    },
    {
      title: 'Reaktif',
      dataIndex: 'reaktif',
      key: 'reaktif',
    },
    {
      title: 'Semua',
      dataIndex: 'semu',
      key: 'semu',
    },
    {
      title: 'Frekuensi',
      dataIndex: 'frequensi',
      key: 'frequensi',
    },
    {
      title: 'Cosphi',
      dataIndex: 'cosphi',
      key: 'cosphi',
    },
  ];

  const data = [
    {
      key: '1',
      teganganAB: '220V',
      teganganBC: '220V',
      teganganCA: '220V',
      teganganRN: '110V',
      teganganSN: '110V',
      teganganTN: '110V',
      arusR: '10A',
      arusS: '10A',
      arusT: '10A',
      aktif: '1000W',
      reaktif: '500VAR',
      semu: '1200VA',
      frequensi: '50Hz',
      cosphi: '0.9',
    },
    {
      key: '2',
      teganganAB: '230V',
      teganganBC: '230V',
      teganganCA: '230V',
      teganganRN: '120V',
      teganganSN: '120V',
      teganganTN: '120V',
      arusR: '12A',
      arusS: '12A',
      arusT: '12A',
      aktif: '1100W',
      reaktif: '600VAR',
      semu: '1300VA',
      frequensi: '60Hz',
      cosphi: '0.85',
    },
  ];

  return (
    <Table columns={columns} dataSource={data} />
  );
};

export default DataTable;
