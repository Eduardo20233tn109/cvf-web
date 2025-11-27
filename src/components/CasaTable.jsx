import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, IconButton, Paper, Box, Typography, Pagination
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CasaTable = ({
  casas, onEdit, onToggle, onView,
  paginaActual, totalPaginas, onPaginaChange, totalRegistros
}) => {
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
                <TableCell sx={stickyStyle}>Dirección</TableCell>
                <TableCell sx={stickyStyle}>Ciudad</TableCell>
                <TableCell sx={stickyStyle}>Código Postal</TableCell>
                <TableCell sx={stickyStyle}>Estado</TableCell>
                <TableCell sx={stickyStyle}>Operaciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {casas.length > 0 ? (
                casas.map((casa) => (
                  <TableRow 
                    key={casa._id} 
                    hover
                    sx={{
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.05), transparent)',
                        transform: 'scale(1.01)',
                      }
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600 }}>{casa.address?.street || "Sin dirección"}</TableCell>
                    <TableCell sx={{ color: '#64748b' }}>{casa.address?.city}</TableCell>
                    <TableCell sx={{ color: '#64748b' }}>{casa.address?.zip}</TableCell>
                    <TableCell>
                      <Box sx={{
                        display: 'inline-block',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontWeight: 600,
                        fontSize: '12px',
                        letterSpacing: '0.3px',
                        background: casa.status === "activo" 
                          ? '#10b981' 
                          : '#ef4444',
                        color: 'white',
                        textTransform: 'uppercase',
                      }}>
                        {casa.status === "activo" ? "Activa" : "Inactiva"}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        onClick={() => onView(casa)} 
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
                        title="Editar" 
                        onClick={() => onEdit(casa)}
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
                        title={casa.status === "activo" ? "Desactivar" : "Activar"}
                        onClick={() => onToggle(casa)}
                        sx={{
                          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                          borderRadius: '12px',
                          padding: '10px',
                          '&:hover': {
                            background: casa.status === "activo"
                              ? 'rgba(239, 68, 68, 0.15)'
                              : 'rgba(16, 185, 129, 0.15)',
                            transform: 'scale(1.15) translateY(-2px)',
                            boxShadow: casa.status === "activo"
                              ? '0 6px 16px rgba(239, 68, 68, 0.3)'
                              : '0 6px 16px rgba(16, 185, 129, 0.3)',
                          }
                        }}
                      >
                        {casa.status === "activo" ? (
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
                  <TableCell colSpan={5} align="center">
                    No hay casas registradas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Pagination
        count={totalPaginas}
        page={paginaActual}
        onChange={(e, value) => onPaginaChange(value)}
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        color="primary"
      />

      <Typography variant="subtitle2" align="right" sx={{ mt: 1, color: '#555' }}>
        Mostrando {casas.length} de {totalRegistros} registros
      </Typography>
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

export default CasaTable;
