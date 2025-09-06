import "./App.css";
import LoginForm from "./components/LoginForm";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import JugadorasAptas from "./components/JugadorasAptas";
import Index from "./components/Index";
import TipoSemana from "./components/TipoSemana";
import SemanaTrabajar from "./components/SemanaTrabajar.jsx";
import FormJugadoraMensual from "./components/FormJugadoraMensual";
import FormPercepcion from "./components/FormPercepcion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/jugadorasaptas" element={<JugadorasAptas />} />
      <Route path="/tiposemana" element={<TipoSemana />} />
      <Route path="/semanatrabajar" element={<SemanaTrabajar />} />
      <Route path="/formjugadora" element={<FormJugadoraMensual />} />
      <Route path="/formpercepcion" element={<FormPercepcion />} />
    </Routes>
  );
}

export default App;
