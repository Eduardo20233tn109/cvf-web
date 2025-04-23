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
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
          Resumen de la Visita
        </Typography>

        <Typography variant="subtitle1" color="textSecondary" mb={3}>
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
            sx={{ minWidth: "160px" }}
          >
            Modificar
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmar}
            sx={{ minWidth: "200px" }}
          >
            Confirmar y generar QR
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ResumenVisita;
