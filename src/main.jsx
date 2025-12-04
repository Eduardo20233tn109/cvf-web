import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/animations.css'
import App from './App.jsx'
import axios from 'axios';

// 🔐 Configurar interceptor global de axios para JWT
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    // Asegurar que headers existe
    if (!config.headers) {
      config.headers = {};
    }
    
    // No agregar token a rutas de login
    if (token && !config.url?.includes('/login')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔐 Interceptor de respuestas para manejar errores 401
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirigir a la página de no autorizado
      window.location.href = '/unauthorized';
    }
    return Promise.reject(error);
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
