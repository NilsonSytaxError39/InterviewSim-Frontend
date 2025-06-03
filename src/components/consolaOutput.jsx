import PropTypes from "prop-types";

const ConsolaOutput = ({ outputDetails }) => {
  const getOutput = () => {
    if (!outputDetails) return "No hay salida para mostrar.";

    let statusId = outputDetails?.status?.id;

    if (statusId === 6) {
      // Compilation error
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {outputDetails?.compile_output || "No compilation output available."}
        </pre>
      );
    } else if (statusId === 3) {
      // Successful execution
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          {outputDetails?.stdout || "No output available."}
        </pre>
      );
    } else if (statusId === 5) {
      // Time Limit Exceeded
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          Time Limit Exceeded
        </pre>
      );
    } else if (statusId === 11) {
      // Stack Limit Exceeded
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          Stack Limit Exceeded
        </pre>
      );
    } else {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-red-500">
          {outputDetails?.stderr || "An error occurred."}
        </pre>
      );
    }
  };

  return (
    <div className="w-full h-full rounded-md text-white font-normal text-sm overflow-y-auto bg-custom-bg flex flex-col">
      <p className="p-3 whitespace-pre-wrap">
        <span className="ml-2">Resultado de la compilación:</span> {getOutput()}
      </p>
    </div>
  );
};

ConsolaOutput.propTypes = { outputDetails: PropTypes.object };

export default ConsolaOutput;
