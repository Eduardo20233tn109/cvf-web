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
      <Typography variant="h4" fontWeight="bold" color="#4D5637" mb={2}>
        Historial de Visitas
      </Typography>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
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
            <TableRow>
              <TableCell><strong>Visitante</strong></TableCell>
              <TableCell><strong>Personas</strong></TableCell>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell><strong>Tipo</strong></TableCell>
              <TableCell><strong>Estado</strong></TableCell>
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
                <TableRow key={v._id}>
                  <TableCell>{v.nombreVisitante}</TableCell>
                  <TableCell>{v.numeroPersonas}</TableCell>
                  <TableCell>{new Date(v.fecha).toLocaleString()}</TableCell>
                  <TableCell>{v.tipoVisita}</TableCell>
                  <TableCell>
                    <Chip label={v.estado} color={getColor(v.estado)} />
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
