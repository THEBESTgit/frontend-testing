import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ orders, setOrders, selectedOrderId }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      setError('Por favor complete todos los campos');
      return;
    }

    try {
      // Simulamos la creación de un producto (puedes enviar esto a tu API)
      const newProduct = { name, price: parseFloat(price) };

      // Actualizamos la orden seleccionada con el nuevo producto
      setOrders((prevOrders) => {
        return prevOrders.map((order) => {
          if (order.id === selectedOrderId) {
            const updatedProducts = [...order.products, newProduct];
            const updatedTotalPrice = updatedProducts.reduce(
              (total, product) => total + product.price, 
              order.totalPrice
            );

            return {
              ...order,
              products: updatedProducts,
              totalPrice: updatedTotalPrice,
            };
          }
          return order;
        });
      });

      // Limpiar los campos de entrada
      setName('');
      setPrice('');
      setError('');
      alert('Producto agregado exitosamente');
    } catch (err) {
      setError('Hubo un error al agregar el producto');
    }
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
};

export default AddProduct;

