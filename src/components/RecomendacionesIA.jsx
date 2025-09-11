
import PropTypes from "prop-types";
import { t } from "../i18n";
import { useTheme } from "../context/themeContext";

/**
 * Componente que muestra recomendaciones generadas por IA para preguntas de entrevista.
 * Utiliza el contexto de tema y traducción para adaptar el idioma y el estilo.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.recomendaciones - Objeto que contiene las recomendaciones generadas por IA.
 * @returns {JSX.Element} Elemento visual con la lista de recomendaciones o mensaje si no hay recomendaciones.
 */
const RecomendacionesIA = ({ recomendaciones }) => {
  // Extrae la lista de recomendaciones de la estructura anidada recibida por props
  const recomendacionesIA =
    recomendaciones?.recomendaciones?.recommendations || [];
  const { language } = useTheme(); // Obtiene el idioma actual del contexto de tema

  // Log para depuración de las recomendaciones recibidas
  console.log("RecomendacionesIA:", recomendacionesIA);

  // Si no hay recomendaciones, muestra un mensaje informativo y un ícono
  if (recomendacionesIA.length === 0) {
    return (
      <div className="flex items-center justify-center h-full p-6 rounded-lg shadow-lg space-x-2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-gray-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
          />
        </svg>
        {/* Mensaje traducido si no hay recomendaciones */}
        <p className="text-lg font-semibold text-gray-800">
          {t("nothing_recomended", language)}
        </p>
      </div>
    );
  }

  // Renderiza la lista de recomendaciones recibidas
  return (
    <div className="h-full w-full overflow-y-auto p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Recomendaciones</h2>
      <ul className="space-y-4">
        {recomendacionesIA.map((recomendacion, index) => (
          <li
            key={index}
            className="p-4 bg-white rounded-lg shadow-md border-4 border-purple-500"
          >
            {/* Pregunta de la entrevista */}
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {recomendacion.question}
            </h3>
            {/* Recomendación generada por IA */}
            <p className="text-gray-600">{recomendacion.recommendation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


/**
 * PropTypes para el componente RecomendacionesIA.
 * Valida la estructura esperada de las recomendaciones recibidas.
 */
RecomendacionesIA.propTypes = {
  recomendaciones: PropTypes.shape({
    recomendaciones: PropTypes.shape({
      recommendations: PropTypes.arrayOf(
        PropTypes.shape({
          question: PropTypes.string.isRequired,
          recommendation: PropTypes.string.isRequired,
        })
      ),
    }),
  }),
};

/**
 * Valores por defecto para las props del componente.
 */
RecomendacionesIA.defaultProps = {
  recomendaciones: { recomendaciones: { recommendations: [] } },
};

export default RecomendacionesIA;
