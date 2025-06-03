import axios from "axios";
const ruta = import.meta.env.VITE_APP_BASE_URL_DEV; 

const instance = axios.create({
    baseURL: `${ruta}/api`,
    withCredentials: true,
});


const instanceInterview = axios.create({
    baseURL: `${ruta}/interview`,
    withCredentials: true,
});



export { instance, instanceInterview };
