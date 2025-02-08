import React from "react";
import SelectDisease from "./SelectDisease";
import { Box } from "@mui/material";

function Body() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <SelectDisease></SelectDisease>
      </Box>
    </div>
  );
}

export default Body;
