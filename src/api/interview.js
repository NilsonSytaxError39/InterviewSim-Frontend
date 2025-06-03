import {instanceInterview} from './axios.js';

//traer todas las entrevistas
export const getInterviewsRequest = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return instanceInterview.get(`/interviews?${queryParams}`);
};
export const getInterviewByIdRequest = async (id) => instanceInterview.get(`/interview/${id}`);
export const createInterviewRequest = async (data) => instanceInterview.post(`/createInterview`, data);
export const getInterviewByTeacherRequest = async (id) => instanceInterview.get(`/interviewTeacher/${id}`);
export const deleteInterviewRequest = async (id) => instanceInterview.delete(`/deleteInterview/${id}`);
export const calificarInterviewRequest = async (data) => instanceInterview.post(`/calificar`, data);
export const obtenerRecomendacionesRequest = async (data) => instanceInterview.post(`/recomendaciones`, data);
export const mostrarInfoRequest = async () => instanceInterview.get(`/Info`);
export const CalificacionRecomendacionProgramacion = async (data)=> instanceInterview.post("/Programacion", data);
