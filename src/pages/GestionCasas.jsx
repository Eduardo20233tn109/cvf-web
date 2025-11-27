import React, { useState, useEffect } from 'react';
import CrearButton from '../components/CrearButton';
import CasaTable from '../components/CasaTable';
import CasaModal from '../components/CasaModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import VisualizarCasaModal from '../components/VisualizarCasaModal';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { axiosFormData } from "../config/axiosConfig";

const GestionCasas = () => {
  const [casas, setCasas] = useState([]);
  const [selectedCasa, setSelectedCasa] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("todas");
  const [paginaActual, setPaginaActual] = useState(1);
  const casasPorPagina = 20;

  const fetchCasas = async () => {
    try {
      const { data } = await axiosFormData.get("/houses");
      const houses = Array.isArray(data) ? data : data.data;
      setCasas(houses || []);
    } catch (error) {
      console.error("Error al obtener casas:", error);
      setCasas([]);
    }
  };

  useEffect(() => {
    fetchCasas();
  }, []);

  const handleToggleStatus = async (casa) => {
    try {
      await axiosFormData.put(`/houses/status/${casa._id}`);
      fetchCasas();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };

  const handleEdit = (casa) => {
    setSelectedCasa(casa);
    setModalOpen(true);
  };

  const handleView = (casa) => {
    setSelectedCasa(casa);
    setViewModalOpen(true);
  };

  const handleDeleteConfirm = (casa) => {
    setSelectedCasa(casa);
    setConfirmDeleteOpen(true);
  };

  const handleModalClose = () => {
    setSelectedCasa(null);
    setModalOpen(false);
  };

  const handleViewClose = () => {
    setSelectedCasa(null);
    setViewModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCasa) return;
    await handleToggleStatus(selectedCasa);
    setConfirmDeleteOpen(false);
  };

  const casasFiltradas = casas.filter(casa => {
    if (filtroEstado === "todas") return true;
    return casa.status === filtroEstado;
  });

  const totalPaginas = Math.ceil(casasFiltradas.length / casasPorPagina);
  const casasPaginadas = casasFiltradas.slice(
    (paginaActual - 1) * casasPorPagina,
    paginaActual * casasPorPagina
  );

  const cambiarPagina = (nuevaPagina) => setPaginaActual(nuevaPagina);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div style={{ flexGrow: 1, minHeight: '100vh', width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2.5rem 2rem', maxWidth: '1200px', width: '100%' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '36px',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '28px',
            marginTop: '0',
            letterSpacing: '0.3px',
          }}>
            Gestión de Residencias
          </h2>
          <div style={{
            background: 'rgba(255, 255, 255, 0.98)',
            borderRadius: '28px',
            boxShadow: '0 10px 40px rgba(15, 23, 42, 0.1)',
            padding: '2.5rem',
            width: '100%',
            maxWidth: '1100px',
            backdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <CrearButton onClick={() => setModalOpen(true)} />
              <FormControl sx={{ 
                minWidth: 220,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '14px',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#fff',
                  border: '1px solid #cbd5e1',
                  '&:hover': {
                    borderColor: '#14b8a6',
                    transform: 'translateY(-1px)',
                  },
                  '&.Mui-focused': {
                    borderColor: '#14b8a6',
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#14b8a6',
                  fontWeight: 700,
                }
              }}>
                <InputLabel>Filtrar por estado</InputLabel>
                <Select
                  value={filtroEstado}
                  label="Filtrar por estado"
                  onChange={(e) => setFiltroEstado(e.target.value)}
                >
                  <MenuItem value="todas">Todas</MenuItem>
                  <MenuItem value="activo">Activas</MenuItem>
                  <MenuItem value="inactivo">Inactivas</MenuItem>
                </Select>
              </FormControl>
            </div>

            <CasaTable
              casas={casasPaginadas}
              onEdit={handleEdit}
              onToggle={handleDeleteConfirm}
              onView={handleView}
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onPaginaChange={cambiarPagina}
              totalRegistros={casasFiltradas.length}
            />
          </div>
        </div>
      </div>

      <CasaModal open={modalOpen} onClose={handleModalClose} residence={selectedCasa} onSave={fetchCasas} />
      <VisualizarCasaModal open={viewModalOpen} onClose={handleViewClose} casa={selectedCasa} />
      <ConfirmDeleteModal
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Ubicación: ${selectedCasa?.address?.street}, ${selectedCasa?.address?.city}`}
        activo={selectedCasa?.status === "activo"}
      />
    </div>
  );
};

export default GestionCasas;
