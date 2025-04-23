import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const verdeCVF = "#4D5637";

const GenerarVisita = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const direccion = user?.house_id?.address
    ? `${user.house_id.address.street}, ${user.house_id.address.city}, ${user.house_id.address.zip}`
    : "No disponible";

  const [formData, setFormData] = useState({
    fecha: "",
    hora: "",
    numeroPersonas: "",
    descripcion: "",
    tipoVisita: "",
    placasVehiculo: "",
    contrasena: "",
    confirmarContrasena: "",
    nombreVisitante: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTipoVisita = (_, value) => {
    if (value) setFormData({ ...formData, tipoVisita: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.contrasena.length < 4) {
      return setError("La palabra clave debe tener al menos 4 caracteres.");
    }

    if (formData.contrasena !== formData.confirmarContrasena) {
      return setError("Las claves no coinciden.");
    }

    navigate("/residente/resumen-visita", {
      state: { ...formData, numeroCasa: direccion },
    });
    setSuccess(true);
  };

  return (
    <Box maxWidth="md" mx="auto" p={4}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight="bold" color={verdeCVF} mb={3}>
          Crear Nueva Visita
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Fecha"
                name="fecha"
                InputLabelProps={{ shrink: true }}
                value={formData.fecha}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="time"
                label="Hora"
                name="hora"
                InputLabelProps={{ shrink: true }}
                value={formData.hora}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Número de personas"
                name="numeroPersonas"
                value={formData.numeroPersonas}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre del visitante"
                name="nombreVisitante"
                value={formData.nombreVisitante}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                label="Descripción"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                Tipo de visita:
              </Typography>
              <ToggleButtonGroup
                value={formData.tipoVisita}
                exclusive
                onChange={handleTipoVisita}
                fullWidth
              >
                {["Familiar", "Técnica"].map((tipo) => (
                  <ToggleButton
                    key={tipo}
                    value={tipo}
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      bgcolor: formData.tipoVisita === tipo ? verdeCVF : "transparent",
                      color: formData.tipoVisita === tipo ? "#fff" : verdeCVF,
                      borderColor: verdeCVF,
                      "&:hover": {
                        bgcolor: formData.tipoVisita === tipo ? verdeCVF : "#f5f5f5"
                      }
                    }}
                  >
                    {tipo}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Placas del vehículo"
                name="placasVehiculo"
                value={formData.placasVehiculo}
                onChange={handleChange}
                placeholder="000-00-00"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dirección"
                value={direccion}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Palabra clave"
                name="contrasena"
                type="text"
                value={formData.contrasena}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Verificar palabra clave"
                name="confirmarContrasena"
                type="text"
                value={formData.confirmarContrasena}
                onChange={handleChange}
                required
              />
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}

            {success && (
              <Grid item xs={12}>
                <Alert severity="success">Formulario válido, redirigiendo...</Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: verdeCVF,
                  color: "#fff",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#3a4f2e"
                  }
                }}
              >
                CONTINUAR
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default GenerarVisita;
