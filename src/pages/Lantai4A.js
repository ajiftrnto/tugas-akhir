import React, { useEffect, useState } from "react";
import mqtt from "mqtt";
import { Line } from "react-chartjs-2";
import GaugeChart from "react-gauge-chart";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "../css/Chart.css"

// Registrasi Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Lantai4A = () => {
  const [data, setData] = useState({
    teganganAB: [],
    teganganBC: [],
    teganganCA: [],
    teganganRN: [],
    teganganSN: [],
    teganganTN: [],
    aktif: [],
    reaktif: [],
    semu: [],
    arusR: [],
    arusS: [],
    arusT: [],
    cosphi: [],
    frequensi: [],
    energi: [],
    timestamps: [],
  });

  const [latestValues, setLatestValues] = useState({
    teganganAB: 0,
    teganganBC: 0,
    teganganCA: 0,
    teganganRN: 0,
    teganganSN: 0,
    teganganTN: 0,
    aktif: 0,
    reaktif: 0,
    semu: 0,
    arusR: 0,
    arusS: 0,
    arusT: 0,
    cosphi: 0,
    frequensi: 0,
    energi: 0,
  });

  useEffect(() => {
    // Konfigurasi koneksi MQTT
    const mqttOptions = {
      protocol: "wss", // Gunakan wss untuk koneksi WebSocket SSL
      username: "hivemq.client.1732353684558", // Ganti dengan username Anda
      password: "3d7R#!uXFWme,.89fYrU", // Ganti dengan password Anda
    };

    const client = mqtt.connect(
      "wss://projectta-b50ozr.a01.euc1.aws.hivemq.cloud:8884/mqtt",
      mqttOptions
    );

    client.on("connect", () => {
      console.log("Terhubung ke MQTT Broker");

      // Berlangganan ke topik yang sesuai
      client.subscribe("modbus/#", (err) => {
        if (err) {
          console.error("Gagal berlangganan ke topik:", err);
        }
      });
    });

    client.on("message", (topic, message) => {
      const value = parseFloat(message.toString());
      const timestamp = new Date().toLocaleTimeString();
    
      setData((prevData) => {
        const updatedData = { ...prevData, timestamps: [...prevData.timestamps, timestamp].slice(-10) };
    
        if (topic === "modbus/teganganAB") {
          updatedData.teganganAB = [...prevData.teganganAB, value].slice(-10);
          setLatestValues((prev) => ({ ...prev, teganganAB: value }));
        } else if (topic === "modbus/teganganBC") {
          updatedData.teganganBC = [...prevData.teganganBC, value].slice(-10);
          setLatestValues((prev) => ({ ...prev, teganganBC: value }));
        } else if (topic === "modbus/teganganCA") {
          updatedData.teganganCA = [...prevData.teganganCA, value].slice(-10);
          setLatestValues((prev) => ({ ...prev, teganganCA: value }));
        } else if (topic === "modbus/teganganRN") {
          updatedData.teganganRN = [...prevData.teganganRN, value].slice(-10);
          setLatestValues((prev) => ({ ...prev, teganganRN: value }));
        } else if (topic === "modbus/teganganSN") {
          updatedData.teganganSN = [...prevData.teganganSN, value].slice(-10);
          setLatestValues((prev) => ({ ...prev, teganganSN: value }));
        } else if (topic === "modbus/teganganTN") {
          updatedData.teganganTN = [...prevData.teganganTN, value].slice(-10);
          setLatestValues((prev) => ({ ...prev, teganganTN: value }));
        } else if (topic === "modbus/aktif") {
          updatedData.aktif = [...prevData.aktif, value].slice(-10);
          setLatestValues((prev) => ({ ...prev, aktif: value }));
        } else if (topic === "modbus/reaktif") {
          updatedData.reaktif = [...prevData.reaktif, value].slice(-10);
          setLatestValues((prev) => ({ ...prev, reaktif: value }));
        } else if (topic === "modbus/semu") {
          updatedData.semu = [...prevData.semu, value].slice(-10);
          setLatestValues((prev) => ({ ...prev, semu: value }));
        } else if (topic === "modbus/arusR") {
          updatedData.arusR = [...prevData.arusR, value].slice(-10);
          setLatestValues((prev) => ({ ...prev, arusR: value }));
        } else if (topic === "modbus/arusS") {
          updatedData.arusS = [...prevData.arusS, value].slice(-10);
          setLatestValues((prev) => ({ ...prev, arusS: value }));
        } else if (topic === "modbus/arusT") {
          updatedData.arusT = [...prevData.arusT, value].slice(-10);
          setLatestValues((prev) => ({ ...prev, arusT: value }));
        } else if (topic === "modbus/cosphi") {
          updatedData.cosphi = [...prevData.cosphi, value].slice(-10);
          setLatestValues((prev) => ({ ...prev, cosphi: value }));
        } else if (topic === "modbus/frequensi") {
          updatedData.frequensi = [...prevData.frequensi, value].slice(-10);
          setLatestValues((prev) => ({ ...prev, frequensi: value }));
        } else if (topic === "modbus/energi") {
          updatedData.energi = [...prevData.energi, value].slice(-10);
          setLatestValues((prev) => ({ ...prev, energi: value }));
        }
    
        return updatedData;
      });
    });

    // Cleanup pada unmount
    return () => {
      client.end();
    };
  }, []);

  // Data untuk Chart.js
  const chartData = {
    labels: data.timestamps,
    datasets: [
      {
        label: "Tegangan AB",
        data: data.teganganAB,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
      {
        label: "Tegangan BC",
        data: data.teganganBC,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
      },
      {
        label: "Tegangan CA",
        data: data.teganganCA,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
    ],
  };

  // Opsi untuk Chart.js
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tegangan 3 Phase",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Waktu",
        },
      },
      y: {
        title: {
          display: true,
          text: "Tegangan (V)",
        },
        suggestedMin: 0, // Nilai minimum untuk tegangan
        suggestedMax: 500, // Sesuaikan dengan batas tegangan maksimum
      },
    },
  };
  const chartData1 = {
    labels: data.timestamps,
    datasets: [
      {
        label: "Tegangan RN",
        data: data.teganganRN,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
      {
        label: "Tegangan SN",
        data: data.teganganSN,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
      },
      {
        label: "Tegangan TN",
        data: data.teganganTN,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
    ],
  };

  // Opsi untuk Chart.js
  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tegangan 1 Phase",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Waktu",
        },
      },
      y: {
        title: {
          display: true,
          text: "Tegangan (V)",
        },
        suggestedMin: 0, // Nilai minimum untuk tegangan
        suggestedMax: 300, // Sesuaikan dengan batas tegangan maksimum
      },
    },
  };
  const chartData2 = {
    labels: data.timestamps,
    datasets: [
      {
        label: "Beban R",
        data: data.arusR,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
      {
        label: "Beban S",
        data: data.arusS,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
      },
      {
        label: "Beban T",
        data: data.arusT,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
    ],
  };

  // Opsi untuk Chart.js
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Beban Pemakaian",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Waktu",
        },
      },
      y: {
        title: {
          display: true,
          text: "Arus (A)",
        },
        suggestedMin: 0, // Nilai minimum untuk tegangan
        suggestedMax: 100, // Sesuaikan dengan batas tegangan maksimum
      },
    },
  };
  const chartData3 = {
    labels: data.timestamps,
    datasets: [
      {
        label: "Daya Aktif",
        data: data.aktif,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
      {
        label: "Daya Reaktif",
        data: data.reaktif,
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
      },
      {
        label: "Daya Semu",
        data: data.semu,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
    ],
  };

  // Opsi untuk Chart.js
  const options3 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Besaran Daya",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Waktu",
        },
      },
      y: {
        title: {
          display: true,
          text: "Watt (W)",
        },
        suggestedMin: 0, // Nilai minimum untuk tegangan
        suggestedMax: 3000, // Sesuaikan dengan batas tegangan maksimum
      },
    },
  };

  return (
    <div>
    <h2 style={{textAlign: "center"}}>Monitoring Listrik Kantor Pusat BPKP</h2>
  
    <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "20px", marginBottom: "20px",backgroundColor: "#f0f8ff", }}>
      {/* Bagian Tegangan */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
        {/* Card Tegangan AB */}
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", }}>
        <h2 style={{textAlign: "center"}}>Tegangan 3 phase</h2>
          <h4 style={{ textAlign: "center" }}>R-S</h4>
          <GaugeChart
            id="gauge-ab"
            nrOfLevels={20}
            colors={["#FF5F6D", "#FFC371"]}
            arcWidth={0.3}
            percent={latestValues.teganganAB / 500}
            textColor="#000"
            formatTextValue={() => `${latestValues.teganganAB} V`}
          />
          <h4 style={{ textAlign: "center" }}>R-T</h4>
          <GaugeChart
            id="gauge-bc"
            nrOfLevels={20}
            colors={["#5BE12C", "#F5CD19"]}
            arcWidth={0.3}
            percent={latestValues.teganganBC / 500}
            textColor="#000"
            formatTextValue={() => `${latestValues.teganganBC} V`}
          />
          <h4 style={{ textAlign: "center" }}>S-T</h4>
          <GaugeChart
            id="gauge-ca"
            nrOfLevels={20}
            colors={["#3D4ED8", "#25A5E6"]}
            arcWidth={0.3}
            percent={latestValues.teganganCA / 500}
            textColor="#000"
            formatTextValue={() => `${latestValues.teganganCA} V`}
          />
        </div>
  
        {/* Card Tegangan BC */}
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <h2 style={{textAlign: "center"}}>Tegangan 1 phase</h2>
          <h4 style={{ textAlign: "center" }}>R-N</h4>
          <GaugeChart
            id="gauge-rn"
            nrOfLevels={20}
            colors={["#FF5F6D", "#FFC371"]}
            arcWidth={0.3}
            percent={latestValues.teganganRN / 500}
            textColor="#000"
            formatTextValue={() => `${latestValues.teganganRN} V`}
          />
          <h4 style={{ textAlign: "center" }}>S-N</h4>
          <GaugeChart
            id="gauge-sn"
            nrOfLevels={20}
            colors={["#5BE12C", "#F5CD19"]}
            arcWidth={0.3}
            percent={latestValues.teganganSN / 500}
            textColor="#000"
            formatTextValue={() => `${latestValues.teganganSN} V`}
          />
          <h4 style={{ textAlign: "center" }}>T-N</h4>
          <GaugeChart
            id="gauge-tn"
            nrOfLevels={20}
            colors={["#3D4ED8", "#25A5E6"]}
            arcWidth={0.3}
            percent={latestValues.teganganTN / 500}
            textColor="#000"
            formatTextValue={() => `${latestValues.teganganTN} V`}
          />
        </div>
  
        {/* Card Tegangan CA */}
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h2 style={{textAlign: "center"}}>Arus Beban</h2>
          <h4 style={{ textAlign: "center" }}>R</h4>
          <GaugeChart
            id="gauge-ir"
            nrOfLevels={20}
            colors={["#FF5F6D", "#FFC371"]}
            arcWidth={0.3}
            percent={latestValues.arusR / 500}
            textColor="#000"
            formatTextValue={() => `${latestValues.arusR} A`}
          />
          <h4 style={{ textAlign: "center" }}>S</h4>
          <GaugeChart
            id="gauge-is"
            nrOfLevels={20}
            colors={["#5BE12C", "#F5CD19"]}
            arcWidth={0.3}
            percent={latestValues.arusS / 500}
            textColor="#000"
            formatTextValue={() => `${latestValues.arusS} A`}
          />
          <h4 style={{ textAlign: "center" }}>T</h4>
          <GaugeChart
            id="gauge-it"
            nrOfLevels={20}
            colors={["#3D4ED8", "#25A5E6"]}
            arcWidth={0.3}
            percent={latestValues.arusT / 500}
            textColor="#000"
            formatTextValue={() => `${latestValues.arusT} A`}
          />
        </div>
      </div>
  
      {/* Bagian Power Meter */}
      <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h3 style={{ textAlign: "center"}}>Power Meter</h3>
        <div style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "#333" }}>
          <p>Daya Aktif: <span style={{ color: "#FF5733" }}>{latestValues.aktif || 0}</span> W</p>
          <p>Daya Reaktif: <span style={{ color: "#28B463" }}>{latestValues.reaktif || 0}</span> VAR</p>
          <p>Daya Semu: <span style={{ color: "#3498DB" }}>{latestValues.semu || 0}</span> VA</p>
          <p>Energi: <span style={{ color: "#B8860B" }}>{latestValues.energi || 0}</span> Kwh</p>
          <p>Frekuensi: <span style={{ color: "#9932CC" }}>{latestValues.frequensi || 0}</span> Hz</p>
          <p>Cos Phi: <span style={{ color: "#E9967A" }}>{latestValues.cosphi || 0}</span> </p>
        </div>
      </div>
    </div>
  
    {/* Line Chart */}
    <div className="chart-container">
      <div className="chart-box">
        <Line data={chartData} options={options} />
      </div>
      <div className="chart-box">
        <Line data={chartData1} options={options1} />
      </div>
      <div className="chart-box">
        <Line data={chartData2} options={options2} />
      </div>
      <div className="chart-box">
        <Line data={chartData3} options={options3} />
      </div>
    </div>
    </div>
  );
};

export default Lantai4A;
