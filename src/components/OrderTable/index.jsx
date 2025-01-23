import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const OrderTable = ({ data, handleSelectOrder }) => {
  console.log('Datos de pedidos:', data);

  // Función para eliminar un pedido
  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/orders/${orderId}`);
      alert('Pedido eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
      alert('Error al eliminar el pedido. Intenta nuevamente.');
    }
  };

  return (
    <Box sx={{ width: '80%', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Pedidos
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Producto</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Unidades</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Bonus</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Promo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Precio Total</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    {/* Muestra todos los productos asociados a esta orden */}
                    {item.products && item.products.length > 0
                      ? item.products.map((product, index) => (
                          <div key={index}>
                            {product.name} - ${product.price}
                          </div>
                        ))
                      : 'Producto no disponible'}
                  </TableCell>
                  <TableCell>{item.units}</TableCell>
                  <TableCell>{item.bonus}</TableCell>
                  <TableCell>{item.promo}</TableCell>
                  <TableCell>{item.totalPrice}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleSelectOrder(item)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteOrder(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No hay pedidos disponibles.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderTable;



