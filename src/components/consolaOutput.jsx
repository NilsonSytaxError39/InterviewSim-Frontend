import PropTypes from "prop-types";

/**
 * Decodifica una cadena en base64 a string legible.
 * Intenta usar atob, y si falla, usa Buffer (Node.js). Si ambos fallan, retorna la cadena original.
 * @param {string} str - Cadena codificada en base64
 * @returns {string} Cadena decodificada
 */

// Función para decodificar base64 a string
function decodeBase64(str) {
  if (!str) return "";
  try {
    return atob(str);
  } catch (e) {
    console.error("Error decoding base64:", e);
    try {
      // eslint-disable-next-line no-undef
      return Buffer.from(str, "base64").toString("utf-8");
    } catch {
      return str;
    }
  }
}


/**
 * Componente que muestra el resultado de la compilación y ejecución de código.
 * Recibe un objeto outputDetails con información sobre el estado y salidas del proceso.
 * @param {{ outputDetails: object }} props
 * @returns {JSX.Element}
 */
const ConsolaOutput = ({ outputDetails }) => {
  // Muestra en consola los detalles recibidos (útil para debug)
  console.log(
    "ConsolaOutput component rendered with outputDetails:",
    outputDetails
  );

  /**
   * Determina el mensaje a mostrar según el estado de la compilación/ejecución.
   * @returns {JSX.Element|string}
   */
  const getOutput = () => {
    if (!outputDetails) return "No hay salida para mostrar.";

    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // Error de compilación
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {decodeBase64(outputDetails?.compile_output) ||
            "No compilation output available."}
        </pre>
      );
    } else if (statusId === 3) {
      // Ejecución exitosa
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {decodeBase64(outputDetails?.stdout) || "No output available."}
        </pre>
      );
    } else if (statusId === 5) {
      // Tiempo límite excedido
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          Time Limit Exceeded
        </pre>
      );
    } else if (statusId === 11) {
      // Límite de pila excedido
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          Stack Limit Exceeded
        </pre>
      );
    } else {
      // Otros errores
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {decodeBase64(outputDetails?.stderr) || "An error occurred."}
        </pre>
      );
    }
  };

  // Renderiza el resultado en un contenedor estilizado
  return (
    <div className="w-full h-full rounded-md text-white font-normal text-sm overflow-y-auto bg-custom-bg flex flex-col">
      <p className="p-3 whitespace-pre-wrap">
        <span className="ml-2">Resultado de la compilación:</span> {getOutput()}
      </p>
    </div>
  );
};

// Validación de tipos para las props
ConsolaOutput.propTypes = { outputDetails: PropTypes.object };

export default ConsolaOutput;
