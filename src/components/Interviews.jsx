import { useState, useEffect } from "react";
import { getInterviewsRequest } from "../api/interview";
import { Link } from "react-router-dom";
import Spinner from "./spinner";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";
import FiltersInterview from "./FiltersInterview";

function PanelInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useTheme();

  const fetchInterviews = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await getInterviewsRequest(filters);
      setInterviews(response.data);
    } catch (error) {
      console.error(
        "Error al traer las entrevistas:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews(); // Carga inicial sin filtros
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full min-h-screen relative">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full bg-gradient-to-r from-[#283e56] to-[#4fc3f7] rounded-lg overflow-hidden">
      <div className="flex flex-col w-full h-full p-5 space-y-5 overflow-y-auto panel-interviews-scroll">
        <FiltersInterview fetchInterviews={fetchInterviews} />
        {interviews.map((interview) => (
          <div
            key={interview._id}
            className="flex flex-col bg-white dark:bg-gray-800 border border-[#ffd700] dark:border-yellow-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] dark:text-white p-3 rounded-lg space-y-3"
          >
            <h2 className="text-lg font-bold">{interview.title}</h2>
            <p>{interview.description}</p>
            <div className="space-y-2">
              <p className="text-gray-700">
                {t("company", language)}: {interview.empresa}
              </p>
              <p className="text-gray-700">
                {t("interview_type", language)}: {interview.tipoEntrevista}
              </p>
            </div>
            <div className="flex w-full justify-between items-center">
              <Link
                to={`/interview/${interview._id}`}
                rel="noreferrer"
                className="text-blue-500 cursor-pointer"
              >
                {t("making_interview", language)}
              </Link>
              <div className="flex space-x-1 items-center justify-center">
                <span className="text-gray-700">
                  {t("difficulty", language)}
                </span>
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
  );
}

export default PanelInterviews;
