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
    <Box 
      sx={{ 
        py: { xs: 3, md: 4 },
        px: { xs: 2, md: 4 }
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
          Historial de Visitas
        </Typography>
        <Typography 
          variant="body1" 
          color="#64748b" 
          fontWeight={500}
        >
          Consulta y gestiona todas tus visitas
        </Typography>
      </Box>

      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, md: 4 }, 
          borderRadius: 4,
          background: '#ffffff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #f1f5f9',
        }}
      >
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={4} 
          flexWrap="wrap" 
          gap={2}
          sx={{
            p: 2,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
            border: '1px solid #e2e8f0',
          }}
        >
          <Typography 
            variant="h6" 
            fontWeight={700}
            color="#0f172a"
            sx={{ fontSize: { xs: '1rem', md: '1.125rem' } }}
          >
            Filtrar por estado:
          </Typography>
          <FormControl 
            sx={{ 
              minWidth: { xs: '100%', sm: 200 },
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                backgroundColor: '#ffffff',
              }
            }} 
            size="small"
          >
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

        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{
                background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
              }}>
                <TableCell sx={{ 
                  color: 'white', 
                  fontWeight: 700, 
                  fontSize: '13px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  py: 2,
                }}>
                  Visitante
                </TableCell>
                <TableCell sx={{ 
                  color: 'white', 
                  fontWeight: 700, 
                  fontSize: '13px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  py: 2,
                }}>
                  Personas
                </TableCell>
                <TableCell sx={{ 
                  color: 'white', 
                  fontWeight: 700, 
                  fontSize: '13px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  py: 2,
                }}>
                  Fecha
                </TableCell>
                <TableCell sx={{ 
                  color: 'white', 
                  fontWeight: 700, 
                  fontSize: '13px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  py: 2,
                }}>
                  Tipo
                </TableCell>
                <TableCell sx={{ 
                  color: 'white', 
                  fontWeight: 700, 
                  fontSize: '13px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  py: 2,
                }}>
                  Estado
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visitas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                    <Typography 
                      variant="body1" 
                      color="#64748b"
                      fontWeight={500}
                    >
                      No se encontraron visitas para el filtro seleccionado
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                visitas.map((v, index) => (
                  <TableRow 
                    key={v._id}
                    sx={{
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa',
                      '&:hover': {
                        background: 'linear-gradient(90deg, rgba(20, 184, 166, 0.08), rgba(6, 182, 212, 0.05))',
                        transform: 'translateX(4px)',
                        boxShadow: '0 2px 8px rgba(20, 184, 166, 0.1)',
                      }
                    }}
                  >
                    <TableCell sx={{ 
                      fontWeight: 600,
                      color: '#0f172a',
                      py: 2.5,
                    }}>
                      {v.nombreVisitante}
                    </TableCell>
                    <TableCell sx={{ 
                      color: '#64748b',
                      py: 2.5,
                    }}>
                      {v.numeroPersonas}
                    </TableCell>
                    <TableCell sx={{ 
                      color: '#64748b',
                      py: 2.5,
                    }}>
                      {new Date(v.fecha).toLocaleString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </TableCell>
                    <TableCell sx={{ 
                      fontWeight: 600,
                      color: '#0f172a',
                      py: 2.5,
                    }}>
                      {v.tipoVisita}
                    </TableCell>
                    <TableCell sx={{ py: 2.5 }}>
                      <Chip 
                        label={v.estado} 
                        color={getColor(v.estado)}
                        sx={{
                          fontWeight: 700,
                          fontSize: '12px',
                          borderRadius: '20px',
                          padding: '8px 12px',
                          height: 'auto',
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>
      </Paper>
    </Box>
  );
};

export default HistorialVisitas;
