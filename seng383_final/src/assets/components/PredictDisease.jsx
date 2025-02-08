import React from "react";
import { PieChart } from "@mui/x-charts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Badge from "@mui/material/Badge";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

function PredictDisease({ predictedDiseases }) {
  if (!Array.isArray(predictedDiseases) || predictedDiseases.length === 0) {
    return <Typography variant="body1">No predictions available.</Typography>;
  }

  const chartData = predictedDiseases.map(([disease, probability], index) => ({
    id: index,
    value: probability * 100,
    label: disease,
  }));

  return (
    <Card sx={{ maxWidth: 500, marginTop: "200px ", padding: 2.5 }}>
      <CardContent>
        <Alert
          variant="filled"
          icon={
            <Badge color="secondary">
              <HealthAndSafetyIcon />
            </Badge>
          }
          severity="success"
        >
          Predicted Diseases
        </Alert>
      </CardContent>

      <CardContent
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PieChart series={[{ data: chartData }]} width={400} height={400} />
      </CardContent>

      <CardContent>
        <Typography align="center" gutterBottom variant="h5" component="div">
          Disease Predictions
        </Typography>
        <Typography variant="body1" color="error" align="center">
          These diseases are not confirmed. Please consult a doctor.
        </Typography>
        <List sx={{ marginTop: 2 }}>
          {predictedDiseases.map(([disease, probability], index) => (
            <ListItem key={index} disableGutters>
              <ListItemText
                primary={`${disease}: ${(probability * 100).toFixed(2)}%`}
              />
              <LocalHospitalIcon />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default PredictDisease;
