
import { useEffect, useState } from "react";
import Spinner from "./spinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mostrarInfoRequest } from "../api/interview";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";

/**
 * Componente que muestra estadísticas laborales por país en formato de gráfica de barras.
 * Obtiene los datos desde la API y los presenta agrupados por país y cantidad de entrevistas.
 * @returns {JSX.Element}
 */


function EstadisticasLaborales() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useTheme();

  /**
   * Obtiene los datos laborales desde la API y los formatea para la gráfica.
   * Actualiza el estado local con los datos recibidos.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const DatosInfo = await mostrarInfoRequest();
        console.log("Respuesta completa de la API:", DatosInfo);

        // Extraer los datos de la respuesta
        const respuesta = DatosInfo.data || [];
        console.log("Datos obtenidos del backend:", respuesta);

        // Formatear los datos obtenidos para la gráfica
        const formattedData = respuesta.data.map((item, index) => ({
          id: `${item.country}-${index}`,
          country: item.country || "Desconocido",
          totalInterviews: item.totalInterviews || 0,
        }));

        console.log("Datos formateados:", formattedData);
        setData(formattedData);
      } catch (error) {
        console.log("Error al obtener los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // Muestra spinner mientras se cargan los datos
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full relative">
        <Spinner />
      </div>
    );
  }

  // Si no hay datos, muestra mensaje informativo
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-gray-500 text-lg">
          {t("no_data_available", language)}
        </p>
      </div>
    );
  }

  // Renderiza la gráfica de barras con los datos laborales por país
  return (
    <div className="flex items-center justify-center h-full w-full overflow-hidden rounded-lg p-4">
      <div className="flex flex-col justify-center items-center h-full w-full">
        {/* Título de la gráfica */}
        <h1 className="text-lg font-bold m-3 text-gray-400">
          {t("laboral_stats_title", language).replace(
            "{{year}}",
            new Date().getFullYear()
          )}
        </h1>
        <div className="p-1 flex items-center justify-center h-full w-full m-5">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0f52ba" />{/* Azul metalizado */}
                  <stop offset="50%" stopColor="#87ceeb" />{/* Azul celeste */}
                  <stop offset="100%" stopColor="#ffd700" />{/* Dorado */}
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="country"
                tick={{ fontSize: 12 }}
                angle={0}
                textAnchor="middle"
                interval={0}
              />
              <YAxis
                label={{
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Bar
                dataKey="totalInterviews"
                fill="url(#barGradient)"
                stroke="#8884d8"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default EstadisticasLaborales;
