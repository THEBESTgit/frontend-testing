import axios from 'axios'; // Importar axios

// Función para obtener las órdenes desde el backend
export const fetchOrders = async () => {
  try {
    const response = await axios.get('http://localhost:8080/orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

// Función para obtener los productos desde el backend (puedes mantenerla en otro archivo si lo prefieres)
export const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/products'); // Cambia la URL si es necesario
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

