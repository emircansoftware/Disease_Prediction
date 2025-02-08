import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid2 from "@mui/material/Grid2";
import CardMedia from "@mui/material/CardMedia";
import { Box } from "@mui/material";
import {
  TextField,
  Button,
  Alert,
  Badge,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import axios from "axios";
import PredictDisease from "./PredictDisease";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";

export default function SelectDisease() {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [predictedDiseases, setPredictedDiseases] = useState([]);

  useEffect(() => {
    fetch("/UniqueSymptoms.csv")
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split("\n");
        const symptomsArray = rows
          .slice(1)
          .map((row) => row.split(",")[1]?.trim())
          .filter(Boolean);
        setSymptoms(symptomsArray);
      })
      .catch((error) => console.error("Hata:", error));
  }, []);

  const handleSymptomSelect = (event, value) => {
    if (!selectedSymptoms.includes(value) && value) {
      setSelectedSymptoms([...selectedSymptoms, value]);
    }
  };

  const handleDiagnose = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        symptoms: selectedSymptoms,
      });
      setPredictedDiseases(response.data.predicted_diseases);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
          padding: 2,
          marginTop: 10,
        }}
      >
        <Grid2 container spacing={10}>
          {" "}
          <Grid2 item xs={12} sm={6}>
            {" "}
            <Card sx={{ maxWidth: 400, marginTop: "200px ", padding: 3.5 }}>
              <CardMedia
                component="img"
                alt="disease"
                height="140"
                image="/src/assets/disease.jpg"
              />
              <CardContent>
                <Alert
                  variant="filled"
                  icon={
                    <Badge
                      color="secondary"
                      badgeContent={selectedSymptoms.length}
                    >
                      <HealthAndSafetyIcon />
                    </Badge>
                  }
                  severity="info"
                >
                  Select Symptoms
                </Alert>
                <Autocomplete
                  disablePortal
                  options={symptoms}
                  sx={{ width: 300, marginTop: 2 }}
                  value={searchTerm}
                  onChange={handleSymptomSelect}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  )}
                />
                <List sx={{ marginTop: 2 }}>
                  {selectedSymptoms.map((symptom, index) => (
                    <ListItem key={index} disableGutters>
                      <ListItemText primary={symptom} />
                      <CoronavirusIcon />
                    </ListItem>
                  ))}
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                  onClick={handleDiagnose}
                >
                  Predict
                </Button>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 item xs={12} sm={6}>
            {" "}
            {predictedDiseases.length > 0 && (
              <PredictDisease predictedDiseases={predictedDiseases} />
            )}
          </Grid2>
        </Grid2>
      </Box>
    </div>
  );
}
