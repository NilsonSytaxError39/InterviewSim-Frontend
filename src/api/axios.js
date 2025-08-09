// Importación de la librería Axios para realizar peticiones HTTP
import axios from "axios";
// Obtención de la ruta base desde las variables de entorno definidas en Vite.
const ruta = import.meta.env.VITE_APP_BASE_URL_DEV; 
/**
 * Instancia de Axios configurada para realizar peticiones a la API principal.
 * - baseURL: URL base para las rutas de la API general (`/api`)
 * - withCredentials: Incluye cookies y cabeceras necesarias para autenticación cross-origin
 */
const instance = axios.create({
    baseURL: `${ruta}/api`,
    withCredentials: true,
});

/**
 * Instancia de Axios configurada específicamente para el módulo de entrevistas.
 * - baseURL: URL base para las rutas relacionadas con entrevistas (`/interview`)
 * - withCredentials: Incluye cookies y cabeceras necesarias para autenticación cross-origin
 */
const instanceInterview = axios.create({
    baseURL: `${ruta}/interview`,
    withCredentials: true,
});

// Exportación de ambas instancias para su uso en otras partes del frontend
export { instance, instanceInterview };
