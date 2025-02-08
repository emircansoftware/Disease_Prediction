import Home from "./assets/pages/Home";
import About from "./assets/pages/About";
import ProjectInfo from "./assets/pages/ProjectInfo";
import NotFound from "./assets/pages/NotFound";
import React from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About></About>} />
        <Route path="/projectinfo" element={<ProjectInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
