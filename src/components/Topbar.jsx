import React from "react"; 
import { Box, Button, Typography } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // No mostrar el encabezado en la página de Login
  if (location.pathname === "/") return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "80px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "#ffffff",
        backdropFilter: "blur(10px)",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        padding: "0 32px",
        zIndex: 1100,
        borderBottom: "1px solid #e2e8f0",
      }}
    >
     {/* Logo y título */}
<Box sx={{ 
  display: "flex", 
  alignItems: "center", 
  marginLeft: "75px",
  gap: "16px"
}}>
  <Box sx={{
    padding: "8px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05) rotate(5deg)",
    }
  }}>
    <img 
      src="../src/assets/img/LOGOTIPO.png" 
      alt="Logo" 
      style={{ 
        height: "45px", 
        filter: "brightness(0) invert(1)",
      }} 
    />
  </Box>
  <Typography 
    variant="h5" 
    sx={{ 
    fontWeight: 700,
    background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      letterSpacing: "0.5px",
    }}
  >
    CVF
  </Typography>
</Box>

      {/* Botón de Cerrar Sesión */}
      <Button
        variant="contained"
        sx={{
          background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
          color: "white",
          fontWeight: 800,
          textTransform: "none",
          borderRadius: "14px",
          padding: "11px 28px",
          fontSize: "15px",
          letterSpacing: "0.3px",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "0 4px 14px rgba(20, 184, 166, 0.4)",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent)",
            transition: "left 0.5s",
          },
          "&:hover": { 
            background: "linear-gradient(135deg, #0d9488, #0891b2)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 24px rgba(20, 184, 166, 0.5)",
          },
          "&:hover::before": {
            left: "100%",
          },
          "&:active": {
            transform: "translateY(-1px) scale(0.98)",
          }
        }}
        endIcon={<LogoutIcon sx={{ fontSize: "20px" }} />}
        onClick={() => navigate("/")}
      >
        Cerrar Sesión
      </Button>
    </Box>
  );
};

export default Topbar;
