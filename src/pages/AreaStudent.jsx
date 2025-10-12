import Navbar from "../components/Navbar";
import PanelInterviews from "../components/Interviews";
import Tips from "../components/tips";
import EstadisticasLaborales from "../components/estadisticasLaborales";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";

export default function AreaStudent() {
  const { language } = useTheme();

  return (
    <>
      <div className="p-5 h-screen flex flex-col overflow-hidden bg-[#cbe2fe] dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        {/* Barra de navegación superior */}
        <Navbar />
        
        {/* Sección de introducción - AJUSTADA MÁS ARRIBA */}
        <div className="mt-2 mb-3 p-2 bg-white bg-opacity-90 rounded-lg shadow-md border border-[#ffd700]">
          <div className="text-center">
            <h1 className="text-lg font-bold text-[#283e56] dark:text-white mb-0.5">
              {t("welcome_to_interviewsim", language)}
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {t("interviewsim_description", language)}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row my-5 space-y-5 lg:space-y-0 lg:space-x-5 flex-grow overflow-hidden">
          {/* Panel de entrevistas */}
          <div
            className="w-full lg:w-1/2 flex flex-col h-full overflow-hidden bg-white bg-opacity-95 rounded-xl shadow-lg border-2 border-[#ffd700]"
            style={{ boxShadow: "0 4px 16px 0 rgba(40,62,86,0.15)" }}
          >
            <PanelInterviews />
          </div>
          {/* Panel de tips y estadísticas laborales */}
          <div className="w-full lg:w-1/2 flex flex-col h-full overflow-hidden bg-white dark:bg-gray-800 border border-[#ffd700] dark:border-yellow-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] dark:text-white">
            <div className="flex flex-col w-full h-1/2 justify-start">
              <Tips />
            </div>
            <div className="flex flex-col w-full h-1/2 justify-end">
              <EstadisticasLaborales />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}