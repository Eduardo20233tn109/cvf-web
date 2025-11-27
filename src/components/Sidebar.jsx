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
          background: "#0f172a",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1201,
          boxShadow: "4px 0 20px rgba(0, 0, 0, 0.2)",
          borderRight: "1px solid rgba(20, 184, 166, 0.3)",
        }}
      >
        <IconButton 
          onClick={toggleSidebar} 
          sx={{ 
            color: "white",
            marginTop: "15px",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "rgba(20, 184, 166, 0.2)",
              transform: "scale(1.1)",
            }
          }}
        >
          <MenuIcon sx={{ fontSize: "32px" }} />
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
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            zIndex: 1202,
            boxShadow: "4px 0 30px rgba(0, 0, 0, 0.4)",
            borderRight: "1px solid rgba(20, 184, 166, 0.3)",
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
                  sx={{
                    margin: "8px 12px",
                    borderRadius: "10px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                      transform: "translateX(6px)",
                      boxShadow: "0 4px 12px rgba(20, 184, 166, 0.5)",
                    }
                  }}
                >
                  <ListItemIcon>
                    <PeopleIcon sx={{ color: "white", fontSize: "26px" }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Usuarios" 
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      fontSize: "15px"
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
                    margin: "8px 12px",
                    borderRadius: "10px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                      transform: "translateX(6px)",
                      boxShadow: "0 4px 12px rgba(20, 184, 166, 0.5)",
                    }
                  }}
                >
                  <ListItemIcon>
                    <ApartmentIcon sx={{ color: "white", fontSize: "26px" }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Residencias"
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      fontSize: "15px"
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
                    margin: "8px 12px",
                    borderRadius: "10px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                      transform: "translateX(6px)",
                      boxShadow: "0 4px 12px rgba(20, 184, 166, 0.5)",
                    }
                  }}
                >
                  <ListItemIcon>
                    <HomeIcon sx={{ color: "white", fontSize: "26px" }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Inicio"
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      fontSize: "15px"
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
                    margin: "8px 12px",
                    borderRadius: "10px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                      transform: "translateX(6px)",
                      boxShadow: "0 4px 12px rgba(20, 184, 166, 0.5)",
                    }
                  }}
                >
                  <ListItemIcon>
                    <AssignmentIcon sx={{ color: "white", fontSize: "26px" }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Generar visita"
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      fontSize: "15px"
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
                    margin: "8px 12px",
                    borderRadius: "10px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                      transform: "translateX(6px)",
                      boxShadow: "0 4px 12px rgba(20, 184, 166, 0.5)",
                    }
                  }}
                >
                  <ListItemIcon>
                    <HistoryIcon sx={{ color: "white", fontSize: "26px" }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Historial"
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      fontSize: "15px"
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
                    margin: "8px 12px",
                    borderRadius: "10px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #14b8a6, #06b6d4)",
                      transform: "translateX(6px)",
                      boxShadow: "0 4px 12px rgba(20, 184, 166, 0.5)",
                    }
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon sx={{ color: "white", fontSize: "26px" }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Mi Perfil"
                    primaryTypographyProps={{ 
                      fontWeight: 600,
                      fontSize: "15px"
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
