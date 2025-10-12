import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  calificarInterviewRequest,
  obtenerRecomendacionesRequest,
} from "../api/interview";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import RecomendacionesIA from "./RecomendacionesIA";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";

/**
 * Componente para realizar entrevistas de opción múltiple.
 * Permite responder preguntas, ver resultados, recomendaciones y un GIF motivacional.
 * @param {{ IAresult: object, nombreEntrevista: string, dificultad: string, tipoEntrevista: string }} props
 * @returns {JSX.Element}
 */
function ProblemaOpcionMultiple({
  IAresult,
  nombreEntrevista,
  dificultad,
  tipoEntrevista,
}) {
  const questions = IAresult.questions || [];
  const [respuestaUser, setRespuestaUser] = useState([]);
  const [resultado, setResultado] = useState(null);
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [key, setKey] = useState(0);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false); // Estado carga
  const { language } = useTheme();

  // Mapeo para traducir tipo de entrevista
  const tipoEntrevistaMap = {
    opcionMultiple: t("option_multiple", language),
    programacion: t("programming", language),
  };

  /**
   * Verifica si todas las preguntas han sido respondidas
   */
  const todasPreguntasRespondidas = () => {
    return questions.length > 0 && respuestaUser.length === questions.length &&
      respuestaUser.every(respuesta => respuesta !== undefined && respuesta !== null && respuesta !== "");
  };

  /**
   * Maneja el cambio de opción seleccionada por el usuario en cada pregunta.
   * @param {number} questionIndex - Índice de la pregunta
   * @param {string} option - Opción seleccionada
   */
  const handleRadioChange = (questionIndex, option) => {
    setRespuestaUser((prevState) => {
      const newState = [...prevState];
      newState[questionIndex] = option;
      return newState;
    });
  };

  /**
   * Envía las respuestas del usuario y obtiene recomendaciones de la IA.
   */
  const handleSubmit = async () => {
    // Verificar que todas las preguntas estén respondidas
    if (!todasPreguntasRespondidas()) {
      toast.error(t("all_questions_required", language));
      return;
    }

    setLoading(true);
    try {
      const response = await calificarInterviewRequest({
        respuestaIA: questions.map((q) => q.answer),
        respuestaUser,
        userID: user.id,
        nombreEntrevista,
        dificultad,
        tipoEntrevista,
        email: user.email,
      });
      const recomendacionesResponse = await obtenerRecomendacionesRequest({
        preguntas: questions.map((q) => q.question),
        respuestaUser,
        respuestaIA: questions.map((q) => q.answer),
      });
      console.log("Respuesta del servidor:", response.data);
      console.log(
        "Recomendaciones del servidor:",
        recomendacionesResponse.data
      );

      // Actualiza el estado con las recomendaciones
      setResultado(response.data);
      setRecomendaciones(recomendacionesResponse.data);
      toast.success(t("answers_sent_success", language));
      setRespuestaUser([]);
      setKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error al enviar las respuestas:", error);
      toast.error(t("answers_sent_error", language));
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  /**
   * Recarga la página para hacer otra entrevista.
   */
  const handleHacerOtraEntrevista = () => {
    window.location.reload();
  };

  /**
   * Permite repetir la misma entrevista sin recargar la página.
   */
  const handleRepetirEntrevista = () => {
    setResultado(null);
    setRespuestaUser([]);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="h-full w-full bg-[#cbe2fe] dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <div className="flex h-full w-full space-x-5">
        <div className="flex w-1/2 bg-gradient-to-br from-[#283e56] to-[#4fc3f7] rounded-xl border-2 border-[#ffd700] shadow-lg">
          <div className="flex flex-col w-full h-full p-5 overflow-y-auto">
            <div className="flex flex-col bg-white bg-opacity-90 rounded-xl p-6 space-y-6 justify-center items-center border-2 border-[#ffd700] shadow-lg">
              <div
                key={key}
                className="flex flex-col items-center justify-center w-full space-y-4"
              >
                {questions.length > 0 ? (
                  questions.map((question, index) => (
                    <div
                      key={index}
                      className={`w-full border-4 bg-transparent py-2 rounded-lg mx-auto ${respuestaUser[index]  ? "border-yellow-500" : "border-blue-600" 
                        }`}
                    >
                      {/* Contenedor para centrar todo */}
                      <div className="flex flex-col items-center justify-center">
                        {/* Pregunta */}
                        <h3 className="text-xl font-bold text-gray-800 text-center max-w-full break-words">
                          {index + 1}. {question.question}
                        </h3>

                        {/* Opciones */}
                        {question.options && (
                          <div
                            role="radiogroup"
                            className="flex flex-col space-y-4 justify-center items-center p-2 w-full"
                          >
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className="flex items-center space-x-3 w-full justify-center"
                              >
                                <input
                                  type="radio"
                                  id={`question-${index}-option-${optIndex}`}
                                  name={`question-${index}`}
                                  value={option}
                                  className="hidden peer"
                                  onChange={() =>
                                    handleRadioChange(index, option)
                                  }
                                />
                                <label
                                  htmlFor={`question-${index}-option-${optIndex}`}
                                  className={`flex items-center cursor-pointer border-2 rounded-full px-4 py-2 font-medium transition-colors duration-200 ease-in-out w-fit min-w-[100px] ${respuestaUser[index] === option
                                      ? "bg-indigo-500 text-white border-white"
                                      : "bg-white border-gray-300 text-gray-800 hover:bg-indigo-50"
                                    }`}
                                >
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700">
                    {t("no_questions_available", language)}
                  </p>
                )}
              </div>
              <div className="text-gray-700">
                <span className="font-bold">{t("company", language)}:</span>{" "}
                {IAresult?.empresa || "Empresa desconocida"}
              </div>
              <div className="text-gray-700">
                <span className="font-bold">
                  {t("interview_type", language)}:
                </span>{" "}
                {tipoEntrevistaMap[tipoEntrevista] || tipoEntrevista}
              </div>
              <div className="text-gray-700">
                <span className="font-bold">{t("difficulty", language)}:</span>{" "}
                {dificultad}
              </div>
              {!resultado && (
                <button
                  onClick={handleSubmit}
                  disabled={loading || !todasPreguntasRespondidas()}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${loading
                    ? "bg-purple-600 cursor-not-allowed" // ✅ Morado oscuro para modo oscuro
                    : todasPreguntasRespondidas()
                      ? "bg-purple-400 hover:bg-purple-500"
                      : "bg-purple-200 cursor-not-allowed"
                    }`}
                >
                  {loading ? (
                    <span className="text-purple-100 font-medium"> {/* ✅ Texto morado pálido */}
                      {t("sending", language)}
                    </span>
                  ) : (
                    <span className="text-white">
                      {t("send_answers", language)}
                    </span>
                  )}
                </button>
              )}

              {resultado && (
                <div className="flex flex-col items-center justify-center w-full space-y-4">
                  <div className="flex space-x-4">
                    <button
                      onClick={handleHacerOtraEntrevista}
                      className="flex items-center justify-center p-2 bg-blue-500 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-white hover:animate-spin"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                        />
                      </svg>
                      <span className="ml-2">
                        {t("do_another_interview", language)}
                      </span>
                    </button>
                    <button
                      onClick={handleRepetirEntrevista}
                      className="flex items-center justify-center p-2 bg-blue-500 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8 text-white hover:animate-wiggle"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                        />
                      </svg>
                      <span className="ml-2">
                        {t("repeat_interview", language)}
                      </span>
                    </button>
                  </div>
                  <p className="text-xl font-bold text-white bg-blue-500 p-3 rounded-lg shadow-lg">
                    {t("responses", language)}: {resultado.score} /{" "}
                    {resultado.total}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Panel de recomendaciones que ahora ocupa todo el espacio */}
        <div className="flex w-1/2 space-y-5 h-full">
          <div className="bg-gradient-to-br from-[#283e56] to-[#4fc3f7] rounded-xl border-2 border-[#ffd700] shadow-lg h-full w-full overflow-y-auto">
            <RecomendacionesIA recomendaciones={recomendaciones} />
          </div>
        </div>
      </div>
    </div>
  );
}

ProblemaOpcionMultiple.propTypes = {
  IAresult: PropTypes.shape({
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string),
        answer: PropTypes.string,
      })
    ),
  }).isRequired,
  nombreEntrevista: PropTypes.string.isRequired,
  dificultad: PropTypes.string.isRequired,
  tipoEntrevista: PropTypes.string.isRequired,
};

export default ProblemaOpcionMultiple;