💬 InterviewSim – Frontend
📌 Descripción

Interfaz web del sistema InterviewSim, encargada de la interacción con el usuario.
Permite registrarse, iniciar sesión, seleccionar el nivel y lenguaje de programación, y realizar entrevistas automáticas generadas con inteligencia artificial.

🚀 Tecnologías principales

React + Vite

Axios (comunicación con backend)

React Router DOM

React Toastify

Monaco Editor

Recharts

Context API

TailwindCSS

⚙️ Instalación rápida
# Clonar o descomprimir el proyecto
cd InterviewSim-Frontend

# Instalar dependencias
npm install

Archivo .env:

Crea un archivo .env en la raíz del frontend con lo siguiente:

VITE_APP_BASE_URL_DEV=http://localhost:8000
VITE_APP_BASE_URL_PROD=https://tu-backend-en-render.com


Asegúrate de que el puerto coincida con el del backend.

▶️ Ejecución
# Modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar el build
npm run preview


La app correrá en:
👉 http://localhost:4000

📂 Estructura básica
src/
├── main.jsx              # Punto de entrada
├── App.jsx               # Rutas principales
├── pages/                # Vistas (Login, Register, Interview, Results)
├── components/           # Componentes reutilizables
├── context/              # Manejo de estado global
├── services/             # Conexión al backend (axios)
├── assets/               # Imágenes y recursos
└── styles/               # Archivos de estilo / Tailwind

🔗 Conexión con el Backend

El frontend usa axios para comunicarse con el backend:

const baseURL = import.meta.env.VITE_APP_BASE_URL_DEV;
axios.post(`${baseURL}/api/interview`, datos);


El backend responde con 5 preguntas tipo opción múltiple, generadas por OpenAI.
El usuario puede responderlas y visualizar los resultados.

🧱 Rutas principales
Ruta	Descripción
/	Página principal o login
/register	Registro de usuario
/interview	Simulación de entrevista con IA
/results	Resultados y análisis de respuestas
💡 Recomendaciones

No subir node_modules ni .env al repositorio.

Verificar que las URLs en .env apunten correctamente al backend.

Mantener la estructura de componentes modular.

Usar React.StrictMode solo en desarrollo.

Asegurar el control de errores de red (try/catch en peticiones axios).

👨‍💻 Autor

Nilson Andrés Cuero Ocoro,
Sebastian Perez Bastidas
Proyecto académico: InterviewSim
Facultad de Ingeniería de Sistemas
Universidad — 2025
