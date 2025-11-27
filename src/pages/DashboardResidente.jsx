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
      <Typography 
        variant="h3" 
        fontWeight={700}
        mb={1}
        color="#0f172a"
      >
        ¡Hola, {user?.nombre} {user?.apellido}!
      </Typography>
      <Typography 
        variant="h6" 
        color="#64748b" 
        mb={4}
        fontWeight={500}
      >
        ¿Qué deseas hacer hoy?
      </Typography>

      <Grid container spacing={4}>
        {actions.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ 
              borderRadius: 3, 
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 30px rgba(20, 184, 166, 0.15)',
                border: '1px solid #14b8a6',
              }
            }}>
              <CardActionArea 
                onClick={item.action}
                sx={{
                  transition: 'all 0.3s ease',
                }}
              >
                <CardContent sx={{ textAlign: "center", py: 4, px: 3 }}>
                  <Box sx={{
                    display: 'inline-flex',
                    padding: '16px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
                    marginBottom: 2,
                    boxShadow: '0 4px 14px rgba(20, 184, 166, 0.4)',
                    '& svg': {
                      fontSize: '40px',
                      color: 'white',
                    }
                  }}>
                    {item.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    fontWeight={700}
                    mt={2}
                    mb={1.5}
                    color="#0f172a"
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="#64748b"
                    fontWeight={400}
                    lineHeight={1.6}
                  >
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
