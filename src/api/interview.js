// Importamos la instancia de Axios configurada para el módulo de entrevistas
import {instanceInterview} from './axios.js';

//traer todas las entrevistas
export const getInterviewsRequest = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return instanceInterview.get(`/interviews?${queryParams}`);
};
//Obtine una entrevista por su id
export const getInterviewByIdRequest = async (id) => instanceInterview.get(`/interview/${id}`);
//Crea una nueva entrevista con los datos proporcionados.
export const createInterviewRequest = async (data) => instanceInterview.post(`/createInterview`, data);
//Obtiene todas las entrevistas asociadas a un docente
export const getInterviewByTeacherRequest = async (id) => instanceInterview.get(`/interviewTeacher/${id}`);
//Elimina una entrevista por su ID.
export const deleteInterviewRequest = async (id) => instanceInterview.delete(`/deleteInterview/${id}`);
//Envía una calificación para una entrevista.
export const calificarInterviewRequest = async (data) => instanceInterview.post(`/calificar`, data);
//Solicita recomendaciones basadas en la entrevista.
export const obtenerRecomendacionesRequest = async (data) => instanceInterview.post(`/recomendaciones`, data);
//Obtiene información adicional relacionada con entrevistas.
export const mostrarInfoRequest = async () => instanceInterview.get(`/Info`);
//Envía los datos de calificación y recomendaciones específicas para entrevistas de programación.
export const CalificacionRecomendacionProgramacion = async (data)=> instanceInterview.post("/Programacion", data);
