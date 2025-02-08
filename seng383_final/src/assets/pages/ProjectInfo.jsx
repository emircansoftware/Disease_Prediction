import React from "react";
import Navi from "../components/Navi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

function ProjectInfo() {
  return (
    <div>
      <Navi></Navi>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Card sx={{ maxWidth: 1000 }}>
          <CardMedia
            sx={{ height: 300 }}
            image="/src/assets/images/diseaseai.webp"
            title="green iguana"
          />
          <CardContent>
            <Typography
              align="center"
              gutterBottom
              variant="h4"
              component="div"
            >
              Healthicator
            </Typography>
            <Typography
              align="center"
              variant="body1"
              sx={{ color: "text.secondary" }}
            >
              Our project focuses on predicting diseases based on symptoms using
              artificial intelligence. We developed a system where disease
              symptoms are used to train an AI model, allowing it to make
              accurate predictions about potential health conditions. By
              inputting symptoms, the model analyzes the data and provides
              probable disease predictions, helping users better understand
              their health. For this project, we used Python as the primary
              programming language due to its rich ecosystem of libraries and
              tools for machine learning and AI development. The AI model was
              trained using various machine learning techniques and fine-tuned
              for optimal accuracy. This solution has the potential to aid in
              early diagnosis and improve healthcare efficiency.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default ProjectInfo;
