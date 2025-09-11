
/**
 * Componente AreaInterview
 * Muestra el área principal de la entrevista, cargando los datos y renderizando el tipo de entrevista correspondiente.
 * Utiliza hooks para obtener el id de la entrevista, cargar datos y mostrar spinner mientras carga.
 *
 * @component
 * @returns {JSX.Element} Panel visual con la entrevista y controles de navegación.
 */
import { useEffect, useState } from "react";
import { getInterviewByIdRequest } from "../api/interview";
import { Link, useParams } from "react-router-dom";
import Logo from "../assets/Logo.png";
import ProblemaOpcionMultiple from "../components/OpcionMultipleEntrevista.jsx";
import ProgramacionEntrevista from "../components/ProgramacionEntrevista.jsx";
import Spinner from "../components/spinner.jsx";

function AreaInterview() {
  const { id } = useParams(); // Obtiene el id de la entrevista desde la URL
  const [interview, setInterview] = useState({}); // Estado para los datos de la entrevista
  const [IAresult, setIAresult] = useState([]);   // Estado para los resultados de IA
  const [loading, setLoading] = useState(true);   // Estado de carga

  // Efecto para cargar los datos de la entrevista al montar el componente
  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const response = await getInterviewByIdRequest(id);
        setInterview(response.data.interview);
        setIAresult(response.data.IAresult);
      } catch (error) {
        console.error(
          "Error al traer la entrevista:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };
    fetchInterview();
  }, [id]);

  /**
   * Navega hacia atrás en el historial del navegador.
   */
  const Back = () => {
    window.history.back();
  };

  // Muestra spinner mientras se cargan los datos
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="h-screen w-full p-5 bg-[#cbe2fe] dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <div className="flex flex-col items-start h-full">
        {/* Barra superior con logo, título y botones de navegación */}
        <div className="w-full flex flex-row justify-between items-center rounded-lg space-x-4 lg:space-x-6 mx-auto ">
          <button
            onClick={Back}
            className="rounded-full p-2 lg:p-3 bg-gradient-to-br from-[#283e56] to-[#4fc3f7] border-2 border-[#ffd700] hover:scale-110 transform duration-200 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#ffd700"
              className="h-5 w-5 lg:h-6 lg:w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <div className="flex flex-row text-center bg-gradient-to-r from-[#283e56] to-[#4fc3f7] rounded-lg w-full justify-between  px-5 lg:px-8 mx-auto items-center space-x-4 lg:space-x-5 ">
            <div className="p-1 flex items-center justify-center cursor-pointer">
              <img
                src={Logo}
                alt="Logo"
                className="h-10 w-10 lg:h-14 lg:w-14 bg-white rounded-full p-1 border-2 border-[#ffd700]"
              />
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 ml-1 hidden lg:block">
                InterviewSim
              </h1>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex h-6 lg:h-10 items-center rounded-3xl animate-jump-in bg-white text-gray-900 p-2 lg:p-3">
                <span className="text-sm lg:text-xl font-bold hidden md:block mr-1 text-gray-900">
                  {interview.title}
                </span>
              </div>
            </div>
          </div>
          <Link
            to={`/student`}
            onClick={Back}
            className="rounded-full p-2 lg:p-3 bg-gradient-to-br from-[#283e56] to-[#4fc3f7] border-2 border-[#ffd700] hover:scale-110 transform duration-200 ease-in-out"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#ffd700"
              className="h-5 w-5 lg:h-6 lg:w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
        </div>
        {/* Renderiza el tipo de entrevista correspondiente */}
        <div className="w-full flex flex-col lg:flex-row  lg:space-y-0 lg:space-x-5 h-full overflow-hidden mt-5">
          <div className="w-full flex flex-col space-y-5 h-full">
            {interview.tipoEntrevista === "programacion" && (
              <ProgramacionEntrevista
                nombreEntrevista={interview.title}
                IAresult={IAresult}
                dificultad={interview.Dificultad}
                tipoEntrevista={interview.tipoEntrevista}
              />
            )}
            {interview.tipoEntrevista === "opcionMultiple" && (
              <ProblemaOpcionMultiple
                nombreEntrevista={interview.title}
                IAresult={IAresult}
                dificultad={interview.Dificultad}
                tipoEntrevista={interview.tipoEntrevista}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AreaInterview;
