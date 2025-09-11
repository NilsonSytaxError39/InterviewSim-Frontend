import { useState } from "react";
import { recoveryPasswordRequest } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function RecoveryPassword() {
  // Estado para el email ingresado
  const [email, setEmail] = useState("");
  // Estado para el rol seleccionado
  const [role, setRole] = useState("");
  // Estado para el mensaje de respuesta
  const [message, setMessage] = useState("");
  // Hook para navegación programática
  const navigate = useNavigate();

  /**
   * Envía la solicitud de recuperación de contraseña.
   * Llama a la API y gestiona la respuesta y errores.
   * @param {React.FormEvent} e - Evento de envío de formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await recoveryPasswordRequest(email, role);
      if (response.data.error === false) {
        setMessage(response.data.message);
        toast.success("Revisa tu correo electrónico para continuar");
        navigate("/", { replace: true });
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al enviar la solicitud"
      );
    }
  };

  /**
   * Navega hacia atrás en el historial del navegador.
   */
  const Back = () => {
    window.history.back();
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#283e56] via-[#4fc3f7] to-[#283e56] relative">
      {/* Botón de volver en la parte superior izquierda */}
      <button
        onClick={Back}
        className="absolute top-4 left-4 rounded-full p-2 lg:p-3 bg-gradient-to-br from-[#283e56] to-[#4fc3f7] border-2 border-[#ffd700] hover:scale-110 transform duration-200 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="#ffd700"
          className="h-5 w-5 lg:h-6 lg:w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>

      {/* Contenido principal */}
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 border border-[#ffd700] dark:border-yellow-600 rounded-lg shadow-sm text-[#283e56] dark:text-white">
        <h1 className="text-2xl font-bold text-center mb-4">
          Recuperar Contraseña
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de email */}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 bg-white text-[#283e56] focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
            aria-label="Ingresa tu correo electrónico"
          />
          {/* Selección de rol */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 bg-white text-[#283e56] focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
            aria-label="Selecciona tu rol"
          >
            <option value="">Selecciona tu rol</option>
            <option value="student">Estudiante</option>
            <option value="teacher">Profesor</option>
          </select>
          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full py-2 bg-[#283e56] text-[#ffd700] font-bold rounded-lg hover:bg-[#ffd700] hover:text-[#283e56] transition"
          >
            Enviar
          </button>
        </form>
        {/* Mensaje de respuesta */}
        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default RecoveryPassword;
