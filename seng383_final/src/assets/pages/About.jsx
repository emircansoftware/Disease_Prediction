import * as React from "react";
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import Navi from "../components/Navi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function About() {
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
        <Grid2 container spacing={10}>
          <Grid2 item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="emircan"
                height="400"
                image="/src/assets/images/linkedin.jpg"
              />
              <CardContent>
                <Typography
                  align="center"
                  gutterBottom
                  variant="h4"
                  component="div"
                >
                  Emircan Güneş 202128003
                </Typography>
                <Typography
                  align="center"
                  variant="body1"
                  sx={{ color: "text.secondary" }}
                >
                  Frontend-Machine Learning Developer
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="deniz"
                height="400"
                image="/src/assets/images/deniz.jpg"
              />
              <CardContent>
                <Typography
                  align="center"
                  gutterBottom
                  variant="h4"
                  component="div"
                >
                  Mehmet Deniz Kaya 202128018
                </Typography>
                <Typography
                  align="center"
                  variant="body1"
                  sx={{ color: "text.secondary" }}
                >
                  Backend-Machine Learning Developer
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
          <Grid2 item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="berkay"
                height="400"
                image="/src/assets/images/berkay.jpg"
              />
              <CardContent>
                <Typography
                  align="center"
                  gutterBottom
                  variant="h4"
                  component="div"
                >
                  Halil Berkay Güngör 202028006
                </Typography>
                <Typography
                  align="center"
                  variant="body1"
                  sx={{ color: "text.secondary" }}
                >
                  Backend-Machine Learning Developer
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
      </Box>
    </div>
  );
}
