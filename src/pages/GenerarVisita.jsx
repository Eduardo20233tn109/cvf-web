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
            mb={1.5}
            color="#0f172a"
            sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            Crear Nueva Visita
          </Typography>
          <Typography 
            variant="body1" 
            color="#64748b" 
            fontWeight={500}
          >
            Completa el formulario para registrar una nueva visita
          </Typography>
        </Box>

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
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: '#fafafa',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 12px rgba(20, 184, 166, 0.1)',
                      '& fieldset': {
                        borderColor: '#14b8a6',
                      }
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(20, 184, 166, 0.15)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#14b8a6',
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
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: '#fafafa',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 12px rgba(20, 184, 166, 0.1)',
                      '& fieldset': {
                        borderColor: '#14b8a6',
                      }
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(20, 184, 166, 0.15)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#14b8a6',
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
                inputProps={{ min: 1 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: '#fafafa',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 12px rgba(20, 184, 166, 0.1)',
                      '& fieldset': {
                        borderColor: '#14b8a6',
                      }
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(20, 184, 166, 0.15)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#14b8a6',
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
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: '#fafafa',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 12px rgba(20, 184, 166, 0.1)',
                      '& fieldset': {
                        borderColor: '#14b8a6',
                      }
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(20, 184, 166, 0.15)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#14b8a6',
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
                placeholder="Describe el motivo de la visita..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: '#fafafa',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 12px rgba(20, 184, 166, 0.1)',
                      '& fieldset': {
                        borderColor: '#14b8a6',
                      }
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(20, 184, 166, 0.15)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#14b8a6',
                    fontWeight: 600,
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography 
                variant="subtitle1" 
                fontWeight={700} 
                mb={2}
                color="#0f172a"
              >
                Tipo de visita:
              </Typography>
              <ToggleButtonGroup
                value={formData.tipoVisita}
                exclusive
                onChange={handleTipoVisita}
                fullWidth
                sx={{
                  gap: 1,
                  '& .MuiToggleButtonGroup-grouped': {
                    border: '2px solid #e2e8f0',
                    '&:not(:first-of-type)': {
                      borderRadius: '12px',
                      borderLeft: '2px solid #e2e8f0',
                    },
                    '&:first-of-type': {
                      borderRadius: '12px',
                    }
                  }
                }}
              >
                {["Familiar", "Técnica"].map((tipo) => (
                  <ToggleButton
                    key={tipo}
                    value={tipo}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: '15px',
                      py: 1.5,
                      borderRadius: '12px !important',
                      background: formData.tipoVisita === tipo 
                        ? 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)' 
                        : "#ffffff",
                      color: formData.tipoVisita === tipo ? "#fff" : "#64748b",
                      borderColor: formData.tipoVisita === tipo ? 'transparent' : '#e2e8f0',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      "&:hover": {
                        background: formData.tipoVisita === tipo 
                          ? 'linear-gradient(135deg, #0d9488 0%, #0891b2 100%)'
                          : "rgba(20, 184, 166, 0.08)",
                        borderColor: formData.tipoVisita === tipo ? 'transparent' : '#14b8a6',
                        color: formData.tipoVisita === tipo ? "#fff" : "#14b8a6",
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
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: '#fafafa',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 12px rgba(20, 184, 166, 0.1)',
                      '& fieldset': {
                        borderColor: '#14b8a6',
                      }
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(20, 184, 166, 0.15)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#14b8a6',
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
                    backgroundColor: '#f1f5f9',
                    '& fieldset': {
                      borderColor: '#e2e8f0',
                    }
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
                helperText="Mínimo 4 caracteres"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: '#fafafa',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 12px rgba(20, 184, 166, 0.1)',
                      '& fieldset': {
                        borderColor: '#14b8a6',
                      }
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(20, 184, 166, 0.15)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#14b8a6',
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
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: '#fafafa',
                    '&:hover': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 12px rgba(20, 184, 166, 0.1)',
                      '& fieldset': {
                        borderColor: '#14b8a6',
                      }
                    },
                    '&.Mui-focused': {
                      backgroundColor: '#ffffff',
                      boxShadow: '0 4px 20px rgba(20, 184, 166, 0.15)',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#14b8a6',
                    fontWeight: 600,
                  }
                }}
              />
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Alert 
                  severity="error"
                  sx={{
                    borderRadius: '12px',
                    '& .MuiAlert-icon': {
                      fontSize: '1.5rem'
                    }
                  }}
                >
                  {error}
                </Alert>
              </Grid>
            )}

            {success && (
              <Grid item xs={12}>
                <Alert 
                  severity="success"
                  sx={{
                    borderRadius: '12px',
                    '& .MuiAlert-icon': {
                      fontSize: '1.5rem'
                    }
                  }}
                >
                  Formulario válido, redirigiendo...
                </Alert>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: '16px',
                  padding: '16px',
                  borderRadius: '12px',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 14px rgba(20, 184, 166, 0.4)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  textTransform: 'none',
                  mt: 1,
                  "&:hover": {
                    background: 'linear-gradient(135deg, #0d9488 0%, #0891b2 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(20, 184, 166, 0.5)',
                  },
                  "&:active": {
                    transform: 'translateY(0)',
                  }
                }}
              >
                Continuar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default GenerarVisita;
