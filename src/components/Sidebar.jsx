import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Backdrop,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  People as PeopleIcon,
  Apartment as ApartmentIcon,
  Assignment as AssignmentIcon,
  History as HistoryIcon,
  Home as HomeIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  // No mostrar el sidebar en login
  if (location.pathname === "/") return null;

  const isAdmin = user?.tipoUsuario === "ADMIN";
  const isResidente = user?.tipoUsuario === "RESIDENTE";

  return (
    <>
      {/* Fondo oscuro cuando el menú está abierto */}
      <Backdrop
        open={isOpen}
        onClick={toggleSidebar}
        sx={{ zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      />

      {/* Columna visible cuando está cerrado */}
      <Box
        sx={{
          width: 80,
          height: "100vh",
          background: "#0f172a",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1201,
          boxShadow: "4px 0 20px rgba(0, 0, 0, 0.2)",
          borderRight: "1px solid rgba(20, 184, 166, 0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "20px",
          transition: "opacity 0.3s ease",
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? "none" : "auto",
        }}
      >
        <IconButton 
          onClick={toggleSidebar} 
          sx={{ 
            color: "white",
            background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            border: "3px solid rgba(20, 184, 166, 0.3)",
            boxShadow: "0 4px 16px rgba(20, 184, 166, 0.4), 0 0 0 4px rgba(20, 184, 166, 0.1)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              background: "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
              transform: "scale(1.1) rotate(90deg)",
              boxShadow: "0 8px 24px rgba(20, 184, 166, 0.6), 0 0 0 6px rgba(20, 184, 166, 0.15)",
              borderColor: "rgba(20, 184, 166, 0.5)",
            },
            "&:active": {
              transform: "scale(0.95) rotate(90deg)",
            }
          }}
        >
          <MenuIcon sx={{ fontSize: "28px" }} />
        </IconButton>
      </Box>

      {/* Sidebar expandido */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            background: "#0f172a",
            color: "white",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 1202,
            boxShadow: "4px 0 30px rgba(0, 0, 0, 0.4)",
            borderRight: "1px solid rgba(20, 184, 166, 0.3)",
            overflow: "hidden",
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          {/* Header del sidebar con botón y título */}
          <Box sx={{ 
            padding: "16px",
            borderBottom: "1px solid rgba(20, 184, 166, 0.2)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
            boxSizing: "border-box",
          }}>
            <IconButton 
              onClick={toggleSidebar} 
              sx={{ 
                color: "white",
                background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border: "3px solid rgba(20, 184, 166, 0.3)",
                boxShadow: "0 4px 16px rgba(20, 184, 166, 0.4)",
                flexShrink: 0,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  background: "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
                  transform: "scale(1.05) rotate(90deg)",
                  boxShadow: "0 6px 20px rgba(20, 184, 166, 0.6)",
                  borderColor: "rgba(20, 184, 166, 0.5)",
                },
                "&:active": {
                  transform: "scale(0.95) rotate(90deg)",
                }
              }}
            >
              <MenuIcon sx={{ fontSize: "24px" }} />
            </IconButton>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontSize: "22px",
                letterSpacing: "0.5px",
                flex: 1,
              }}
            >
              Menú
            </Typography>
          </Box>
          {/* Lista de opciones del menú */}
          <List sx={{ 
            flex: 1, 
            paddingTop: "8px",
            paddingBottom: "8px",
            paddingLeft: "0",
            paddingRight: "0",
            overflowY: "hidden",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            boxSizing: "border-box",
          }}>
            {/* Opciones para ADMIN */}
            {isAdmin && (
              <>
                <ListItem
                  button
                  onClick={() => {
                    navigate("/users");
                    toggleSidebar();
                  }}
                  sx={{
                    margin: "6px 8px",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    minHeight: "56px",
                    boxSizing: "border-box",
                    width: "calc(100% - 16px)",
                    maxWidth: "calc(100% - 16px)",
                    overflow: "visible",
                    background: location.pathname === "/users" 
                      ? "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))"
                      : "transparent",
                    border: location.pathname === "/users"
                      ? "2px solid rgba(20, 184, 166, 0.5)"
                      : "2px solid transparent",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background: "linear-gradient(135deg, rgba(20, 184, 166, 0.25), rgba(6, 182, 212, 0.25))",
                      transform: "translateX(8px)",
                      boxShadow: "0 6px 20px rgba(20, 184, 166, 0.4)",
                      borderColor: "rgba(20, 184, 166, 0.6)",
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "40px", flexShrink: 0 }}>
                    <PeopleIcon sx={{ 
                      color: location.pathname === "/users" ? "#14b8a6" : "white", 
                      fontSize: "28px",
                      transition: "all 0.3s ease",
                    }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Usuarios" 
                    primaryTypographyProps={{ 
                      fontWeight: location.pathname === "/users" ? 700 : 600,
                      fontSize: "16px",
                      color: location.pathname === "/users" ? "#14b8a6" : "white",
                      transition: "all 0.3s ease",
                      noWrap: false,
                    }}
                    sx={{ 
                      margin: 0,
                      overflow: "visible",
                      textOverflow: "clip",
                    }}
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    navigate("/houses");
                    toggleSidebar();
                  }}
                  sx={{
                    margin: "6px 8px",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    minHeight: "56px",
                    boxSizing: "border-box",
                    width: "calc(100% - 16px)",
                    maxWidth: "calc(100% - 16px)",
                    overflow: "visible",
                    background: location.pathname === "/houses" 
                      ? "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))"
                      : "transparent",
                    border: location.pathname === "/houses"
                      ? "2px solid rgba(20, 184, 166, 0.5)"
                      : "2px solid transparent",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background: "linear-gradient(135deg, rgba(20, 184, 166, 0.25), rgba(6, 182, 212, 0.25))",
                      transform: "translateX(8px)",
                      boxShadow: "0 6px 20px rgba(20, 184, 166, 0.4)",
                      borderColor: "rgba(20, 184, 166, 0.6)",
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "40px", flexShrink: 0 }}>
                    <ApartmentIcon sx={{ 
                      color: location.pathname === "/houses" ? "#14b8a6" : "white", 
                      fontSize: "28px",
                      transition: "all 0.3s ease",
                    }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Residencias"
                    primaryTypographyProps={{ 
                      fontWeight: location.pathname === "/houses" ? 700 : 600,
                      fontSize: "16px",
                      color: location.pathname === "/houses" ? "#14b8a6" : "white",
                      transition: "all 0.3s ease",
                      noWrap: false,
                    }}
                    sx={{ 
                      margin: 0,
                      overflow: "visible",
                      textOverflow: "clip",
                    }}
                  />
                </ListItem>
              </>
            )}

            {/* Opciones para RESIDENTE */}
            {isResidente && (
              <>
                <ListItem
                  button
                  onClick={() => {
                    navigate("/residente/dashboard");
                    toggleSidebar();
                  }}
                  sx={{
                    margin: "6px 8px",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    minHeight: "56px",
                    boxSizing: "border-box",
                    width: "calc(100% - 16px)",
                    maxWidth: "calc(100% - 16px)",
                    overflow: "visible",
                    background: location.pathname === "/residente/dashboard" 
                      ? "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))"
                      : "transparent",
                    border: location.pathname === "/residente/dashboard"
                      ? "2px solid rgba(20, 184, 166, 0.5)"
                      : "2px solid transparent",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background: "linear-gradient(135deg, rgba(20, 184, 166, 0.25), rgba(6, 182, 212, 0.25))",
                      transform: "translateX(8px)",
                      boxShadow: "0 6px 20px rgba(20, 184, 166, 0.4)",
                      borderColor: "rgba(20, 184, 166, 0.6)",
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "40px", flexShrink: 0 }}>
                    <HomeIcon sx={{ 
                      color: location.pathname === "/residente/dashboard" ? "#14b8a6" : "white", 
                      fontSize: "28px",
                      transition: "all 0.3s ease",
                    }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Inicio"
                    primaryTypographyProps={{ 
                      fontWeight: location.pathname === "/residente/dashboard" ? 700 : 600,
                      fontSize: "16px",
                      color: location.pathname === "/residente/dashboard" ? "#14b8a6" : "white",
                      transition: "all 0.3s ease",
                      noWrap: false,
                    }}
                    sx={{ 
                      margin: 0,
                      overflow: "visible",
                      textOverflow: "clip",
                    }}
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    navigate("/residente/generar-visita");
                    toggleSidebar();
                  }}
                  sx={{
                    margin: "6px 8px",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    minHeight: "56px",
                    boxSizing: "border-box",
                    width: "calc(100% - 16px)",
                    maxWidth: "calc(100% - 16px)",
                    overflow: "visible",
                    background: location.pathname === "/residente/generar-visita" 
                      ? "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))"
                      : "transparent",
                    border: location.pathname === "/residente/generar-visita"
                      ? "2px solid rgba(20, 184, 166, 0.5)"
                      : "2px solid transparent",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background: "linear-gradient(135deg, rgba(20, 184, 166, 0.25), rgba(6, 182, 212, 0.25))",
                      transform: "translateX(8px)",
                      boxShadow: "0 6px 20px rgba(20, 184, 166, 0.4)",
                      borderColor: "rgba(20, 184, 166, 0.6)",
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "40px", flexShrink: 0 }}>
                    <AssignmentIcon sx={{ 
                      color: location.pathname === "/residente/generar-visita" ? "#14b8a6" : "white", 
                      fontSize: "28px",
                      transition: "all 0.3s ease",
                    }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Generar visita"
                    primaryTypographyProps={{ 
                      fontWeight: location.pathname === "/residente/generar-visita" ? 700 : 600,
                      fontSize: "16px",
                      color: location.pathname === "/residente/generar-visita" ? "#14b8a6" : "white",
                      transition: "all 0.3s ease",
                      noWrap: false,
                    }}
                    sx={{ 
                      margin: 0,
                      overflow: "visible",
                      textOverflow: "clip",
                    }}
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    navigate("/residente/historial");
                    toggleSidebar();
                  }}
                  sx={{
                    margin: "6px 8px",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    minHeight: "56px",
                    boxSizing: "border-box",
                    width: "calc(100% - 16px)",
                    maxWidth: "calc(100% - 16px)",
                    overflow: "visible",
                    background: location.pathname === "/residente/historial" 
                      ? "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))"
                      : "transparent",
                    border: location.pathname === "/residente/historial"
                      ? "2px solid rgba(20, 184, 166, 0.5)"
                      : "2px solid transparent",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background: "linear-gradient(135deg, rgba(20, 184, 166, 0.25), rgba(6, 182, 212, 0.25))",
                      transform: "translateX(8px)",
                      boxShadow: "0 6px 20px rgba(20, 184, 166, 0.4)",
                      borderColor: "rgba(20, 184, 166, 0.6)",
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "40px", flexShrink: 0 }}>
                    <HistoryIcon sx={{ 
                      color: location.pathname === "/residente/historial" ? "#14b8a6" : "white", 
                      fontSize: "28px",
                      transition: "all 0.3s ease",
                    }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Historial"
                    primaryTypographyProps={{ 
                      fontWeight: location.pathname === "/residente/historial" ? 700 : 600,
                      fontSize: "16px",
                      color: location.pathname === "/residente/historial" ? "#14b8a6" : "white",
                      transition: "all 0.3s ease",
                      noWrap: false,
                    }}
                    sx={{ 
                      margin: 0,
                      overflow: "visible",
                      textOverflow: "clip",
                    }}
                  />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    navigate("/residente/perfil");
                    toggleSidebar();
                  }}
                  sx={{
                    margin: "6px 8px",
                    borderRadius: "12px",
                    padding: "12px 14px",
                    minHeight: "56px",
                    boxSizing: "border-box",
                    width: "calc(100% - 16px)",
                    maxWidth: "calc(100% - 16px)",
                    overflow: "visible",
                    background: location.pathname === "/residente/perfil" 
                      ? "linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(6, 182, 212, 0.2))"
                      : "transparent",
                    border: location.pathname === "/residente/perfil"
                      ? "2px solid rgba(20, 184, 166, 0.5)"
                      : "2px solid transparent",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      background: "linear-gradient(135deg, rgba(20, 184, 166, 0.25), rgba(6, 182, 212, 0.25))",
                      transform: "translateX(8px)",
                      boxShadow: "0 6px 20px rgba(20, 184, 166, 0.4)",
                      borderColor: "rgba(20, 184, 166, 0.6)",
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: "40px", flexShrink: 0 }}>
                    <PersonIcon sx={{ 
                      color: location.pathname === "/residente/perfil" ? "#14b8a6" : "white", 
                      fontSize: "28px",
                      transition: "all 0.3s ease",
                    }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Mi Perfil"
                    primaryTypographyProps={{ 
                      fontWeight: location.pathname === "/residente/perfil" ? 700 : 600,
                      fontSize: "16px",
                      color: location.pathname === "/residente/perfil" ? "#14b8a6" : "white",
                      transition: "all 0.3s ease",
                      noWrap: false,
                    }}
                    sx={{ 
                      margin: 0,
                      overflow: "visible",
                      textOverflow: "clip",
                    }}
                  />
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Sidebar;
