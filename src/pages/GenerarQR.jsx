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
    <Box maxWidth="sm" mx="auto" p={4}>
      <Paper elevation={0} sx={{ 
        p: 4, 
        borderRadius: 3, 
        textAlign: "center",
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
          ¡Visita registrada con éxito!
        </Typography>

        <Typography variant="h6" color="#64748b" mb={3} fontWeight={500}>
          Este es tu código QR. Entrégalo al guardia para validar la entrada.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box
          p={4}
          ref={qrRef}
          display="inline-block"
          bgcolor="#ffffff"
          borderRadius={3}
          boxShadow="0 10px 30px rgba(0,0,0,0.15)"
          border="2px solid #14b8a6"
        >
          <QRCode value={JSON.stringify({ _id: state._id })} size={220} />
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" mt={5}>
          <Button
            variant="contained"
            onClick={() => navigate("/residente/dashboard")}
            sx={{
              background: 'linear-gradient(135deg, #14b8a6, #06b6d4)',
              fontWeight: 700,
              borderRadius: '10px',
              padding: '12px 32px',
              boxShadow: '0 4px 14px rgba(20, 184, 166, 0.4)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(135deg, #0d9488, #0891b2)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(20, 184, 166, 0.5)',
              }
            }}
          >
            Ir al inicio
          </Button>
          <Button
            variant="outlined"
            onClick={handleDownload}
            sx={{
              borderColor: '#14b8a6',
              color: '#14b8a6',
              fontWeight: 700,
              borderRadius: '10px',
              padding: '12px 32px',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: '#0d9488',
                background: 'rgba(20, 184, 166, 0.1)',
                transform: 'translateY(-2px)',
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
