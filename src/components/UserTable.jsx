import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Paper, Pagination, Box, Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import EditUserModal from './EditUserModal';
import VisualizarUserModal from './VisualizarUserModal';
import { axiosInstance } from '../config/axiosConfig';

const UserTable = ({ statusFilter, category, onDelete }) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 20;

  useEffect(() => {
    fetchUsers();
  }, [statusFilter, category]);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("http://localhost:4000/api/users", {
        params: {
          estado: statusFilter !== "Todos" ? statusFilter : null
        }
      });
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setUsers(data || []);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setUsers([]);
    }
  };

  const usuariosFiltrados = users.filter((user) => {
    const porRol = category === "Todos" || user.tipoUsuario === category.toUpperCase();
    const porEstado = statusFilter === "Todos" || (statusFilter === "Activo" ? user.enabled : !user.enabled);
    return porRol && porEstado;
  });

  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);
  const usuariosPaginados = usuariosFiltrados.slice(
    (paginaActual - 1) * usuariosPorPagina,
    paginaActual * usuariosPorPagina
  );

  return (
    <Box>
      <Paper elevation={0} sx={{ 
        borderRadius: '16px', 
        overflow: 'hidden', 
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        background: '#ffffff',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }
      }}>
        <TableContainer sx={{ 
          maxHeight: 280, 
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f5f9',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '4px',
          },
        }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={stickyStyle}>Nombre</TableCell>
                <TableCell sx={stickyStyle}>Apellido</TableCell>
                <TableCell sx={stickyStyle}>Usuario</TableCell>
                <TableCell sx={stickyStyle}>Estado</TableCell>
                <TableCell sx={stickyStyle}>Operaciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuariosPaginados.length > 0 ? (
                usuariosPaginados.map((user) => (
                  <TableRow 
                    key={user._id} 
                    hover
                    sx={{
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.05), transparent)',
                        transform: 'scale(1.01)',
                      }
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>{user.nombre}</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{user.apellido}</TableCell>
                    <TableCell sx={{ color: '#64748b' }}>{user.username}</TableCell>
                    <TableCell>
                      <Box sx={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontWeight: 600,
                        fontSize: '12px',
                        letterSpacing: '0.3px',
                        background: user.enabled 
                          ? 'linear-gradient(135deg, #10b981, #059669)' 
                          : 'linear-gradient(135deg, #ef4444, #dc2626)',
                        color: 'white',
                        textTransform: 'uppercase',
                      }}>
                        {user.enabled ? "Activo" : "Inactivo"}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        onClick={() => setViewingUser(user)} 
                        title="Ver detalles"
                        sx={{
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          borderRadius: '12px',
                          padding: '10px',
                          '&:hover': {
                            background: 'rgba(59, 130, 246, 0.15)',
                            transform: 'scale(1.15) translateY(-2px)',
                            boxShadow: '0 6px 16px rgba(59, 130, 246, 0.3)',
                          }
                        }}
                      >
                        <VisibilityIcon sx={{ 
                          color: "#3b82f6",
                          fontSize: "22px",
                          filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))'
                        }} />
                      </IconButton>
                      <IconButton 
                        onClick={() => setEditingUser(user)} 
                        title="Editar"
                        sx={{
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          borderRadius: '12px',
                          padding: '10px',
                          '&:hover': {
                            background: 'rgba(102, 126, 234, 0.15)',
                            transform: 'scale(1.15) translateY(-2px)',
                            boxShadow: '0 6px 16px rgba(102, 126, 234, 0.3)',
                          }
                        }}
                      >
                        <EditIcon sx={{ 
                          color: "#667eea",
                          fontSize: "22px",
                          filter: 'drop-shadow(0 2px 4px rgba(102, 126, 234, 0.3))'
                        }} />
                      </IconButton>
                      <IconButton 
                        onClick={() => onDelete(user)} 
                        title={user.enabled ? "Desactivar" : "Activar"}
                        sx={{
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          borderRadius: '12px',
                          padding: '10px',
                          '&:hover': {
                            background: user.enabled 
                              ? 'rgba(239, 68, 68, 0.15)' 
                              : 'rgba(16, 185, 129, 0.15)',
                            transform: 'scale(1.15) translateY(-2px)',
                            boxShadow: user.enabled
                              ? '0 6px 16px rgba(239, 68, 68, 0.3)'
                              : '0 6px 16px rgba(16, 185, 129, 0.3)',
                          }
                        }}
                      >
                        {user.enabled ? (
                          <BlockIcon sx={{ 
                            color: "#ef4444",
                            fontSize: "22px",
                            filter: 'drop-shadow(0 2px 4px rgba(239, 68, 68, 0.3))'
                          }} />
                        ) : (
                          <CheckCircleIcon sx={{ 
                            color: "#10b981",
                            fontSize: "22px",
                            filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))'
                          }} />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">No hay usuarios registrados.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Pagination
        count={totalPaginas}
        page={paginaActual}
        onChange={(e, val) => setPaginaActual(val)}
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        color="primary"
      />

      <Typography variant="subtitle2" align="right" sx={{ mb: 1, color: '#555' }}>
        Mostrando {usuariosPaginados.length} de {usuariosFiltrados.length} registros
      </Typography>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          open={!!editingUser}
          onClose={() => setEditingUser(null)}
          onSave={fetchUsers}
        />
      )}

      {viewingUser && (
        <VisualizarUserModal
          open={!!viewingUser}
          onClose={() => setViewingUser(null)}
          usuario={viewingUser}
        />
      )}
    </Box>
  );
};

const stickyStyle = {
  position: 'sticky',
  top: 0,
  background: '#0f172a',
  color: 'white',
  fontWeight: 600,
  fontSize: '13px',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  padding: '16px',
};

export default UserTable;
