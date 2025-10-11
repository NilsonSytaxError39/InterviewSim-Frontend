// Importación de la librería Axios para realizar peticiones HTTP
import axios from "axios";

// Determinar la URL base según el entorno
const isDevelopment = process.env.NODE_ENV !== 'production';

// URL base para el backend
let BACKEND_URL;

if (isDevelopment) {
  BACKEND_URL = import.meta.env.VITE_APP_BASE_URL_DEV || 'http://localhost:8000';
} else {
  BACKEND_URL = import.meta.env.VITE_APP_INTERVIEW_BASE_URL_DEV || 
                import.meta.env.NEXT_PUBLIC_API_URL || 
                'https://interviewsim-backend.onrender.com';
}

BACKEND_URL = BACKEND_URL?.trim();

console.log('URL base configurada:', BACKEND_URL);

/**
 * Instancia de Axios configurada para realizar peticiones a la API principal.
 */
const instance = axios.create({
    baseURL: `${BACKEND_URL}/api`,
    // Elimina withCredentials: true - ahora usaremos headers
});

/**
 * Instancia de Axios configurada específicamente para el módulo de entrevistas.
 */
const instanceInterview = axios.create({
    baseURL: `${BACKEND_URL}/interview`,
    // Elimina withCredentials: true - ahora usaremos headers
});

// Interceptor para agregar el token JWT en todas las peticiones de la instancia principal
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores 401 de la instancia principal
instance.interceptors.response.use(
  (response) => {
    // Guarda el token en localStorage si se recibe en la respuesta
    if (response.data?.tokenSession) {
      localStorage.setItem('token', response.data.tokenSession);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('Token inválido o expirado');
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

// Interceptor para la instancia de entrevistas
instanceInterview.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instanceInterview.interceptors.response.use(
  (response) => {
    if (response.data?.tokenSession) {
      localStorage.setItem('token', response.data.tokenSession);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('Token inválido o expirado para entrevistas');
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export { instance, instanceInterview };