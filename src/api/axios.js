// Importación de la librería Axios para realizar peticiones HTTP
import axios from "axios";

// Determinar la URL base según el entorno
const isDevelopment = process.env.NODE_ENV !== 'production'; // ✅ Correcto

// URL base para el backend
let BACKEND_URL;

if (isDevelopment) {
  // Para desarrollo local
  BACKEND_URL = import.meta.env.VITE_APP_BASE_URL_DEV || 'http://localhost:8000';
} else {
  // Para producción (Netlify)
  BACKEND_URL = import.meta.env.VITE_APP_INTERVIEW_BASE_URL_DEV || 
                import.meta.env.NEXT_PUBLIC_API_URL || 
                'https://interviewsim-backend.onrender.com'; // ✅ Sin espacios
}

// Asegúrate de que no tenga espacios o caracteres extraños
BACKEND_URL = BACKEND_URL?.trim();

console.log('URL base configurada:', BACKEND_URL); // Para debugging

/**
 * Instancia de Axios configurada para realizar peticiones a la API principal.
 * - baseURL: URL base para las rutas de la API general (`/api`)
 * - withCredentials: Incluye cookies y cabeceras necesarias para autenticación cross-origin
 */
const instance = axios.create({
    baseURL: `${BACKEND_URL}/api`,
    withCredentials: true,
});

/**
 * Instancia de Axios configurada específicamente para el módulo de entrevistas.
 * - baseURL: URL base para las rutas relacionadas con entrevistas (`/interview`)
 * - withCredentials: Incluye cookies y cabeceras necesarias para autenticación cross-origin
 */
const instanceInterview = axios.create({
    baseURL: `${BACKEND_URL}/interview`,
    withCredentials: true,
});

// Exportación de ambas instancias para su uso en otras partes del frontend
export { instance, instanceInterview };