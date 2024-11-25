import React, { useState, useContext, useEffect, useRef } from "react";
import { Form, Input, Button, Select, DatePicker, Upload, message, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { RequestContext } from "../context/RequestContext"; // Import context
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash"; // Import debounce from lodash

const { TextArea } = Input;
const { Option } = Select;

const FormService = () => {
  const [fileList, setFileList] = useState([]);
  const { addRequest } = useContext(RequestContext); // Ambil fungsi untuk menambah permintaan
  const navigate = useNavigate();
  const formRef = useRef(null); // Ref for the form container
  const formContainerRef = useRef(null); // Ref for the form container to observe resizing

  const onFinish = (values) => {
    const requestData = {
      ...values,
      tanggal: values.tanggal.format("YYYY-MM-DD"), // Format tanggal
      foto: fileList.map((file) => file.name), // Simpan nama file yang diunggah
      status: "Belum Diproses", // Status default saat diajukan
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

  useEffect(() => {
    // Creating a debounced resize observer
    const resizeObserver = new ResizeObserver(debounce(() => {
      // Logic for handling resize
      console.log("Form resized");
    }, 100)); // 100 ms debounce delay

    if (formContainerRef.current) {
      resizeObserver.observe(formContainerRef.current);
    }

    return () => {
      // Clean up observer on component unmount
      if (formContainerRef.current) {
        resizeObserver.unobserve(formContainerRef.current);
      }
    };
  }, []); // Empty array to run once when the component mounts

  return (
    <div style={{ padding: 20 }} ref={formContainerRef}>
      <h2>Form Permintaan Pemeliharaan Kendaraan Bermotor</h2>
      <Form layout="vertical" onFinish={onFinish} ref={formRef}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Nama Pemohon"
              name="nama_pemohon"
              rules={[{ required: true, message: "Harap isi nama pemohon" }]}>
              <Input placeholder="Masukkan nama pemohon" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Unit Kerja"
              name="unit_kerja"
              rules={[{ required: true, message: "Harap isi unit kerja" }]}>
              <Input placeholder="Masukkan unit kerja" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Jenis Kendaraan"
              name="jenis_kendaraan"
              rules={[{ required: true, message: "Pilih jenis kendaraan" }]}>
              <Select placeholder="Pilih jenis kendaraan">
                <Option value="mobil">Mobil</Option>
                <Option value="motor">Motor</Option>
                <Option value="PickUP">PickUP</Option>
                <Option value="minibus">MiniBus</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Nomor Polisi"
              name="nomor_polisi"
              rules={[{ required: true, message: "Harap isi nomor polisi kendaraan" }]}>
              <Input placeholder="Masukkan nomor polisi kendaraan" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Tanggal Permintaan"
              name="tanggal"
              rules={[{ required: true, message: "Pilih tanggal permintaan" }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Pilih Jenis Kerusakan / Pemeliharaan"
          name="jenis_kerusakan"
          rules={[{ required: true, message: "Pilih jenis kerusakan atau pemeliharaan" }]}>
          <Select placeholder="Pilih jenis kerusakan / pemeliharaan" mode="multiple">
            <Option value="mesin">Kerusakan Mesin</Option>
            <Option value="rangka">Kerusakan Rangka</Option>
            <Option value="ban">Ban Rusak</Option>
            <Option value="kelistrikan">Kerusakan Kelistrikan</Option>
            <Option value="bodi">Kerusakan Bodi</Option>
            <Option value="service">Service Rutin</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Deskripsi Permintaan"
          name="deskripsi"
          rules={[{ required: true, message: "Harap isi deskripsi permintaan" }]}>
          <TextArea rows={4} placeholder="Deskripsikan kerusakan atau pemeliharaan yang dibutuhkan" />
        </Form.Item>
        <Form.Item label="Unggah Foto (Opsional)" name="foto">
          <Upload
            name="foto"
            listType="picture"
            onChange={handleUploadChange}
            beforeUpload={() => false} // Prevent automatic upload
            multiple>
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

export default FormService;
