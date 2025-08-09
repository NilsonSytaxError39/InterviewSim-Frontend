import { useAuth } from "../../context/authContext";
import { useTheme } from "../../context/themeContext";
import { useState } from "react";
import { t } from "../../i18n";

function Settings() {
  const { user } = useAuth();
  const { theme, language, toggleTheme, changeLanguage } = useTheme();
  const [notifications, setNotifications] = useState(true);

  const Back = () => {
    window.history.back();
  };

  return (
    <div className="h-screen w-full p-5 overflow-auto bg-[#cde5ff] dark:bg-gray-900">
      <div className=" flex flex-col items-center h-full w-full">
        {/* Botón de regreso */}
        <div className="w-full flex justify-start mb-4">
          <button
            onClick={Back}
            className="rounded-full p-3 bg-gradient-to-r from-[#283e56] via-[#4fc3f7] to-[#ffd700] border-2 border-[#ffd700] shadow-md hover:scale-110 transform duration-200 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        </div>

        {/* Título */}
        <div className="w-full max-w-2xl mb-6 border-2 border-[#ffd700]">
          <h2 className="text-4xl font-extrabold text-black dark:text-white text-center bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 rounded-xl py-4 shadow-lg">
            {t("settings", language)}
          </h2>
        </div>

        {/* Configuración de tema */}
        <div className="w-full max-w-2xl mb-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-[#ffd700]">
          <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">
            {t("theme", language)}
          </h3>
          <div className="flex items-center justify-between border-2 border-[#ffd700] rounded-lg p-2">
            <span className="text-black dark:text-gray-300">
              {t("darkMode", language)}
            </span>
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#ffd700] focus:ring-offset-2 border-2 border-[#ffd700]"
              style={{
                backgroundColor: theme === "dark" ? "#4B5563" : "#E5E7EB",
              }}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  theme === "dark" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Configuración de idioma */}
        <div className="w-full max-w-2xl mb-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-[#ffd700]">
          <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">
            {t("language", language)}
          </h3>
          <div className="flex space-x-4 border-2 border-[#ffd700] rounded-lg p-2 justify-center items-center">
            <button
              onClick={() => changeLanguage("es")}
              className={`px-4 py-2 rounded-lg border-2 border-[#ffd700] ${
                language === "es"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {t("spanish", language)}
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className={`px-4 py-2 rounded-lg border-2 border-[#ffd700] ${
                language === "en"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {t("english", language)}
            </button>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="w-full max-w-2xl mb-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-[#ffd700]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full space-x-4">
            <h3 className="text-lg font-extrabold text-black dark:text-white text-center bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 rounded-xl py-4 ">
              {t("notifications", language)}
            </h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </label>
          </div>
        </div>

        {/* Cuenta */}
        <div className=" w-full max-w-2xl mb-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-[#ffd700]">
          <h3 className=" text-xl font-extrabold text-black dark:text-white text-center bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 rounded-xl py-4 ">
            {t("account", language)}
          </h3>
          <div className="flex items-center justify-between p-2 space-x-2">
            <span className="text-lg font-extrabold text-black dark:text-white text-center bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 rounded-xl">
              {t("email", language)}
            </span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex items-center justify-between p-2 space-x-2">
            <span className="text-lg font-extrabold text-black dark:text-white text-center bg-white dark:bg-gray-800 bg-opacity-70 dark:bg-opacity-70 rounded-xl">
              {t("role", language)}
            </span>
            <span className="font-medium capitalize ">{user?.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
