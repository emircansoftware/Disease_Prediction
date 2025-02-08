import { Box } from "@mui/material";
import React from "react";
import Avatar from "@mui/material/Avatar";
import Navi from "../components/Navi";

function NotFound() {
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
        <Avatar
          sx={{ width: 600, height: 600 }}
          alt="404"
          src="/src/assets/images/404.avif"
        />
      </Box>
    </div>
  );
}

export default NotFound;
