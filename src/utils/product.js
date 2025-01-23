// src/utils/product.js
import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/products'); // Asegúrate de que esta ruta sea correcta
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return []; // Devuelve un array vacío en caso de error
  }
};

