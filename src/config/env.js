// Configuración centralizada de URLs de API
// Detecta automáticamente si estamos en desarrollo o producción

const getApiUrl = () => {
  // En producción, usar la variable de entorno de Vercel
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // En desarrollo, usar localhost
  return 'http://localhost:4000';
};

export const API_BASE_URL = getApiUrl();

// Endpoints comunes
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/users/login-mobile`,
  
  // Users
  USERS: `${API_BASE_URL}/api/users`,
  USER_STATUS: (id) => `${API_BASE_URL}/api/users/status/${id}`,
  CHECK_USERNAME: (username) => `${API_BASE_URL}/api/users/check-username?username=${username}`,
  CHECK_PHONE: (phone) => `${API_BASE_URL}/api/users/check-phone?phone=${phone}`,
  UPDATE_PROFILE: `${API_BASE_URL}/api/users/update-profile`,
  UPDATE_USER: (id) => `${API_BASE_URL}/api/users/update/${id}`,
  SAVE_USER: `${API_BASE_URL}/api/users/save`,
  GET_USER: (id) => `${API_BASE_URL}/api/users/${id}`,
  
  // Houses
  HOUSES: `${API_BASE_URL}/api/houses`,
  DELETE_HOUSE: (id) => `${API_BASE_URL}/api/houses/${id}`,
  CHECK_STREET: (street) => `${API_BASE_URL}/api/houses/check-street/${encodeURIComponent(street)}`,
  
  // Visits
  VISITS: `${API_BASE_URL}/api/visits`,
  SAVE_VISIT: `${API_BASE_URL}/api/visits/save`,
  
  // Uploads
  UPLOADS: (filename) => `${API_BASE_URL}/uploads/${filename}`,
};

// Configuración de desarrollo
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;

console.log('🌐 API Configuration:', {
  baseUrl: API_BASE_URL,
  environment: isDevelopment ? 'development' : 'production'
});
