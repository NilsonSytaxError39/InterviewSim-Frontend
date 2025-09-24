import { useState } from "react";
import WindowEditor from "./windowEditor";
import ConsolaOutput from "./consolaOutput";
import Select from "react-select";
import { languageOptions } from "../api/languajeOptions";
import axios from "axios";
import PropTypes from "prop-types";
import { CalificacionRecomendacionProgramacion } from "../api/interview";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";

/**
 * Componente para entrevistas de programación.
 * Permite escribir código, compilarlo, ver resultados y recomendaciones.
 * @param {{ IAresult: object, nombreEntrevista: string, dificultad: number, tipoEntrevista: string }} props
 * @returns {JSX.Element}
 */
const BottomCompilar = ({
  IAresult,
  nombreEntrevista,
  dificultad,
  tipoEntrevista,
}) => {
  console.log("IAresult", IAresult);
  console.log("nombreEntrevista", nombreEntrevista);
  console.log("dificultad", dificultad);
  console.log("tipoEntrevista", tipoEntrevista);

  const [code, setCode] = useState("");
  const questions = IAresult.questions || [];
  const [outputDetails, setOutputDetails] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0]);
  const [processing, setProcessing] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const { language } = useTheme();

  // Definir las constantes reutilizables
  const RAPID_API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
  const RAPID_API_HOST = "judge0-ce.p.rapidapi.com";
  const RAPID_API_KEY = "17c467b0d1msh0080552d2fa86bfp10e7f1jsn42775aa94480";


  /**
   * Maneja el cambio en el editor de código.
   * @param {string} action - Tipo de acción ("code")
   * @param {string} data - Código fuente
   */
  const onChange = (action, data) => {
    if (action === "code") {
      setCode(data);
    }
  };


  /**
   * Compila el código fuente usando la API Judge0 y consulta el resultado.
   */
  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: selectedLanguage.id,
      source_code: btoa(code),
    };
    const options = {
      method: "POST",
      url: RAPID_API_URL,
      params: {
        base64_encoded: "true",
        wait: "false",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": RAPID_API_HOST,
        "Content-Type": "application/json",
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };


  /**
   * Consulta el estado de la compilación y ejecución del código.
   * @param {string} token - Token de la ejecución en Judge0
   */
  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: `${RAPID_API_URL}/${token}`,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": RAPID_API_HOST,
      },
    };

    try {
      let response = await axios.request(options);
      console.log("Estado de la respuesta:", response.data);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        fetchRecommendations();
      }
    } catch (err) {
      console.error("Error al consultar el estado:", err);
      setProcessing(false);
    }
  };


  /**
   * Obtiene recomendaciones y calificación de la IA para el código fuente enviado.
   */
  const fetchRecommendations = async () => {
    try {
      const respuestaUser = code;
      console.log("respuestaUser (código fuente):", respuestaUser);

      const pregunta = questions.map((q) => q.question).join(", ");
      const respuestaEsperada = questions.map((q) => q.answer).join(", ");
      console.log("Pregunta:", pregunta);
      console.log("Respuesta Esperada:", respuestaEsperada);

      // Llamada a la función de calificación y recomendación
      const recomendaciones = await CalificacionRecomendacionProgramacion({
        pregunta,
        respuestaUser,
        respuestaEsperada,
      });

      console.log("Recomendaciones recibidas:", recomendaciones);

      if (recomendaciones.error) {
        console.error("Error en la respuesta de la IA:", recomendaciones.error);
        return;
      }

      // Asegúrate de que `calificacion` y `recomendacion` están en el objeto de respuesta
      const { calificacion, recomendacion } = recomendaciones.data;
      console.log("Calificación:", calificacion);
      console.log("Recomendación:", recomendacion);

      // Actualiza el estado acumulando recomendaciones
      setRecommendations([{ calificacion, recomendacion }]); // Guarda como un array de objetos
    } catch (error) {
      console.error("Error al obtener recomendaciones:", error);
    }
  };


  /**
   * Maneja el cambio de lenguaje de programación seleccionado.
   * @param {object} selectedOption - Opción de lenguaje seleccionada
   */
  const onSelectChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
    setCode("");
  };

  return (
    <div className="h-full w-full  bg-[#cbe2fe] dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <div className="flex h-full w-full overflow-hidden space-x-5 bg-[#cbe2fe] dark:bg-gray-900 p-2 rounded-xl">
        <div className="flex flex-col w-1/2 h-full space-y-5">
          <div className="flex flex-col w-full h-2/3 p-5 overflow-y-auto justify-center items-center rounded-xl bg-gradient-to-br from-[#283e56] to-[#4fc3f7] border-2 border-[#ffd700] shadow-lg">
            <div className="flex flex-col bg-white rounded-lg p-6 space-y-6 justify-center items-center dark:bg-gray-800 border border-[#ffd700] dark:border-yellow-600 dark:text-white">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-extrabold ">
                  {t("Questions_generated_us_IA", language)}
                </h2>
                <p className="text-gray-500">
                  {t("responses_by_interview_text", language)}
                </p>
              </div>
              <div
                key={nombreEntrevista}
                className="flex flex-col items-center justify-center w-full space-y-8"
              >
                {questions.length > 0 ? (
                  questions.map((question, index) => (
                    <div
                      key={index}
                      className="w-full border-4 text-center p-6 rounded-lg space-y-4 mx-auto"
                    >
                      <h3 className="text-xl font-bold ">
                        {question.question}
                      </h3>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700">
                    {t("nothin_questions", language)}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#283e56] to-[#4fc3f7] rounded-xl border-2 border-[#ffd700] shadow-lg h-1/3 w-full flex items-center justify-center overflow-y-auto dark:bg-gray-900 dark:border-yellow-600 dark:text-black">
            {recommendations.length > 0 ? (
              <div className="p-4">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 bg-white shadow-md rounded-lg relative"
                  >
                    <div className="absolute top-0 right-0 mt-2 mr-2 bg-blue-600  p-3 rounded-lg flex items-center shadow-lg">
                      <div className="flex items-center">
                        <span className="text-lg font-bold ">
                          {t("calification", language)}:
                        </span>
                        <span className="ml-2 text-lg ">
                          {rec.calificacion}
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-6 h-6 text-yellow-400 ml-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="font-bold text-lg">
                        {t("recomendations", language)}:
                      </p>
                      <p className="mt-1   text-lg">{rec.recomendacion}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full  w-full flex items-center justify-center">
                <div className="flex bg-white opacity-65 p-2 rounded-lg">
                  <h3>{t("nothing_recomended_exiting", language)}</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center w-1/2 h-full p-5 rounded-xl bg-gradient-to-br from-[#283e56] to-[#4fc3f7] border-2 border-[#ffd700] shadow-lg">
          <div className="mb-3 flex justify-between w-full">
            <Select
              options={languageOptions}
              value={selectedLanguage}
              onChange={onSelectChange}
              className="w-1/3 border-2 rounded-md p-1 bg-gradient-to-t from-blue-500 to-blue-400 dark:from-gray-800 dark:to-gray-700 dark:border-yellow-600"
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: document.documentElement.classList.contains('dark') ? '#23272f' : '#3b82f6',
                  borderColor: document.documentElement.classList.contains('dark') ? '#ffd600' : '#fff',
                  color: document.documentElement.classList.contains('dark') ? '#fff' : '#fff',
                  boxShadow: state.isFocused ? '0 0 0 2px #60a5fa' : base.boxShadow,
                }),
                singleValue: (base) => ({
                  ...base,
                  color: document.documentElement.classList.contains('dark') ? '#fff' : '#fff',
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: document.documentElement.classList.contains('dark') ? '#23272f' : '#fff',
                  color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? (document.documentElement.classList.contains('dark') ? '#374151' : '#60a5fa')
                    : state.isFocused
                    ? (document.documentElement.classList.contains('dark') ? '#4b5563' : '#bfdbfe')
                    : (document.documentElement.classList.contains('dark') ? '#23272f' : '#fff'),
                  color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
                  cursor: 'pointer',
                }),
              }}
            />
            <button
              onClick={handleCompile}
              disabled={!code || processing}
              className="border-2 border-white rounded-lg px-4 py-2 bg-gradient-to-t from-blue-500 to-blue-400 text-white cursor-pointer"
            >
              {processing
                ? t("compiled", language)
                : t("compiled_and_Executed", language)}
            </button>
          </div>
          <div className="flex flex-col w-full h-full justify-between gap-2">
            <WindowEditor
              code={code}
              onChange={onChange}
              language={selectedLanguage.value}
              className="flex-1"
            />
            <ConsolaOutput outputDetails={outputDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

BottomCompilar.propTypes = {
  IAresult: PropTypes.object.isRequired,
  nombreEntrevista: PropTypes.string.isRequired,
  dificultad: PropTypes.number.isRequired,
  tipoEntrevista: PropTypes.string.isRequired,
};

export default BottomCompilar;
