// ✅ Configuración de Axios con interceptores para JWT
import axios from "axios";

// Instancia para peticiones JSON
export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    "Content-Type": "application/json"
  }
});

// Instancia para peticiones con FormData (imágenes)
export const axiosFormData = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-Type": "multipart/form-data"
  }
});

// 🔐 Interceptor para agregar token JWT automáticamente
const authInterceptor = (config) => {
  const token = localStorage.getItem("token");
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
