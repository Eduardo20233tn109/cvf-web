import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  Alert
} from "@mui/material";
import axios from "axios";

const ResumenVisita = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleEditar = () => {
    navigate("/residente/generar-visita", { state });
  };

  const handleConfirmar = async () => {
    try {
      const payload = {
        ...state,
        numeroPersonas: parseInt(state.numeroPersonas),
        estado: "Pendiente",
        residenteId: JSON.parse(localStorage.getItem("user"))?._id,
      };

      const res = await axios.post("http://localhost:4000/api/visits/save", payload);
      navigate("/residente/generar-qr", { state: res.data });
    } catch (error) {
      console.error("Error al guardar visita:", error);
      alert("No se pudo confirmar la visita");
    }
  };

  if (!state) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        No hay datos para mostrar.
      </Alert>
    );
  }

  const datos = {
    "Fecha": state.fecha,
    "Hora": state.hora,
    "Visitante": state.nombreVisitante,
    "Número de personas": state.numeroPersonas,
    "Descripción": state.descripcion,
    "Tipo de visita": state.tipoVisita,
    "Placas del vehículo": state.placasVehiculo || "N/A",
    "Contraseña de acceso": state.contrasena,
    "Número de casa": state.numeroCasa || "No disponible",
  };

  return (
    <Box 
      maxWidth="md" 
      mx="auto" 
      sx={{ 
        py: { xs: 3, md: 4 },
        px: { xs: 2, md: 4 }
      }}
    >
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          borderRadius: 4,
          background: '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #f1f5f9',
        }}
      >
        <Box mb={4}>
          <Typography 
            variant="h4" 
            fontWeight={800}
            gutterBottom
            color="#0f172a"
            sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            Resumen de la Visita
          </Typography>
          <Typography 
            variant="body1" 
            color="#64748b" 
            fontWeight={500}
            sx={{ fontSize: { xs: '0.95rem', md: '1.125rem' } }}
          >
            Verifica que todos los datos estén correctos antes de confirmar
          </Typography>
        </Box>

        <Divider sx={{ mb: 4, borderColor: '#e2e8f0' }} />

        <Grid container spacing={3}>
          {Object.entries(datos).map(([label, value]) => (
            <Grid item xs={12} sm={6} key={label}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                  border: '1px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#14b8a6',
                    boxShadow: '0 4px 12px rgba(20, 184, 166, 0.1)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <Typography 
                  variant="subtitle2" 
                  fontWeight={700}
                  color="#0f172a"
                  mb={1}
                  sx={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}
                >
                  {label}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="#64748b"
                  fontWeight={500}
                  sx={{ fontSize: '1rem' }}
                >
                  {value || 'N/A'}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box 
          mt={5} 
          display="flex" 
          justifyContent="space-between" 
          flexWrap="wrap" 
          gap={2}
          sx={{
            pt: 3,
            borderTop: '1px solid #e2e8f0'
          }}
        >
          <Button
            variant="outlined"
            onClick={handleEditar}
            sx={{ 
              minWidth: { xs: "100%", sm: "160px" },
              borderColor: '#14b8a6',
              color: '#14b8a6',
              fontWeight: 700,
              borderRadius: '12px',
              padding: '14px 28px',
              fontSize: '15px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#0d9488',
                background: 'rgba(20, 184, 166, 0.08)',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(20, 184, 166, 0.2)',
              }
            }}
          >
            Modificar
          </Button>

          <Button
            variant="contained"
            onClick={handleConfirmar}
            sx={{ 
              minWidth: { xs: "100%", sm: "200px" },
              background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
              fontWeight: 700,
              borderRadius: '12px',
              padding: '14px 28px',
              fontSize: '15px',
              boxShadow: '0 4px 14px rgba(20, 184, 166, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              textTransform: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #0d9488 0%, #0891b2 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(20, 184, 166, 0.5)',
              },
              '&:active': {
                transform: 'translateY(0)',
              }
            }}
          >
            Confirmar y generar QR
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ResumenVisita;
