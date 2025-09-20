
import { useForm } from "react-hook-form";
import { createInterviewRequest } from "../api/interview.js";
import { useAuth } from "../context/authContext.jsx";
import { toast } from "react-toastify";
import { useState } from "react";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";

/**
 * Componente para crear una nueva entrevista.
 * Permite al usuario ingresar título, descripción, empresa, dificultad y tipo de entrevista.
 * Envía los datos al backend y muestra notificaciones de éxito o error.
 * @returns {JSX.Element}
 */

function CreateInterview() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const { user } = useAuth();
  const [tipoEntrevista, setTipoEntrevista] = useState("");
  const [loading, setLoading] = useState(false);
  const { language } = useTheme();


  /**
   * Maneja el envío del formulario de creación de entrevista.
   * Envía los datos al backend y gestiona los estados de carga y error.
   * @param {object} values - Datos del formulario
   */
  const onSubmit = async (values) => {
    setLoading(true);
    const userId = user.id;
    try {
      // Construye el objeto de datos para enviar
      const data = { ...values, userId, tipoEntrevista };
      console.log("Datos enviados:", data);
      await createInterviewRequest(data);
      toast.success(t("interview_created_success", language));
      reset();
    } catch (error) {
      // Manejo de errores de la API
      console.log(error);
      toast.error(t("interview_created_error", language));
      setError("apiError", {
        type: "manual",
        message: error.response?.data || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Renderiza el formulario de creación de entrevista y la imagen decorativa
  return (
    <div className="h-full w-full flex overflow-hidden space-x-5 items-center justify-center">
      {/* Imagen decorativa */}
      <div className="w-1/2 h-full bg-cover bg-center rounded-lg">
        <img
          src="https://coderslink.com/wp-content/uploads/2023/06/Entrevista-Tecnica-Animado.jpeg"
          alt="Crear Entrevista"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      {/* Formulario principal */}
      <div className="flex flex-col p-6 w-1/2 h-full bg-gradient-to-r from-[#283e56] to-[#4fc3f7] rounded-lg overflow-hidden scrollbar-yellow-createinterview">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 items-center justify-center my-auto overflow-y-auto"
        >
          <div className="flex flex-col space-y-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl">
            {/* Título */}
            <h1 className="flex items-center justify-center">
              <span className="text-2xl font-bold text-black dark:text-white">
                {t("create_interview", language)}
              </span>
            </h1>
            {/* Campo título de la entrevista */}
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="text-md font-medium text-black dark:text-white mb-1"
              >
                {t("interview_title", language)}
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="w-full px-4 py-3 text-sm font-semibold bg-white dark:bg-gray-800 border border-[#ffd700] dark:border-yellow-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-center text-[#283e56] dark:text-white"
                {...register("title", {
                  required: t("interview_title_required", language),
                })}
                placeholder={t("interview_title", language)}
                aria-label={t("interview_title", language)}
                onChange={() => clearErrors("title")}
              />
              {errors.title && (
                <span className="text-red-500 text-xs">
                  {errors.title.message}
                </span>
              )}
            </div>
            {/* Campo descripción */}
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-md font-medium text-black dark:text-white mb-1"
              >
                {t("interview_description", language)}
              </label>
              <textarea
                name="description"
                id="description"
                className="w-full text-center p-2 text-sm font-semibold bg-white dark:bg-gray-800 border border-[#ffd700] dark:border-yellow-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] dark:text-white resize-none"
                {...register("description")}
                placeholder={t("interview_description", language)}
                onChange={() => clearErrors("description")}
              />
              {errors.description && (
                <span className="text-red-500 text-xs">
                  {errors.description.message}
                </span>
              )}
            </div>
            {/* Campo empresa */}
            <div className="flex flex-col">
              <label
                htmlFor="empresa"
                className="text-md font-medium text-black dark:text-white mb-1"
              >
                {t("company", language)}
              </label>
              <input
                type="text"
                name="empresa"
                id="empresa"
                className="w-full text-center px-3 py-2 text-sm font-semibold bg-white dark:bg-gray-800 border border-[#ffd700] dark:border-yellow-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] dark:text-white"
                {...register("empresa", {
                  required: t("company_required", language),
                })}
                placeholder={t("company", language)}
                onChange={() => clearErrors("empresa")}
              />
              {errors.empresa && (
                <span className="text-red-500 text-xs">
                  {errors.empresa.message}
                </span>
              )}
            </div>
            {/* Campo dificultad */}
            <div className="flex flex-col">
              <label
                htmlFor="Dificultad"
                className="text-md font-medium text-black dark:text-white mb-1"
              >
                {t("difficulty", language)}
              </label>
              <select
                name="Dificultad"
                id="Dificultad"
                className="w-full text-start px-3 py-2 text-sm font-semibold bg-white dark:bg-gray-800 border border-[#ffd700] dark:border-yellow-600 rounded-lg shadow-sm  focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] dark:text-white"
                {...register("Dificultad", {
                  required: t("difficulty_required", language),
                })}
                onChange={() => clearErrors("Dificultad")}
              >
                <option value="">{t("select_difficulty", language)}</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {errors.Dificultad && (
                <span className="text-red-500 text-xs">
                  {errors.Dificultad.message}
                </span>
              )}
            </div>
            {/* Selección de tipo de entrevista */}
            <div className="flex flex-col mb-6">
              <label
                htmlFor="tipoEntrevista"
                className="text-md font-medium text-black dark:text-white mb-1"
              >
                {t("interview_type", language)}
              </label>
              <div className="flex justify-between space-x-4">
                {/* Opción múltiple */}
                <div
                  className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors duration-300 justify-center ${
                    tipoEntrevista === "opcionMultiple"
                      ? "border-green-500 bg-emerald-500 text-white"
                      : "dark:bg-gray-800 border border-[#ffd700] dark:border-yellow-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] dark:text-white"
                  } w-1/2 h-12`}
                  onClick={() => setTipoEntrevista("opcionMultiple")}
                >
                  <input
                    type="radio"
                    name="tipoEntrevista"
                    value="opcionMultiple"
                    className="hidden"
                    checked={tipoEntrevista === "opcionMultiple"}
                    readOnly
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                    />
                  </svg>
                  <span className="text-md font-medium">
                    {t("option_multiple", language)}
                  </span>
                </div>
                {/* Programación */}
                <div
                  className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors duration-300 justify-center ${
                    tipoEntrevista === "programacion"
                      ? "border-green-500 bg-emerald-500 text-white"
                      : "dark:bg-gray-800 border border-[#ffd700] dark:border-yellow-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] dark:text-white"
                  } w-1/2 h-12`}
                  onClick={() => setTipoEntrevista("programacion")}
                >
                  <input
                    type="radio"
                    name="tipoEntrevista"
                    value="programacion"
                    className="hidden"
                    checked={tipoEntrevista === "programacion"}
                    readOnly
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
                    />
                  </svg>
                  <span className="text-md font-medium">
                    {t("programming", language)}
                  </span>
                </div>
              </div>
            </div>

            {/* Error de la API */}
            {errors.apiError && (
              <span className="text-red-500 text-xs block text-center mb-2">
                {errors.apiError.message}
              </span>
            )}

            {/* Botón de envío */}
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="px-4 py-2 w-48  h-10 text-md font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={loading}
              >
                {loading ? t("creating", language) : t("create", language)}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateInterview;
