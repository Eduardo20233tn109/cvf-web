import React, { useState } from "react";
import { TableRow, TableCell, IconButton, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditUserModal from "./EditUserModal";
import VisualizarUserModal from "./VisualizarUserModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const UserRow = ({ user, onToggle }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  return (
    <>
      <TableRow hover>
        <TableCell>{user.nombre}</TableCell>
        <TableCell>{user.apellido}</TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell sx={{ color: user.enabled ? "green" : "red", fontWeight: "bold" }}>
          {user.enabled ? "Activo" : "Inactivo"}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
            <IconButton 
              onClick={() => setOpenViewModal(true)} 
              title="Ver usuario"
              sx={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                borderRadius: '12px',
                padding: '12px',
                width: '44px',
                height: '44px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
                  transform: 'scale(1.1) translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(59, 130, 246, 0.5)',
                  outline: '2px solid rgba(59, 130, 246, 0.4)',
                  outlineOffset: '2px',
                },
                '&:focus': {
                  outline: '3px solid rgba(59, 130, 246, 0.6)',
                  outlineOffset: '2px',
                },
                '&:active': {
                  transform: 'scale(0.95) translateY(0)',
                }
              }}
            >
              <VisibilityIcon sx={{ 
                color: "#ffffff",
                fontSize: "24px",
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
              }} />
            </IconButton>
            <IconButton 
              onClick={() => setOpenEditModal(true)} 
              title="Editar usuario"
              sx={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #eab308 100%)',
                borderRadius: '12px',
                padding: '12px',
                width: '44px',
                height: '44px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #d97706 0%, #ca8a04 100%)',
                  transform: 'scale(1.1) translateY(-2px)',
                  boxShadow: '0 8px 20px rgba(245, 158, 11, 0.5)',
                  outline: '2px solid rgba(245, 158, 11, 0.4)',
                  outlineOffset: '2px',
                },
                '&:focus': {
                  outline: '3px solid rgba(245, 158, 11, 0.6)',
                  outlineOffset: '2px',
                },
                '&:active': {
                  transform: 'scale(0.95) translateY(0)',
                }
              }}
            >
              <EditIcon sx={{ 
                color: "#ffffff",
                fontSize: "24px",
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                transform: 'rotate(-5deg)'
              }} />
            </IconButton>
            <IconButton 
              onClick={() => setOpenConfirmModal(true)} 
              title={user.enabled ? "Desactivar" : "Activar"}
              sx={{
                background: user.enabled 
                  ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                  : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '12px',
                padding: '12px',
                width: '44px',
                height: '44px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: user.enabled
                  ? '0 2px 8px rgba(239, 68, 68, 0.3)'
                  : '0 2px 8px rgba(16, 185, 129, 0.3)',
                '&:hover': {
                  background: user.enabled
                    ? 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)'
                    : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                  transform: 'scale(1.1) translateY(-2px)',
                  boxShadow: user.enabled
                    ? '0 8px 20px rgba(239, 68, 68, 0.5)'
                    : '0 8px 20px rgba(16, 185, 129, 0.5)',
                  outline: user.enabled
                    ? '2px solid rgba(239, 68, 68, 0.4)'
                    : '2px solid rgba(16, 185, 129, 0.4)',
                  outlineOffset: '2px',
                },
                '&:focus': {
                  outline: user.enabled
                    ? '3px solid rgba(239, 68, 68, 0.6)'
                    : '3px solid rgba(16, 185, 129, 0.6)',
                  outlineOffset: '2px',
                },
                '&:active': {
                  transform: 'scale(0.95) translateY(0)',
                }
              }}
            >
              <DeleteIcon sx={{ 
                color: "#ffffff",
                fontSize: "24px",
                filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
              }} />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>

      {/* Modales */}
      <EditUserModal
        user={user}
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSave={() => setOpenEditModal(false)} // Se puede mejorar si se pasa un refresh
      />

      <VisualizarUserModal
        usuario={user}
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
      />

      <ConfirmDeleteModal
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={() => {
          onToggle(user);
          setOpenConfirmModal(false);
        }}
        tipo="usuario"
        activo={user.enabled}
      />
    </>
  );
};

export default UserRow;
