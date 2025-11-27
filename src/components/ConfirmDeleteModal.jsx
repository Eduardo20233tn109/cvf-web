import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from "@mui/material";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import { motion } from "framer-motion";

const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
  tipo = "registro",
  activo = true,
  message = ""
}) => {
  const esActivar = !activo;
  const tipoCapitalizado = tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();

  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleConfirm = async () => {
    if (onConfirm) await onConfirm();
    setNotificationOpen(true);
  };

  useEffect(() => {
    if (notificationOpen) {
      const timer = setTimeout(() => {
        setNotificationOpen(false);
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notificationOpen, onClose]);

  const animationVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* Modal de Confirmación */}
      <Dialog 
        open={open} 
        onClose={onClose} 
        maxWidth="xs" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }
        }}
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          <Box display="flex" justifyContent="center">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={animationVariants}
            >
              {esActivar ? (
                <CheckCircleOutline sx={{ fontSize: 60, color: "green" }} />
              ) : (
                <HighlightOff sx={{ fontSize: 60, color: "red" }} />
              )}
            </motion.div>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
            {esActivar
              ? `¿Deseas reactivar este ${tipoCapitalizado}?`
              : `¿Deseas desactivar este ${tipoCapitalizado}?`}
          </Typography>
          <Typography align="center">
            {message ||
              (esActivar
                ? `Estás a punto de volver a habilitar este ${tipo}.`
                : `Estás a punto de desactivar temporalmente este ${tipo}.`)}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", mb: 3, gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleConfirm}
            sx={{
              background: esActivar 
                ? 'linear-gradient(135deg, #10b981, #059669)' 
                : 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: "white",
              fontWeight: 700,
              borderRadius: "12px",
              padding: "12px 28px",
              letterSpacing: '0.5px',
              boxShadow: esActivar
                ? '0 8px 20px rgba(16, 185, 129, 0.4)'
                : '0 8px 20px rgba(239, 68, 68, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: esActivar 
                  ? 'linear-gradient(135deg, #059669, #047857)' 
                  : 'linear-gradient(135deg, #dc2626, #b91c1c)',
                transform: 'translateY(-2px)',
                boxShadow: esActivar
                  ? '0 12px 28px rgba(16, 185, 129, 0.5)'
                  : '0 12px 28px rgba(239, 68, 68, 0.5)',
              }
            }}
          >
            {esActivar ? "ACTIVAR" : "DESACTIVAR"}
          </Button>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              borderColor: '#64748b',
              color: '#64748b',
              fontWeight: 700,
              borderRadius: "12px",
              padding: "12px 28px",
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#475569',
                background: 'rgba(100, 116, 139, 0.1)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            CANCELAR
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de éxito */}
      <Dialog open={notificationOpen} maxWidth="xs" fullWidth>
        <DialogContent sx={{ textAlign: "center", padding: "20px" }}>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animationVariants}
          >
            <CheckCircleOutline sx={{ fontSize: 80, color: "green" }} />
          </motion.div>
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            Operación realizada con éxito
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfirmDeleteModal;
