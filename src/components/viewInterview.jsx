
/**
 * Componente ViewInterview
 * Muestra la lista de entrevistas creadas por el profesor, permite eliminar entrevistas y muestra detalles relevantes.
 * Utiliza hooks para autenticación, tema, traducción y llamadas a la API.
 *
 * @component
 * @returns {JSX.Element} Panel visual con entrevistas y controles de edición/eliminación.
 */
import {
  getInterviewByTeacherRequest,
  deleteInterviewRequest,
} from "../api/interview";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";

function ViewInterview() {
  const { user } = useAuth(); // Obtiene el usuario autenticado
  const [interviews, setInterviews] = useState([]); // Estado para la lista de entrevistas
  const { i18n } = useTranslation(); // Hook para traducción
  const { language } = useTheme();   // Hook para idioma

  // Efecto para cargar entrevistas del profesor al montar el componente
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const userId = user.id;
        // Solicita las entrevistas del profesor actual
        const response = await getInterviewByTeacherRequest(userId, {
          headers: {
            "Cache-Control": "no-cache", // Deshabilita la caché
            Pragma: "no-cache",
            Expires: "0",
          },
        });
        setInterviews(response.data); // Actualiza el estado con las entrevistas recibidas
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };
    fetchInterviews();
  }, [user.id]);

  /**
   * Elimina una entrevista y actualiza la lista.
   * @param {string} id - ID de la entrevista a eliminar.
   */
  const handleDelete = async (id) => {
    try {
      await deleteInterviewRequest(id);
      const response = await getInterviewByTeacherRequest(user.id, {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setInterviews(response.data);
      toast.success(t("interview_deleted_success", i18n.language));
    } catch (error) {
      console.error("Error deleting interview:", error);
    }
  };

  return (
    <>
      <div className="w-full h-full bg-gradient-to-r from-[#283e56] to-[#4fc3f7] rounded-xl overflow-y-auto p-4 scrollbar-yellow-viewinterview">
        <div className="flex flex-col w-full h-full p-5 space-y-5 overflow-y-auto">
          {/* Mensaje si no hay entrevistas */}
          {interviews.length === 0 && (
            <div className="flex justify-center items-center text-center py-8 text-lg font-semibold h-full text-black dark:text-white">
              {t("interviews_not_found", language)}
            </div>
          )}
          {/* Renderiza cada entrevista */}
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="flex flex-col p-5 space-y-5 mb-5 bg-white dark:bg-gray-800 border border-[#ffd700] dark:border-yellow-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] dark:text-white"
            >
              <h2 className="text-lg font-bold">{interview.title}</h2>
              <p style={{ whiteSpace: 'pre-line' }}>{interview.description}</p>
              {interview.examples && (
                <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                  {interview.examples.input && (
                    <div><strong>Ejemplo de entrada:</strong><br />{interview.examples.input}</div>
                  )}
                  {interview.examples.output && (
                    <div className="mt-1"><strong>Ejemplo de salida:</strong><br />{interview.examples.output}</div>
                  )}
                </div>
              )}
              <div className="space-y-2">
                <p className="text-gray-500">
                  {t("company", language)}: <strong className="uppercase">{interview.empresa}</strong>
                </p>
                <p className="text-gray-500">
                  {t("interview_type", language)}: <strong className="uppercase">{interview.tipoEntrevista}</strong>
                </p>
              </div>
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center justify-center space-x-5">
                  {/* Botón para eliminar entrevista */}
                  <button
                    onClick={() => handleDelete(interview._id)}
                    className="bg-gradient-to-t from-red-600 to-red-500 rounded-lg p-2 flex items-center justify-center text-white"
                  >
                    {t("delete_interview", language)}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-4 ml-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  {/* Botón para editar entrevista oculto */}
                </div>
                {/* Muestra la dificultad de la entrevista */}
                <div className="flex space-x-1 items-center justify-center">
                  <span className="text-gray-500">{t("difficulty", language)}</span>
                  <p className="m-1"> {interview.Dificultad}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#FFFF00"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-6 text-yellow-300"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewInterview;
