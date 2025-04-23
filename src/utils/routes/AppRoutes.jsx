import { Routes, Route } from "react-router-dom";

// Páginas comunes
import Login from "../../pages/Login";
import GestionCasas from "../../pages/GestionCasas";
import GestionUsuarios from "../../pages/GestionUsuarios";

// Páginas del residente
import DashboardResidente from "../../pages/DashboardResidente";
import GenerarVisita from "../../pages/GenerarVisita";
import GenerarQR from "../../pages/GenerarQR";
import HistorialVisitas from "../../pages/HistorialVisitas";
import ResumenVisita from "../../pages/ResumenVisita";
import EditarPerfilResidente from "../../pages/EditarPerfilResidente"; // ✅ Importación corregida

// Rutas protegidas
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";
import ProtectedRouteResidente from "./ProtectedRouteResidente";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Página de login como inicio */}
      <Route path="/" element={<Login />} />

      {/* Rutas protegidas solo para ADMIN */}
      <Route element={<ProtectedRouteAdmin />}>
        <Route path="/users" element={<GestionUsuarios />} />
        <Route path="/houses" element={<GestionCasas />} />
      </Route>

      {/* Rutas protegidas solo para RESIDENTE */}
      <Route element={<ProtectedRouteResidente />}>
        <Route path="/residente/dashboard" element={<DashboardResidente />} />
        <Route path="/residente/generar-visita" element={<GenerarVisita />} />
        <Route path="/residente/resumen-visita" element={<ResumenVisita />} />
        <Route path="/residente/generar-qr" element={<GenerarQR />} />
        <Route path="/residente/historial" element={<HistorialVisitas />} />
        <Route path="/residente/perfil" element={<EditarPerfilResidente />} /> {/* ✅ Ruta actualizada */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
