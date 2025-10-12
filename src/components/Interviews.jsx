import { useState, useEffect } from "react";
import { getInterviewsRequest } from "../api/interview";
import { Link } from "react-router-dom";
import Spinner from "./spinner";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";
import FiltersInterview from "./FiltersInterview";

/**
 * Componente que muestra el panel de entrevistas disponibles.
 * Permite filtrar entrevistas y navegar a la entrevista seleccionada.
 * @returns {JSX.Element}
 */

function PanelInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useTheme();

  /**
   * Obtiene las entrevistas desde la API, aplicando filtros si se proporcionan.
   * Actualiza el estado local con los datos recibidos.
   * @param {object} filters - Filtros para la consulta de entrevistas
   */
  const fetchInterviews = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await getInterviewsRequest(filters);
      setInterviews(response.data);
    } catch (error) {
      console.error(
        "Error al traer las entrevistas:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial de entrevistas sin filtros
  useEffect(() => {
    fetchInterviews();
  }, []);

  // Componente para mostrar estrellas de dificultad
  const DifficultyStars = ({ difficulty }) => {
    const difficultyNum = parseInt(difficulty) || 0;
    const maxStars = 5;

    return (
      <div className="flex items-center">
        <span className="text-gray-700 mr-2">
          {t("difficulty", language)}
        </span>
        <div className="flex">
          {Array.from({ length: maxStars }, (_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill={index < difficultyNum ? "#FFFF00" : "#D1D5DB"} // Amarillo si activa, gris si inactiva
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-4 h-4 ${index < difficultyNum ? "text-yellow-400" : "text-gray-300"}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          ))}
        </div>
        <span className="ml-1 text-sm text-gray-600">{difficultyNum}/5</span>
      </div>
    );
  };

  // Muestra spinner mientras se cargan los datos
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full min-h-screen relative">
        <Spinner />
      </div>
    );
  }

  // Renderiza el panel de entrevistas y los filtros
  return (
    <div className="flex h-full w-full bg-gradient-to-r from-[#283e56] to-[#4fc3f7] rounded-lg overflow-hidden">
      <div className="flex flex-col w-full h-full p-5 space-y-5 overflow-y-auto panel-interviews-scroll">
        {/* Filtros para entrevistas */}
        <FiltersInterview fetchInterviews={fetchInterviews} />

        {/* Listado de entrevistas */}
        {interviews.length > 0 ? (
          interviews.map((interview) => (
            <div
              key={interview._id}
              className="flex flex-col bg-white dark:bg-gray-800 border border-[#ffd700] dark:border-yellow-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] dark:text-white p-4 rounded-lg space-y-3 transition-all duration-200 hover:shadow-md"
            >
              <h2 className="text-lg font-bold truncate">
                {interview.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2" style={{ whiteSpace: 'pre-line' }}>
                {interview.description}
              </p>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">{t("company", language)}:</span> {interview.empresa}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">{t("interview_type", language)}:</span> {interview.tipoEntrevista}
                </p>
              </div>
              <div className="flex w-full justify-between items-center">
                {/* Enlace para realizar la entrevista */}
                <Link
                  to={`/interview/${interview._id}`}
                  rel="noreferrer"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm py-1 px-3 rounded-md transition-colors duration-200 shadow-sm"
                >
                  {t("perform_interview", language)}
                </Link>
                {/* Dificultad con estrellas */}
                <DifficultyStars difficulty={interview.Dificultad} />
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-16 text-gray-400 mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400">
              {t("no_interviews_found", language)}
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              {t("no_interviews_available", language)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PanelInterviews;