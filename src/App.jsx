import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Appointments from "./pages/Appointments";
import Tours from "./pages/Tours";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Appointments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/tours" element={<Tours />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
