
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { getInterviewByTeacherRequest } from "../api/interview";
import Spinner from "./spinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";

/**
 * Componente que muestra estadísticas de entrevistas realizadas por el entrevistador.
 * Obtiene los datos desde la API y los presenta en una gráfica de barras.
 * @returns {JSX.Element}
 */


function EstadisticasEntrevistador() {
  const { user } = useAuth();
  const [estadisticas, setEstadisticas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language, theme } = useTheme();

  /**
   * Obtiene las estadísticas de entrevistas del entrevistador desde la API.
   * Actualiza el estado local con los datos recibidos.
   */
  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const response = await getInterviewByTeacherRequest(user.id);
        setEstadisticas(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setEstadisticas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEstadisticas();
  }, [user.id]);

  // Muestra spinner mientras se cargan los datos
  if (loading) return <Spinner />;

  // Si no hay estadísticas, muestra mensaje informativo
  if (!estadisticas.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8 text-lg font-semibold">
        {t("no_stats_available_yet", language)}
      </div>
    );
  }

  // Preparar datos para la gráfica de barras
  const dataChart = estadisticas.map((entrevista) => ({
    name: entrevista.title,
    numeroEntrevistados: entrevista.numeroEntrevistados,
  }));

  // Renderiza la gráfica de barras con los datos obtenidos
  return (
    <div className="space-y-6">
      {/* Gráfica de barras */}
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-2xl shadow-xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-center">
          {t("responses_by_interview", language)}
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={dataChart}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme === "dark" ? "#4B5563" : "#E5E7EB"}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 14, fill: theme === "dark" ? "#fff" : "#000" }}
              interval={0}
              angle={0}
              textAnchor="middle"
              height={40}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: theme === "dark" ? "#fff" : "#000" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1F2937" : "#CCE2FF",
                border: "none",
                borderRadius: "8px",
                color: theme === "dark" ? "#fff" : "#000",
              }}
            />
            <Legend
              wrapperStyle={{
                color: theme === "dark" ? "#fff" : "#000",
              }}
            />
            <Bar
              dataKey="numeroEntrevistados"
              fill={theme === "dark" ? "#A78BFA" : "#6366F1"}
              name={t("responses", language)}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EstadisticasEntrevistador;
