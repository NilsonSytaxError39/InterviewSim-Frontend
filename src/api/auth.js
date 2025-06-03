import {instance} from './axios.js';

// Registro
export const registerRequest = (userData) => instance.post(`/register`, userData);

// Login
export const LoginRequest = (userData) => instance.post(`/login`, userData);

// Verificar token
export const verifyTokenRequest = () => instance.get(`/verify`);

//loagout
export const logoutRequest = () => instance.post(`/logout`);

//Eliminar usuario
export const deleteUserRequest = (userData) => instance.delete(`/deleteUser`,userData);


//traer calificaciones
export const getGradesRequest = () => instance.get(`/getGrades`);


//traer calificaciones de profesor
export const getGradesTeacherRequest = () => instance.get(`/getGradesTeacher`);

// Actualizar perfil de usuario
export const updateProfileRequest = (formData) => instance.put(`/updateProfile`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});


// Recuperar contraseña
export const recoveryPasswordRequest = (email, role) => instance.post(`/recoveryPassword`, { email, role });

// Restablecer contraseña
export const resetPasswordRequest = (token, newPassword) => instance.post(`/resetPassword`, { token, newPassword });