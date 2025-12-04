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
      const res = await axiosInstance.get("/api/users", {
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
                    <TableCell sx={{ fontWeight: 600, textAlign: 'center', padding: '12px 8px' }}>{user.nombre}</TableCell>
                    <TableCell sx={{ fontWeight: 600, textAlign: 'center', padding: '12px 8px' }}>{user.apellido}</TableCell>
                    <TableCell sx={{ color: '#64748b', textAlign: 'center', padding: '12px 8px' }}>{user.username}</TableCell>
                    <TableCell sx={{ textAlign: 'center', padding: '12px 8px' }}>
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
                    <TableCell sx={{ textAlign: 'center', padding: '12px 8px' }}>
                      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton 
                          onClick={() => setViewingUser(user)} 
                          title="Ver detalles"
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
                          onClick={() => setEditingUser(user)} 
                          title="Editar"
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
                          onClick={() => onDelete(user)} 
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
                          {user.enabled ? (
                            <BlockIcon sx={{ 
                              color: "#ffffff",
                              fontSize: "24px",
                              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                            }} />
                          ) : (
                            <CheckCircleIcon sx={{ 
                              color: "#ffffff",
                              fontSize: "24px",
                              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                            }} />
                          )}
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ padding: '20px' }}>No hay usuarios registrados.</TableCell>
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
  padding: '12px 8px',
  textAlign: 'center',
};

export default UserTable;
