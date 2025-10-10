// Importación de la librería Axios para realizar peticiones HTTP
import axios from "axios";
import Cookies from "js-cookie";

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
    withCredentials: true, // ✅ Importante para enviar cookies
});

/**
 * Instancia de Axios configurada específicamente para el módulo de entrevistas.
 */
const instanceInterview = axios.create({
    baseURL: `${BACKEND_URL}/interview`,
    withCredentials: true, // ✅ Importante para enviar cookies
});

// Interceptor para manejar el token en cookies
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); // ✅ Lee de cookies
    
    if (token) {
      // El token se enviará automáticamente en las cookies gracias a withCredentials: true
      console.log('Token encontrado en cookies:', token);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores 401
instance.interceptors.response.use(
  (response) => {
    // Guarda el token en cookies si se recibe en la respuesta
    if (response.data?.tokenSession) {
      Cookies.set('token', response.data.tokenSession, { expires: 7, sameSite: 'strict' });
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('Token inválido o expirado');
      Cookies.remove('token');
    }
    return Promise.reject(error);
  }
);

// Interceptor para la instancia de entrevistas
instanceInterview.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    
    if (token) {
      console.log('Token entrevistas encontrado en cookies:', token);
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
      Cookies.set('token', response.data.tokenSession, { expires: 7, sameSite: 'strict' });
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('Token inválido o expirado para entrevistas');
      Cookies.remove('token');
    }
    return Promise.reject(error);
  }
);

export { instance, instanceInterview };