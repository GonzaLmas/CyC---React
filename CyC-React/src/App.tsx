import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import JugadorasAptas from "./components/JugadorasAptas";
import Index from "./components/Index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/jugadorasaptas" element={<JugadorasAptas />} />
    </Routes>
  );
}

export default App;
