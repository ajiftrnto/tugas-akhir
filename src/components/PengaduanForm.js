import React, { useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const PengaduanForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Simpan pengaduan atau kirim ke backend
    console.log('Pengaduan:', values);
    message.success('Pengaduan berhasil dikirim!');
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Form Pengaduan</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ kategori: 'Kerusakan' }}
      >
        <Form.Item
          name="nama"
          label="Nama Pengadu"
          rules={[{ required: true, message: 'Nama tidak boleh kosong!' }]}
        >
          <Input placeholder="Masukkan nama Anda" />
        </Form.Item>

        <Form.Item
          name="kontak"
          label="Kontak"
          rules={[
            { required: true, message: 'Kontak tidak boleh kosong!' },
            { pattern: /^[0-9]+$/, message: 'Kontak hanya boleh berupa angka!' },
          ]}
        >
          <Input placeholder="Masukkan nomor telepon atau email" />
        </Form.Item>

        <Form.Item
          name="kategori"
          label="Kategori Pengaduan"
          rules={[{ required: true, message: 'Pilih kategori pengaduan!' }]}
        >
          <Select>
            <Option value="kebocoran atap">Kebocoran atap</Option>
            <Option value="kerusakan tata udara">Kerusakan Tata udara (AC)</Option>
            <Option value="kerusakan lampu">Kerusakan Lampu</Option>
            <Option value="kerusakan pintu">Kerusakan Pintu</Option>
            <Option value="kerusakan printer">Kerusakan Printer</Option>
            <Option value="kerusakan sanitasi">Kerusakan Sanitasi</Option>
            <Option value="kerusakan Lainnya">kerusakan Lainnya</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="deskripsi"
          label="Deskripsi Pengaduan"
          rules={[{ required: true, message: 'Deskripsi tidak boleh kosong!' }]}
        >
          <TextArea rows={4} placeholder="Jelaskan detail pengaduan Anda" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Kirim Pengaduan
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PengaduanForm;
