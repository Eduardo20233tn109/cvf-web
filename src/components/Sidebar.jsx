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
          width: isOpen ? 0 : 80,
          height: "100vh",
          backgroundColor: "#7a4d2b",
          transition: "width 0.3s ease-in-out",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1201,
        }}
      >
        <IconButton onClick={toggleSidebar} sx={{ color: "white" }}>
          <MenuIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Box>

      {/* Sidebar expandido */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: 320,
            backgroundColor: "#7a4d2b",
            color: "white",
            transition: "width 0.3s ease-in-out",
            zIndex: 1202,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "center",
          }}
        >
          <List>
            {/* Opciones para ADMIN */}
            {isAdmin && (
              <>
                <ListItem
                  button
                  onClick={() => {
                    navigate("/users");
                    toggleSidebar();
                  }}
                >
                  <ListItemIcon>
                    <PeopleIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Usuarios" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    navigate("/houses");
                    toggleSidebar();
                  }}
                >
                  <ListItemIcon>
                    <ApartmentIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Residencias" />
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
                >
                  <ListItemIcon>
                    <HomeIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Inicio" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    navigate("/residente/generar-visita");
                    toggleSidebar();
                  }}
                >
                  <ListItemIcon>
                    <AssignmentIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Generar visita" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    navigate("/residente/historial");
                    toggleSidebar();
                  }}
                >
                  <ListItemIcon>
                    <HistoryIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Historial" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => {
                    navigate("/residente/perfil");
                    toggleSidebar();
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Mi Perfil" />
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
