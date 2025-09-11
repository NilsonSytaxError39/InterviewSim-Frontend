import { useState } from "react";
import { useParams } from "react-router-dom";
import { resetPasswordRequest } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


/**
 * Componente ResertPassword
 * Permite al usuario restablecer su contraseña usando el token recibido por email.
 * Muestra mensajes de éxito o error y redirige al login tras el cambio exitoso.
 *
 * @component
 * @returns {JSX.Element} Página de restablecimiento de contraseña.
 */
function ResertPassword() {
  // Obtiene el token de la URL
  const { token } = useParams();
  // Estado para la nueva contraseña
  const [newPassword, setNewPassword] = useState("");
  // Estado para el mensaje de respuesta
  const [message, setMessage] = useState("");
  // Hook para navegación programática
  const navigate = useNavigate();

  /**
   * Envía la solicitud de restablecimiento de contraseña.
   * Llama a la API y gestiona la respuesta y errores.
   * @param {React.FormEvent} e - Evento de envío de formulario.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPasswordRequest(token, newPassword);
      if (response.data.error === false) {
        setMessage(response.data.message);
        toast.success("Contraseña actualizada con éxito");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al actualizar la contraseña"
      );
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#283e56] via-[#4fc3f7] to-[#283e56] relative">
      {/* Contenido principal */}
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 border border-[#ffd700] dark:border-yellow-600 rounded-lg shadow-sm text-[#283e56] dark:text-white">
        <h1 className="text-2xl font-bold text-center mb-4">
          Restablecer Contraseña
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de nueva contraseña */}
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 bg-white text-[#283e56] focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:border-transparent"
            aria-label="Ingresa tu nueva contraseña"
          />
          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full py-2 bg-[#283e56] text-[#ffd700] font-bold rounded-lg hover:bg-[#ffd700] hover:text-[#283e56] transition"
          >
            Actualizar Contraseña
          </button>
        </form>
        {/* Mensaje de respuesta */}
        {message && <p className="text-center mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default ResertPassword;
