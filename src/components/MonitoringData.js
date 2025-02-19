import React, { useEffect, useState } from "react";
import mqtt from "mqtt";

const MqttTable = () => {
  const [messages, setMessages] = useState([]); // Array untuk menyimpan data
  const brokerUrl = "ws://broker.hivemq.com:8000/mqtt"; // Ganti dengan broker Anda
  const topic = "test/topic"; // Ganti dengan topik Anda

  useEffect(() => {
    // Buat koneksi ke broker
    const client = mqtt.connect(brokerUrl);

    // Ketika berhasil terkoneksi
    client.on("connect", () => {
      console.log("Connected to MQTT Broker");

      // Subscribe ke topik
      client.subscribe(topic, (err) => {
        if (!err) {
          console.log(`Subscribed to topic: ${topic}`);
        } else {
          console.error("Subscription error:", err);
        }
      });
    });

    // Ketika menerima pesan
    client.on("message", (topic, payload) => {
      console.log(`Message received on ${topic}: ${payload.toString()}`);

      // Tambahkan data baru ke dalam array
      setMessages((prevMessages) => [
        ...prevMessages,
        { topic, message: payload.toString(), timestamp: new Date().toLocaleString() },
      ]);
    });

    // Cleanup: Disconnect saat komponen di-unmount
    return () => {
      client.end();
    };
  }, []);

  return (
    <div>
      <h1>MQTT Data Table</h1>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Topic</th>
            <th>Message</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{data.topic}</td>
              <td>{data.message}</td>
              <td>{data.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MqttTable;
