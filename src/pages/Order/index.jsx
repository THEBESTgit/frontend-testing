import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import OrderTable from '../../components/OrderTable';
import OrderCreateDialog from '../../components/OrderCreateDialog';
import { fetchProducts } from '../../utils/product';  // Importa la función para obtener productos
import axios from 'axios';  // Importa axios para obtener las órdenes

const Order = () => {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]); // Estado para los productos
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Consumir datos del backend al cargar el componente
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const loadProducts = async () => {
      const productList = await fetchProducts();
      setProducts(productList);
    };

    fetchOrders();
    loadProducts();
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setSelectedOrder(null);
    setOpen(false);
  };

  const handleFormSubmit = (newOrderData) => {
    const selectedProduct = products.find((product) => product.id === parseInt(newOrderData.productId));
  
    const newOrder = {
      id: orders.length + 1,
      units: newOrderData.units,
      bonus: newOrderData.bonus,
      promo: newOrderData.promo,
      totalPrice: newOrderData.totalPrice,
      products: selectedProduct ? [{ ...selectedProduct }] : [],  // Colocar el producto dentro de un array
    };
  
    setOrders([...orders, newOrder]);
  };
  

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    handleOpen();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
      }}
    >
      <OrderTable data={orders} handleSelectOrder={handleSelectOrder} />
      <Button variant='contained' color='primary' onClick={handleOpen}>
        Create New Order
      </Button>
      {open && (
        <OrderCreateDialog
          open={open}
          handleClose={handleClose}
          handleSubmit={handleFormSubmit}
          selectedOrder={selectedOrder}
          products={products} // Pasar los productos al formulario de creación de orden
        />
      )}
    </Box>
  );
};

export default Order;
