import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  MenuItem,
  Select,
  Paper,
  FormControl,
  InputLabel
} from "@mui/material";
import axios from "axios";

const estados = ["Todos", "Pendiente", "Aprobada", "Finalizada", "Cancelada"];

const HistorialVisitas = () => {
  const [visitas, setVisitas] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchVisitas = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/api/visits?estado=${selectedFilter}&_=${Date.now()}`
      );

      const propias = res.data.filter((v) => {
        const id = typeof v.residenteId === "object" ? v.residenteId._id : String(v.residenteId);
        return id === user._id;
      });

      setVisitas(propias);
    } catch (err) {
      console.error("Error al obtener visitas", err);
    }
  };

  useEffect(() => {
    fetchVisitas();
  }, [selectedFilter]);

  const getColor = (estado) => {
    switch (estado) {
      case "Aprobada":
        return "success";
      case "Pendiente":
        return "warning";
      case "Cancelada":
        return "error";
      case "Finalizada":
        return "default";
      default:
        return "default";
    }
  };

  return (
    <Box p={4}>
      <Typography 
        variant="h4" 
        fontWeight={700}
        mb={3}
        color="#0f172a"
      >
        Historial de Visitas
      </Typography>

      <Paper elevation={0} sx={{ 
        p: 3, 
        borderRadius: 3,
        background: '#ffffff',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
      }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
          <Typography variant="h6">Filtrar por estado:</Typography>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel>Estado</InputLabel>
            <Select
              label="Estado"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              {estados.map((estado) => (
                <MenuItem key={estado} value={estado}>
                  {estado}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Table>
          <TableHead>
            <TableRow sx={{
              background: '#0f172a',
            }}>
              <TableCell sx={{ 
                color: 'white', 
                fontWeight: 600, 
                fontSize: '13px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}>
                Visitante
              </TableCell>
              <TableCell sx={{ 
                color: 'white', 
                fontWeight: 600, 
                fontSize: '13px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}>
                Personas
              </TableCell>
              <TableCell sx={{ 
                color: 'white', 
                fontWeight: 600, 
                fontSize: '13px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}>
                Fecha
              </TableCell>
              <TableCell sx={{ 
                color: 'white', 
                fontWeight: 600, 
                fontSize: '13px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}>
                Tipo
              </TableCell>
              <TableCell sx={{ 
                color: 'white', 
                fontWeight: 600, 
                fontSize: '13px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}>
                Estado
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visitas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No se encontraron visitas para el filtro seleccionado.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              visitas.map((v) => (
                <TableRow 
                  key={v._id}
                  sx={{
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.05), transparent)',
                      transform: 'scale(1.01)',
                    }
                  }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>{v.nombreVisitante}</TableCell>
                  <TableCell sx={{ color: '#64748b' }}>{v.numeroPersonas}</TableCell>
                  <TableCell sx={{ color: '#64748b' }}>{new Date(v.fecha).toLocaleString()}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{v.tipoVisita}</TableCell>
                  <TableCell>
                    <Chip 
                      label={v.estado} 
                      color={getColor(v.estado)}
                      sx={{
                        fontWeight: 700,
                        fontSize: '13px',
                        borderRadius: '20px',
                        padding: '6px 4px',
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default HistorialVisitas;
