import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteResidente = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.tipoUsuario !== "RESIDENTE") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteResidente;
