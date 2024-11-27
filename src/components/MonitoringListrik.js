import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Row } from "antd";

const MonitoringListrik = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/monitoring/lantai4A"); // Ganti "/target-page" dengan path halaman tujuan
  };

  return (
    <Row>
    <Card
      onClick={handleCardClick}
      sx={{ maxWidth: 345, cursor: "pointer", margin: "20px" }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          Lantai 4 Timur
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Klik untuk menuju halaman tujuan.
        </Typography>
      </CardContent>
    </Card>
    {/* <Card
      onClick={handleCardClick}
      sx={{ maxWidth: 345, cursor: "pointer", margin: "20px" }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          Lantai 4 Barat
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Klik untuk menuju halaman tujuan.
        </Typography>
      </CardContent>
    </Card> */}
    </Row>
  );
};

export default MonitoringListrik;
