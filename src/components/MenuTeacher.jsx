
import Logo from "../assets/Logo.png";
import { useState } from "react";
import Protypes from "prop-types";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";

/**
 * Componente de menú lateral para el rol de profesor.
 * Permite seleccionar entre crear entrevista, ver entrevistas y ver estadísticas.
 * @param {{ onMenuItemChange: function }} props - Función para manejar el cambio de opción de menú
 * @returns {JSX.Element}
 */


function MenuTeacher({ onMenuItemChange }) {
  const [selectedMenuItem, setSelectedMenuItem] = useState("create");
  const { language } = useTheme();

  /**
   * Maneja el clic en una opción del menú y actualiza el estado.
   * @param {string} menuItem - Opción seleccionada
   */
  const handleMenuItemClick = (menuItem) => {
    onMenuItemChange(menuItem);
    setSelectedMenuItem(menuItem);
  };

  // Renderiza el menú lateral con las opciones disponibles
  return (
    <div className="h-full rounded-lg flex flex-col items-center justify-center bg-[#283e56] p-8 shadow-xl">
      {/* Logo y título */}
      <div className="p-4 flex items-center justify-center cursor-pointer mb-8">
        <img
          src={Logo}
          alt="Logo"
          className="h-20 w-20 bg-white rounded-full p-3 shadow-xl transform hover:scale-110 transition-transform duration-300"
        />
        <h1 className="text-4xl font-extrabold text-gray-900 ml-4 hidden lg:block">
          InterviewSim
        </h1>
      </div>
      {/* Opciones de menú */}
      <div className="flex flex-col items-center justify-center w-full space-y-8">
        {/* Crear entrevista */}
        <button
          onClick={() => handleMenuItemClick("create")}
          className={`px-6 py-4 flex items-center justify-center font-bold text-lg rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 border-2 ${
            selectedMenuItem === "create"
              ? "bg-[#283e56] text-[#ffd700] border-[#ffd700]"
              : "bg-[#111827] text-white border-transparent hover:bg-[#4fc3f7] hover:text-[#283e56]"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7 w-7 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          {t('create_interview', language)}
        </button>
        {/* Ver entrevistas */}
        <button
          onClick={() => handleMenuItemClick("view")}
          className={`px-6 py-4 flex items-center justify-center font-bold text-lg rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 border-2 ${
            selectedMenuItem === "view"
              ? "bg-[#283e56] text-[#ffd700] border-[#ffd700]"
              : "bg-[#111827] text-white border-transparent hover:bg-[#4fc3f7] hover:text-[#283e56]"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7 w-7 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          {t('view_interviews', language)}
        </button>
        {/* Ver estadísticas */}
        <button
          onClick={() => handleMenuItemClick("stats")}
          className={`px-6 py-4 flex items-center justify-center font-bold text-lg rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 border-2 ${
            selectedMenuItem === "stats"
              ? "bg-[#283e56] text-[#ffd700] border-[#ffd700]"
              : "bg-[#111827] text-white border-transparent hover:bg-[#4fc3f7] hover:text-[#283e56]"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-7 w-7 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          {t('view_stats', language)}
        </button>
      </div>
    </div>
  );
}

export default MenuTeacher;


// Validación de tipos para las props
MenuTeacher.propTypes = {
  onMenuItemChange: Protypes.func.isRequired,
};
