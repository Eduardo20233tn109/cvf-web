import React, { useState, useEffect } from "react";
import CrearButton from "../components/CrearButton";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal"; // Asegúrate que exportes correctamente
import EditUserModal from "../components/EditUserModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

const GestionUsuarios = () => {
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [roleFilter, setRoleFilter] = useState("Residente");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [casas, setCasas] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/api/houses")
      .then((res) => setCasas(Array.isArray(res.data) ? res.data : res.data.data || []))
      .catch(() => setCasas([]));

    const storedId = localStorage.getItem("pendingHouseId");
    if (storedId) {
      setOpenCreateModal(true);
      localStorage.removeItem("pendingHouseId");
    }
  }, []);

  const handleUserAdded = () => setRefresh(prev => !prev);
  const handleUserUpdated = () => setRefresh(prev => !prev);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await axios.put(`http://localhost:4000/api/users/status/${selectedUser._id}`);
      setRefresh(prev => !prev);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    } finally {
      setOpenDeleteModal(false);
    }
  };

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
            Gestión de Usuarios
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
              <CrearButton onClick={() => setOpenCreateModal(true)} />
              <div style={{ display: "flex", gap: "1rem" }}>
                <FormControl sx={{ 
                  minWidth: 180,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#fff',
                    '&:hover fieldset': {
                      borderColor: '#14b8a6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#14b8a6',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#14b8a6',
                    fontWeight: 600,
                  }
                }}>
                  <InputLabel>Filtrar por estado</InputLabel>
                  <Select
                    value={statusFilter}
                    label="Filtrar por estado"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value="Todos">Todos</MenuItem>
                    <MenuItem value="Activo">Activos</MenuItem>
                    <MenuItem value="Inactivo">Inactivos</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ 
                  minWidth: 180,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#fff',
                    '&:hover fieldset': {
                      borderColor: '#14b8a6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#14b8a6',
                    }
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#14b8a6',
                    fontWeight: 600,
                  }
                }}>
                  <InputLabel>Filtrar por rol</InputLabel>
                  <Select
                    value={roleFilter}
                    label="Filtrar por rol"
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    <MenuItem value="Residente">Residentes</MenuItem>
                    <MenuItem value="Guardia">Guardias</MenuItem>
                    <MenuItem value="Admin">Administradores</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <UserTable
              key={refresh}
              statusFilter={statusFilter}
              category={roleFilter}
              onDelete={handleDeleteUser}
              onEdit={handleEditUser}
            />
          </div>
        </div>
      </div>

      {/* Modales */}
      <UserModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onUserAdded={handleUserAdded}
      />

      <EditUserModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSave={handleUserUpdated}
        user={selectedUser}
        casas={casas}
      />

      <ConfirmDeleteModal
  open={openDeleteModal}
  onClose={() => setOpenDeleteModal(false)}
  onConfirm={handleConfirmDelete}
  tipo="usuario"
  activo={selectedUser?.enabled}
/>

    </div>
  );
};

export default GestionUsuarios;
