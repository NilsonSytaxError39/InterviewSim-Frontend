import { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";

function FiltersInterview({ fetchInterviews }) {
  const [selectedProgramming, setSelectedProgramming] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const { language } = useTheme();

  const handleFilter = () => {
    const filters = {
      programming: selectedProgramming,
      difficulty: selectedDifficulty,
    };
    fetchInterviews(filters);
  };

  return (
    <div className="flex flex-col space-y-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 text-center">
        {t("filter_interviews", language)}
      </h2>

      {/* Filtro por programación */}
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="programming"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t("filter_by_programming", language)}
        </label>
        <select
          id="programming"
          value={selectedProgramming}
          onChange={(e) => setSelectedProgramming(e.target.value)}
          className="block w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          <option value="">Seleccionar...</option>
          <option value="opcionMultiple">Opción Múltiple</option>
          <option value="programacion">Programación</option>
        </select>
      </div>

      {/* Filtro por dificultad */}
      <div className="flex flex-col space-y-2">
        <label
          htmlFor="difficulty"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t("filter_by_difficulty", language)}
        </label>
        <select
          id="difficulty"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="block w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          <option value="">Seleccionar...</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      {/* Botón para aplicar filtros */}
      <button
        onClick={handleFilter}
        className="w-full px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        type="button"
        title="Aplicar filtros"
      >
        {t("apply_filters", language)}
      </button>
    </div>
  );
}

FiltersInterview.propTypes = {
  fetchInterviews: PropTypes.func.isRequired,
};

export default FiltersInterview;
