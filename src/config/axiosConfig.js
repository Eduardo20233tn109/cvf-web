// ✅ Configuración de Axios con interceptores para JWT
import axios from "axios";
import { API_BASE_URL } from "./env.js";

// Instancia para peticiones JSON
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const errorInterceptor = (error) => {
  if (error.response?.status === 401) {
    // Token inválido o expirado - redirigir a login
    console.error("Sesión expirada. Por favor inicia sesión nuevamente.");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Opcional: redirigir a login
    // window.location.href = '/login';
  }
  return Promise.reject(error);
};

// Aplicar interceptores a ambas instancias
axiosInstance.interceptors.request.use(authInterceptor, errorInterceptor);
axiosFormData.interceptors.request.use(authInterceptor, errorInterceptor);
