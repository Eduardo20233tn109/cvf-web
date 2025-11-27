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
    <Box maxWidth="md" mx="auto" p={4}>
      <Paper elevation={0} sx={{ 
        p: 4, 
        borderRadius: 3,
        background: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
      }}>
        <Typography 
          variant="h4" 
          fontWeight={700}
          gutterBottom
          color="#0f172a"
        >
          Resumen de la Visita
        </Typography>

        <Typography variant="h6" color="#64748b" mb={4} fontWeight={500}>
          Verifica que todos los datos estén correctos antes de confirmar.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          {Object.entries(datos).map(([label, value]) => (
            <Grid item xs={12} sm={6} key={label}>
              <Typography variant="subtitle2" fontWeight="bold">
                {label}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {value}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Box mt={4} display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
          <Button
            variant="outlined"
            onClick={handleEditar}
            sx={{ 
              minWidth: "160px",
              borderColor: '#14b8a6',
              color: '#14b8a6',
              fontWeight: 700,
              borderRadius: '10px',
              padding: '12px 24px',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#0d9488',
                background: 'rgba(20, 184, 166, 0.1)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            Modificar
          </Button>

          <Button
            variant="contained"
            onClick={handleConfirmar}
            sx={{ 
              minWidth: "200px",
              background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
              fontWeight: 700,
              borderRadius: '10px',
              padding: '12px 24px',
              boxShadow: '0 4px 14px rgba(20, 184, 166, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #0d9488, #0891b2)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(20, 184, 166, 0.5)',
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
