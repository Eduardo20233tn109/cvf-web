import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

const VisualizarCasaModal = ({ open, onClose, casa }) => {
  if (!casa) return null;

  const direccion = casa?.address
    ? `${casa.address.street}, ${casa.address.city}, ${casa.address.zip}`
    : "No disponible";

  const estado = casa.status === "activo" ? "Activo" : "Inactivo";
  const colorEstado = casa.status === "activo" ? "green" : "red";

  const urlImagen = casa.photo
    ? `http://localhost:4000/uploads/${casa.photo}`
    : null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        }
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "1.5rem",
          fontWeight: 800,
          textAlign: "center",
          background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
          color: 'white',
          py: 2.5,
          borderBottom: 'none',
        }}
      >
        Detalles de la Casa
      </DialogTitle>

      <DialogContent sx={{ p: 4 }}>
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 3, 
            alignItems: { xs: 'center', sm: "flex-start" }
          }}
        >
          {urlImagen && (
            <Box
              sx={{
                flexShrink: 0,
                width: { xs: '100%', sm: '200px' },
                height: { xs: '200px', sm: '160px' },
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                border: '3px solid #e2e8f0',
                '& img': {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }
              }}
            >
              <img
                src={urlImagen}
                alt="Casa"
              />
            </Box>
          )}
          
          <Box sx={{ flexGrow: 1, width: '100%' }}>
            <Box
              sx={{
                mb: 2.5,
                p: 2,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                border: '1px solid #e2e8f0',
              }}
            >
              <Typography 
                variant="caption" 
                sx={{ 
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: '#64748b',
                  display: 'block',
                  mb: 0.5
                }}
              >
                Dirección
              </Typography>
              <Typography 
                variant="body1" 
                fontWeight={600}
                color="#0f172a"
              >
                {direccion}
              </Typography>
            </Box>

            <Box
              sx={{
                mb: 2.5,
                p: 2,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
                border: '1px solid #e2e8f0',
              }}
            >
              <Typography 
                variant="caption" 
                sx={{ 
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: '#64748b',
                  display: 'block',
                  mb: 0.5
                }}
              >
                Descripción
              </Typography>
              <Typography 
                variant="body1" 
                color="#64748b"
                lineHeight={1.6}
              >
                {casa.description || 'No disponible'}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: colorEstado === "Activo" 
                  ? 'linear-gradient(135deg, rgba(20, 184, 166, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
                border: `2px solid ${colorEstado === "Activo" ? '#14b8a6' : '#ef4444'}`,
              }}
            >
              <Typography 
                variant="caption" 
                sx={{ 
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: '#64748b',
                  display: 'block',
                  mb: 0.5
                }}
              >
                Estado
              </Typography>
              <Typography 
                sx={{ 
                  color: colorEstado === "Activo" ? '#14b8a6' : '#ef4444',
                  fontWeight: 700,
                  fontSize: '1rem'
                }}
              >
                {estado}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button 
          variant="contained" 
          onClick={onClose}
          fullWidth
          sx={{
            background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
            borderRadius: '12px',
            padding: '14px 24px',
            fontWeight: 700,
            textTransform: 'none',
            fontSize: '15px',
            boxShadow: '0 4px 14px rgba(20, 184, 166, 0.4)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VisualizarCasaModal;
