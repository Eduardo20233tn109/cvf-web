import React from "react";
import { Box, Typography, Grid, Card, CardActionArea, CardContent, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PersonAdd, History, AccountCircle } from "@mui/icons-material";

const DashboardResidente = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const actions = [
    {
      title: "Crear Visita",
      description: "Registra una nueva visita para tus invitados y genera el código QR de acceso.",
      icon: <PersonAdd />,
      gradient: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
      action: () => navigate("/residente/generar-visita"),
    },
    {
      title: "Historial de Visitas",
      description: "Consulta y gestiona todas tus visitas pasadas y pendientes.",
      icon: <History />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      action: () => navigate("/residente/historial"),
    },
    {
      title: "Mi Perfil",
      description: "Visualiza y actualiza tu información personal y datos de contacto.",
      icon: <AccountCircle />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      action: () => navigate("/residente/perfil"),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box 
        sx={{ 
          py: { xs: 3, md: 5 },
          px: { xs: 2, md: 0 }
        }}
      >
        <Box mb={5}>
          <Typography 
            variant="h3" 
            fontWeight={800}
            mb={1.5}
            color="#0f172a"
            sx={{
              fontSize: { xs: '2rem', md: '2.75rem' },
              background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ¡Hola, {user?.nombre} {user?.apellido}!
          </Typography>
          <Typography 
            variant="h6" 
            color="#64748b" 
            fontWeight={500}
            sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
          >
            ¿Qué deseas hacer hoy?
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {actions.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 4, 
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  background: '#ffffff',
                  border: '1px solid #f1f5f9',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: item.gradient,
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.4s ease',
                  },
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                    border: '1px solid transparent',
                    '&::before': {
                      transform: 'scaleX(1)',
                    },
                    '& .icon-container': {
                      transform: 'scale(1.1) rotate(5deg)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                    }
                  }
                }}
              >
                <CardActionArea 
                  onClick={item.action}
                  sx={{
                    height: '100%',
                    p: 0,
                  }}
                >
                  <CardContent sx={{ 
                    textAlign: "center", 
                    py: 5, 
                    px: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Box 
                      className="icon-container"
                      sx={{
                        display: 'inline-flex',
                        padding: '20px',
                        borderRadius: '20px',
                        background: item.gradient,
                        marginBottom: 3,
                        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        '& svg': {
                          fontSize: '48px',
                          color: 'white',
                        }
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      fontWeight={700}
                      mb={2}
                      color="#0f172a"
                      sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      color="#64748b"
                      fontWeight={400}
                      lineHeight={1.7}
                      sx={{ 
                        fontSize: { xs: '0.9rem', md: '1rem' },
                        maxWidth: '280px'
                      }}
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
    </Container>
  );
};

export default DashboardResidente;
