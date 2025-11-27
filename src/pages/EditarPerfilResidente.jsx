import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Avatar,
  Snackbar,
  Alert,
  Paper,
  Grid
} from "@mui/material";
import axios from "axios";

const primaryColor = "#14b8a6";
const secondaryColor = "#06b6d4";

const PerfilResidente = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    username: "",
    phone: "",
    birthday: "",
    direccion: ""
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/users/${user._id}`);
        const data = res.data;
        const direccion = `${data.house_id?.address?.street}, ${data.house_id?.address?.city}, ${data.house_id?.address?.zip}`;
        setFormData({
          nombre: data.nombre,
          apellido: data.apellido,
          username: data.username,
          phone: data.phone,
          birthday: data.birthday?.slice(0, 10),
          direccion
        });
      } catch (error) {
        console.error("❌ Error al cargar perfil:", error);
        setSnackbar({
          open: true,
          message: "Error al cargar perfil",
          severity: "error"
        });
      }
    };

    fetchProfile();
  }, [user._id]);

  const handleChange = (e) => {
    setSnackbar({ ...snackbar, open: false });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkUsernameUnique = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/users/check-username?username=${formData.username}`
      );
      return res.data.available || res.data._id === user._id;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isUnique = await checkUsernameUnique();
    if (!isUnique) {
      return setSnackbar({
        open: true,
        message: "El nombre de usuario ya está en uso",
        severity: "error"
      });
    }

    const data = {
      userId: user._id,
      name: formData.nombre,
      apellido: formData.apellido,
      email: formData.username,
      phone: formData.phone,
      birthday: formData.birthday
    };

    try {
      await axios.put("http://localhost:4000/api/users/update-profile", data);
      setSnackbar({
        open: true,
        message: "Perfil actualizado correctamente",
        severity: "success"
      });
    } catch (err) {
      console.error("❌ Error al actualizar perfil:", err);
      setSnackbar({
        open: true,
        message: "Hubo un error al actualizar",
        severity: "error"
      });
    }
  };

  return (
    <Box p={4}>
      <Typography 
        variant="h4" 
        fontWeight={700}
        mb={1}
        color="#0f172a"
      >
        Mi Perfil
      </Typography>
      <Typography variant="h6" color="#64748b" mb={4} fontWeight={500}>
        Visualiza y actualiza tu información personal.
      </Typography>

      <Paper elevation={0} sx={{ 
        p: 4, 
        borderRadius: 3,
        background: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
      }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Columna izquierda: Avatar + dirección */}
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Avatar
                  src="/images/residente.png"
                  alt="Residente"
                  sx={{ width: 120, height: 120, mb: 2, mx: "auto" }}
                />
                <Typography variant="body2" fontWeight="bold" mb={1}>
                  Dirección
                </Typography>
                <TextField
                  value={formData.direccion}
                  disabled
                  fullWidth
                  size="small"
                />
                <Typography
                  variant="caption"
                  mt={1}
                  display="block"
                  color="textSecondary"
                >
                  La imagen de perfil no es editable.
                </Typography>
              </Box>
            </Grid>

            {/* Columna derecha: formulario */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    name="nombre"
                    value={formData.nombre}
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
                    label="Apellido"
                    name="apellido"
                    value={formData.apellido}
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
                    label="Usuario"
                    name="username"
                    value={formData.username}
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
                    label="Teléfono"
                    name="phone"
                    value={formData.phone}
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
                    label="Fecha de nacimiento"
                    name="birthday"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={formData.birthday}
                    onChange={handleChange}
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
                    Guardar cambios
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PerfilResidente;
