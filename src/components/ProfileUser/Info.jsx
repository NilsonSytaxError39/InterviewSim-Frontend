import Protys from "prop-types";
import { t } from "../../i18n";
import { useTheme } from "../../context/themeContext";
/**
 * 📌 Componente Info
 * Este componente muestra la información básica de un usuario
 * en una tarjeta con diseño atractivo usando TailwindCSS.
 * 
 * Props:
 * - name: Nombre del usuario
 * - email: Correo electrónico
 * - indetifiquer: Identificador único
 * - role: Rol del usuario en el sistema
 */
function Info({ name, email, indetifiquer, role }) {
  // Obtenemos el idioma actual desde el contexto de la aplicación
  const { language } = useTheme();

  return (
    // Contenedor principal con fondo degradado azul y borde amarillo
    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-r from-[#283e56] to-[#4fc3f7] border-2 border-yellow-400 overflow-hidden rounded-lg">
      <div className="flex flex-col w-full max-w-xl p-6 ">
        <div className="flex flex-col space-y-4">
          <div className="flex bg-white p-2 rounded-lg w-full justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                />
              </svg>

              <div className="text-lg font-semibold text-gray-900">
                {t("identificador", language)}
              </div>
            </div>
            <div className="text-md text-gray-700">{indetifiquer}</div>
          </div>
          <div className="flex bg-white p-2 rounded-lg w-full justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>

              <div className="text-lg font-semibold text-gray-900">Rol:</div>
            </div>
            <div className="text-md text-gray-700">{t(role, language)}</div>
          </div>
          <div className="flex bg-white p-2 rounded-lg w-full justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <div className="text-lg font-semibold text-gray-900">
                {t("name", language)}
              </div>
            </div>
            <div className="text-md text-gray-700">{name}</div>
          </div>
          <div className="flex bg-white p-2 rounded-lg w-full justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                />
              </svg>
              <div className="text-lg font-semibold text-gray-900">Email:</div>
            </div>
            <div className="text-md text-gray-700">{email}</div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-6 ">
        <p className="text-lg text-black">{t("profile_info_text", language)}</p>
      </div>
    </div>
  );
}
// Exportamos el componente para su uso en otras partes de la app
export default Info;
// Definición de los tipos de props con PropTypes
Info.propTypes = {
  name: Protys.string,     // Nombre del usuario
  email: Protys.string,    // Correo electrónico
  indetifiquer: Protys.string,   // Identificador único  
  date: Protys.string,     // Fecha (no usada actualmente)
  role: Protys.string,     // Rol del usuario
};
