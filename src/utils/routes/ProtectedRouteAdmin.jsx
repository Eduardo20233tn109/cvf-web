import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteAdmin = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token || user?.tipoUsuario !== "ADMIN") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRouteAdmin;
