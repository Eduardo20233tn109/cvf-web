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
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="primary.main" gutterBottom>
          ¡Visita registrada con éxito!
        </Typography>

        <Typography variant="subtitle1" color="#4D5637" mb={2}>
          Este es tu código QR. Entrégalo al guardia para validar la entrada.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box
          p={3}
          ref={qrRef}
          display="inline-block"
          bgcolor="#ffffff"
          borderRadius={2}
          boxShadow={3}
        >
          <QRCode value={JSON.stringify({ _id: state._id })} />
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/residente/dashboard")}
          >
            Ir al inicio
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={handleDownload}
          >
            Descargar QR
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default GenerarQR;
