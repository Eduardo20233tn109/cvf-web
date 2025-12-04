import React, { useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  Alert,
  Divider
} from "@mui/material";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

const GenerarQR = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const qrRef = useRef();

  if (!state?._id) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        No hay datos disponibles para generar el código QR.
      </Alert>
    );
  }

  const handleDownload = async () => {
    try {
      const dataUrl = await htmlToImage.toPng(qrRef.current);
      download(dataUrl, "qr-visita.png");
    } catch (error) {
      console.error("❌ Error al descargar el QR:", error);
    }
  };

  return (
    <Box 
      maxWidth="sm" 
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
          textAlign: "center",
          background: '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #f1f5f9',
        }}
      >
        <Box mb={3}>
          <Typography 
            variant="h4" 
            fontWeight={800}
            gutterBottom
            color="#0f172a"
            sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}
          >
            ¡Visita registrada con éxito!
          </Typography>
          <Typography 
            variant="body1" 
            color="#64748b" 
            fontWeight={500}
            sx={{ fontSize: { xs: '0.95rem', md: '1.125rem' } }}
          >
            Este es tu código QR. Entrégalo al guardia para validar la entrada
          </Typography>
        </Box>

        <Divider sx={{ my: 4, borderColor: '#e2e8f0' }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 4
          }}
        >
          <Box
            p={4}
            ref={qrRef}
            display="inline-block"
            bgcolor="#ffffff"
            borderRadius={4}
            boxShadow="0 12px 40px rgba(20, 184, 166, 0.2)"
            border="3px solid"
            borderColor="#14b8a6"
            sx={{
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -3,
                left: -3,
                right: -3,
                bottom: -3,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
                zIndex: -1,
                opacity: 0.1,
              }
            }}
          >
            <QRCode 
              value={JSON.stringify({ _id: state._id })} 
              size={240}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
          </Box>
        </Box>

        <Stack 
          direction={{ xs: "column", sm: "row" }} 
          spacing={2} 
          justifyContent="center" 
          mt={5}
          sx={{
            pt: 3,
            borderTop: '1px solid #e2e8f0'
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/residente/dashboard")}
            fullWidth
            sx={{
              background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
              fontWeight: 700,
              borderRadius: '12px',
              padding: '14px 32px',
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
            Ir al inicio
          </Button>
          <Button
            variant="outlined"
            onClick={handleDownload}
            fullWidth
            sx={{
              borderColor: '#14b8a6',
              color: '#14b8a6',
              fontWeight: 700,
              borderRadius: '12px',
              padding: '14px 32px',
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
            Descargar QR
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default GenerarQR;
