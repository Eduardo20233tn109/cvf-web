import React from "react";
import { Box, Typography, Grid, Card, CardActionArea, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PersonAdd, History, AccountCircle } from "@mui/icons-material";

const DashboardResidente = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const actions = [
    {
      title: "Crear Visita",
      description: "Registra una nueva visita para tus invitados.",
      icon: <PersonAdd fontSize="large" color="primary" />,
      action: () => navigate("/residente/generar-visita"),
    },
    {
      title: "Historial de Visitas",
      description: "Consulta tus visitas pasadas.",
      icon: <History fontSize="large" color="secondary" />,
      action: () => navigate("/residente/historial"),
    },
    {
      title: "Mi Perfil",
      description: "Edita tus datos personales.",
      icon: <AccountCircle fontSize="large" color="action" />,
      action: () => navigate("/residente/perfil"),
    },
  ];

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" color="#4D5637" mb={1}>
        ¡Hola, {user?.nombre} {user?.apellido}!
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" mb={4}>
        ¿Qué deseas hacer hoy?
      </Typography>

      <Grid container spacing={3}>
        {actions.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
              <CardActionArea onClick={item.action}>
                <CardContent sx={{ textAlign: "center", py: 4 }}>
                  {item.icon}
                  <Typography variant="h6" fontWeight="bold" mt={2}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardResidente;
