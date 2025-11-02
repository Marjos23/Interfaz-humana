import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Empleados from "./pages/Empleados";
import Asistencia from "./pages/Asistencia";
import Permisos from "./pages/Permisos";
import Propuestas from "./pages/Propuestas";
import Votaciones from "./pages/Votaciones";
import AdminDashboard from "./pages/AdminDashboard";
import Estadisticas from "./pages/Estadisticas";
import MiPerfil from "./pages/MiPerfil";
import Eventos from "./pages/Eventos";
import Encuesta from "./pages/Encuesta";
import MainWrapper from "./pages/MainWrapper";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route element={<MainWrapper />}>
          <Route path="/propuestas" element={<Propuestas />} />
          <Route path="/problemas" element={<Asistencia />} />
          <Route path="/votaciones" element={<Votaciones />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/encuesta" element={<Encuesta />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/mi-perfil" element={<MiPerfil />} />
          {/* Rutas legacy */}
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/asistencia" element={<Asistencia />} />
          <Route path="/permisos" element={<Permisos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
