import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, TextField, Button, Grid,
  Snackbar, Alert, Box, Divider, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  nombre: Yup.string().min(2, "Debe tener al menos 2 caracteres").max(50, "Máximo 50 caracteres").required("El nombre es obligatorio"),
  apellido: Yup.string().min(2, "Debe tener al menos 2 caracteres").max(50, "Máximo 50 caracteres").required("El apellido es obligatorio"),
  username: Yup.string().min(4, "Debe tener al menos 4 caracteres").max(30, "Máximo 30 caracteres").required("El usuario es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
  phone: Yup.string().matches(/^\d{10}$/, "Debe ser un número de 10 dígitos").required("El teléfono es obligatorio"),
  birthday: Yup.date()
  .required("La fecha de nacimiento es obligatoria")
  .test(
    "is-18",
    "El usuario debe ser mayor de 18 años",
    function (value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      return age > 18 || (age === 18 && m >= 0 && today.getDate() >= birthDate.getDate());
    }
  ),
  tipoUsuario: Yup.string().oneOf(["ADMIN", "RESIDENTE", "GUARDIA"]).required("El tipo de usuario es obligatorio"),
  enabled: Yup.boolean().required("El estado es obligatorio"),
  house_id: Yup.string().nullable(),
});

const EditUserModal = ({ open, onClose, user, onSave }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [houses, setHouses] = useState([]);
  const [usernameError, setUsernameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    axios.get("/api/houses")
      .then(res => {
        const housesData = Array.isArray(res.data) ? res.data : Array.isArray(res.data.data) ? res.data.data : [];
        setHouses(housesData);
      })
      .catch(err => {
        console.error("Error al obtener casas:", err);
        setHouses([]);
      });
  }, []);

  const handleUsernameCheck = async (username) => {
    if (!username || username === user.username) {
      setUsernameError("");
      return;
    }
    try {
      const res = await axios.get(`/api/users/check-username?username=${username}`);
      setUsernameError(res.data.exists ? "Este nombre de usuario ya está en uso." : "");
    } catch (error) {
      console.error("Error al verificar username:", error);
      setUsernameError("No se pudo verificar el usuario.");
    }
  };

  const handlePhoneCheck = async (phone) => {
    if (!phone || phone === user.phone) {
      setPhoneError("");
      return;
    }
    try {
      const res = await axios.get(`/api/users/check-phone?phone=${phone}`);
      setPhoneError(res.data.exists ? "Este teléfono ya está registrado." : "");
    } catch (error) {
      console.error("Error al verificar teléfono:", error);
      setPhoneError("No se pudo verificar el teléfono.");
    }
  };

  const handleSubmit = async (values) => {
    if (usernameError || phoneError) return;

    try {
      const payload = {
        nombre: values.nombre,
        apellido: values.apellido,
        username: values.username,
        password: values.password,
        phone: values.phone,
        birthday: new Date(values.birthday).toISOString().split("T")[0],
        tipoUsuario: values.tipoUsuario.toUpperCase(),
        enabled: values.enabled,
        house_id: values.tipoUsuario === "RESIDENTE" ? values.house_id || null : null
      };

      await axios.put(`/api/users/update/${user._id}`, payload);
      setSuccessMessage("Usuario actualizado correctamente");
      onSave?.();
      onClose();
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      setErrorMessage(err?.response?.data?.error || "Error al actualizar el usuario");
    }
  };

  if (!user) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        }
      }}
    >
      <DialogTitle sx={{ 
        textAlign: "center", 
        fontWeight: 800,
        fontSize: '28px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        pt: 3,
      }}>
        Editar Usuario
      </DialogTitle>
      <Divider sx={{ backgroundColor: "rgba(102, 126, 234, 0.2)", height: "2px", mb: 2 }} />
      <DialogContent sx={{ px: 4, pt: 2, pb: 4, backgroundColor: "#fff" }}>
        <Formik
          initialValues={{
            nombre: user?.nombre || "",
            apellido: user?.apellido || "",
            username: user?.username || "",
            password: user?.password || "",
            phone: user?.phone || "",
            birthday: user?.birthday?.split("T")[0] || "",
            tipoUsuario: user?.tipoUsuario || "RESIDENTE",
            enabled: user?.enabled ?? true,
            house_id: user?.house_id?._id || ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="nombre" label="Nombre *" value={values.nombre}
                    onChange={handleChange} error={touched.nombre && !!errors.nombre}
                    helperText={touched.nombre && errors.nombre} />

                  <TextField fullWidth name="apellido" label="Apellido *" value={values.apellido}
                    onChange={handleChange} sx={{ mt: 2 }} error={touched.apellido && !!errors.apellido}
                    helperText={touched.apellido && errors.apellido} />

                  <TextField fullWidth name="username" label="Usuario *" value={values.username}
                    onChange={(e) => {
                      handleChange(e);
                      handleUsernameCheck(e.target.value);
                    }}
                    sx={{ mt: 2 }} error={touched.username && (!!errors.username || !!usernameError)}
                    helperText={touched.username && (errors.username || usernameError)} />

                  <TextField fullWidth name="password" label="Contraseña *" type="password" value={values.password}
                    onChange={handleChange} sx={{ mt: 2 }} error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="phone" label="Teléfono *" value={values.phone}
                    onChange={(e) => {
                      handleChange(e);
                      handlePhoneCheck(e.target.value);
                    }}
                    error={touched.phone && (!!errors.phone || !!phoneError)}
                    helperText={touched.phone && (errors.phone || phoneError)} />

                  <TextField fullWidth type="date" name="birthday" label="Nacimiento *"
                    InputLabelProps={{ shrink: true }} value={values.birthday}
                    onChange={handleChange} sx={{ mt: 2 }} error={touched.birthday && !!errors.birthday}
                    helperText={touched.birthday && errors.birthday} />

                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Tipo de Usuario</InputLabel>
                    <Select name="tipoUsuario" value={values.tipoUsuario} onChange={(e) => {
                      setFieldValue("tipoUsuario", e.target.value);
                      if (e.target.value !== "RESIDENTE") setFieldValue("house_id", "");
                    }}>
                      <MenuItem value="ADMIN">Administrador</MenuItem>
                      <MenuItem value="RESIDENTE">Residente</MenuItem>
                      <MenuItem value="GUARDIA">Guardia</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mt: 2 }} disabled={values.tipoUsuario !== "RESIDENTE"}>
                    <InputLabel>Residencia</InputLabel>
                    <Select name="house_id" value={values.house_id || ""} onChange={handleChange}>
                      <MenuItem value=""><em>Sin residencia</em></MenuItem>
                      {houses.map((h) => (
                        <MenuItem key={h._id} value={h._id}>
                          {h.address?.street}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
                <Button 
                  onClick={onClose} 
                  variant="outlined"
                  sx={{ 
                    background: '#ffffff',
                    color: '#64748b',
                    fontWeight: 700,
                    borderRadius: '12px',
                    padding: '12px 32px',
                    textTransform: 'uppercase',
                    border: '2px solid #cbd5e1',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      background: '#f8fafc',
                      borderColor: '#94a3b8',
                      color: '#475569',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    },
                    '&:focus': {
                      outline: '3px solid rgba(148, 163, 184, 0.3)',
                      outlineOffset: '2px',
                      borderColor: '#94a3b8',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    }
                  }}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  variant="contained"
                  disabled={!!usernameError || !!phoneError}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    fontWeight: 700,
                    borderRadius: '12px',
                    padding: '12px 32px',
                    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 28px rgba(102, 126, 234, 0.5)',
                    },
                    '&:disabled': {
                      background: '#94a3b8',
                    }
                  }}
                >
                  Guardar Cambios
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>

      <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(null)}>
        <Alert onClose={() => setSuccessMessage(null)} severity="success">{successMessage}</Alert>
      </Snackbar>
      <Snackbar open={!!errorMessage} autoHideDuration={3000} onClose={() => setErrorMessage(null)}>
        <Alert onClose={() => setErrorMessage(null)} severity="error">{errorMessage}</Alert>
      </Snackbar>
    </Dialog>
  );
};

export default EditUserModal;
