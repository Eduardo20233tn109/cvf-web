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

const primaryColor = "#14b8a6";
const secondaryColor = "#06b6d4";

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
          mb={3}
          color="#0f172a"
        >
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#667eea',
                    fontWeight: 600,
                  }
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#667eea',
                    fontWeight: 600,
                  }
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#667eea',
                    fontWeight: 600,
                  }
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#667eea',
                    fontWeight: 600,
                  }
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#667eea',
                    fontWeight: 600,
                  }
                }}
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
                      fontWeight: 600,
                      borderRadius: '10px',
                      background: formData.tipoVisita === tipo 
                        ? 'linear-gradient(135deg, #14b8a6, #06b6d4)' 
                        : "transparent",
                      color: formData.tipoVisita === tipo ? "#fff" : primaryColor,
                      borderColor: primaryColor,
                      transition: 'all 0.3s ease',
                      "&:hover": {
                        background: formData.tipoVisita === tipo 
                          ? 'linear-gradient(135deg, #0d9488, #0891b2)'
                          : "rgba(20, 184, 166, 0.1)"
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#667eea',
                    fontWeight: 600,
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Dirección"
                value={direccion}
                disabled
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: '#f8fafc',
                  }
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#667eea',
                    fontWeight: 600,
                  }
                }}
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
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                    },
                    '&.Mui-focused': {
                      boxShadow: '0 4px 20px rgba(102, 126, 234, 0.25)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#667eea',
                    fontWeight: 600,
                  }
                }}
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
                  background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: '15px',
                  padding: '14px',
                  borderRadius: '12px',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 14px rgba(20, 184, 166, 0.4)',
                  transition: 'all 0.3s ease',
                  "&:hover": {
                    background: 'linear-gradient(135deg, #0d9488, #0891b2)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(20, 184, 166, 0.5)',
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
