import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const OrderCreateDialog = ({ open, handleClose, handleSubmit }) => {
  const [selectedProductName, setSelectedProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [bonus, setBonus] = useState(0);
  const [promo, setPromo] = useState(0);
  const [products, setProducts] = useState([]);

  // Fetch products when the dialog is open
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (open) {
      fetchProducts();
    }
  }, [open]);

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Obtener el producto completo según la selección del producto
    const selectedProductData = products.find(p => p.name === selectedProductName);

    const newOrderData = {
      product: selectedProductData,  // Enviar el producto completo
      units: quantity,
      bonus,
      promo,
      totalPrice: calculateTotalPrice(selectedProductData),
      products: [{ name: selectedProductData.name, price: selectedProductData.price }] // Guardar el producto con nombre y precio
    };

    handleSubmit(newOrderData); // Enviar la nueva orden con el producto completo
    handleClose(); // Cerrar el diálogo
  };

  const calculateTotalPrice = (product) => {
    // Implementa la lógica para calcular el precio total
    return product ? product.price * quantity : 0;
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Crear Pedido</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Producto</InputLabel>
          <Select
            value={selectedProductName}
            onChange={(e) => setSelectedProductName(e.target.value)}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.name}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Cantidad"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Bonus"
          type="number"
          value={bonus}
          onChange={(e) => setBonus(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Promo"
          type="number"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleFormSubmit}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderCreateDialog;








