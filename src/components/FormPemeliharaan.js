import React, { useState, useContext } from "react";
import { Form, Input, Button, Select, DatePicker, Upload, message, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RequestContext } from "../context/RequestContext"; // Import context
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

const FormPemeliharaan = () => {
  const [fileList, setFileList] = useState([]);
  const { addRequest } = useContext(RequestContext); // Ambil fungsi untuk menambah permintaan
  const navigate = useNavigate();

  const onFinish = (values) => {
    const requestData = {
      ...values,
      tanggal: values.tanggal.format("YYYY-MM-DD"), // Format tanggal
      foto: fileList.map((file) => file.name), // Simpan nama file yang diunggah
      status: "Menunggu Persetujuan Admin 1", // Status awal saat diajukan
      approvedByAdmin1: false, // Belum disetujui oleh admin 1
      approvedByAdmin2: false, // Belum disetujui oleh admin 2
    };
    addRequest(requestData); // Tambahkan data ke context
    message.success("Permintaan berhasil diajukan!");
    navigate("/permintaan"); // Arahkan ke halaman daftar permintaan
  };

  const handleUploadChange = (info) => {
    if (info.file.status !== "removed") {
      setFileList(info.fileList); // Simpan daftar file
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} berhasil diunggah.`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} gagal diunggah.`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Form Permintaan Pemeliharaan Gedung/Bangunan</h2>
      <Form layout="vertical" onFinish={onFinish}>
        {/* Form Fields */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Nama Pemohon" name="nama_pemohon" rules={[{ required: true, message: "Harap isi nama pemohon" }]}>
              <Input placeholder="Masukkan nama pemohon" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Unit Kerja" name="unit_kerja" rules={[{ required: true, message: "Harap isi unit kerja" }]}>
              <Input placeholder="Masukkan unit kerja" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Nama Ruangan" name="nama_ruangan" rules={[{ required: true, message: "Harap isi nama ruangan" }]}>
              <Input placeholder="Masukkan nama ruangan" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Jenis Kerusakan" name="jenis_kerusakan" rules={[{ required: true, message: "Pilih jenis kerusakan" }]}>
              <Select placeholder="Pilih jenis kerusakan">
                <Option value="atap bocor">Kebocoran Atap</Option>
                <Option value="keramik retak">Kerusakan Lantai</Option>
                <Option value="dinding rusak">Dinding Rusak</Option>
                <Option value="saluran air">Kerusakan Sanitari</Option>
                <Option value="listrik">Gangguan Kelistrik</Option>
                <Option value="tata udara">Gangguan Tata Udara (AC)</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Tanggal Permintaan" name="tanggal" rules={[{ required: true, message: "Pilih tanggal permintaan" }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Deskripsi Permintaan" name="deskripsi" rules={[{ required: true, message: "Harap isi deskripsi permintaan" }]}>
          <TextArea rows={4} placeholder="Deskripsikan permintaan Anda" />
        </Form.Item>

        <Form.Item label="Unggah Foto (Opsional)" name="foto">
          <Upload
            name="foto"
            listType="picture"
            onChange={handleUploadChange}
            beforeUpload={() => false} // Prevent automatic upload
            multiple
          >
            <Button icon={<UploadOutlined />}>Klik untuk Unggah</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">Ajukan Permintaan</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormPemeliharaan;
