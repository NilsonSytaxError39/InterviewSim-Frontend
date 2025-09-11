import { useForm } from "react-hook-form";
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import Student from "../assets/Student.png";
import Teacher from "../assets/Teacher.png";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";
import { toast } from "react-toastify";

/**
 * Componente RegisterPage
 * Muestra el formulario de registro de usuario, validando los campos y rol, y mostrando mensajes de error o éxito.
 * Permite alternar la visibilidad de la contraseña y redirige al login tras el registro exitoso.
 *
 * @component
 * @returns {JSX.Element} Página de registro para InterviewSim.
 */
export default function RegisterPage() {
  // Hook para el formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  // Estado para mostrar/ocultar contraseña
  const [passwordVisible, setPasswordVisible] = useState(false);
  // Estado para el rol seleccionado
  const [role, setRole] = useState(null);
  // Función de registro del contexto de autenticación
  const { signup } = useAuth();
  // Hook para navegación programática
  const navigate = useNavigate();
  // Estado para errores de rol
  const [roleError, setRoleError] = useState("");
  // Estado para mostrar spinner de carga
  const [loading, setLoading] = useState(false);
  // Idioma actual
  const { language } = useTheme();

  /**
   * Maneja el envío del formulario de registro.
   * Realiza validaciones y llama a la función de registro.
   * @param {Object} values - Valores del formulario.
   */
  const onSubmit = handleSubmit(async (values) => {
    if (!role) {
      setRoleError(t("role_required", language));
      return;
    } else {
      setRoleError("");
    }
    setLoading(true);
    try {
      const response = await signup({ ...values, role });
      console.log("Registration response:", response);
      if (response.error === false) {
        toast.success(t("registration_success", language));
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("apiError", {
        type: "manual",
        message: t("registration_error", language),
      });
      setRoleError(t("role_required", language));
    } finally {
      setLoading(false);
    }
  });

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#283e56] via-[#4fc3f7] to-[#283e56]">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 border border-[#ffd700] dark:border-yellow-600 rounded-lg shadow-sm  focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] dark:text-white">
        <div className="flex flex-col items-center mb-8">
          <Link to={"/"}>
            <img
              src={Logo}
              alt="Logo"
              className="w-24 h-24 mb-4 animate-jump-in border-2 border-[#ffd700] bg-white rounded-full shadow-md"
            />
          </Link>
          <h1 className="text-3xl font-extrabold text-center text-[#283e56] dark:text-white">
            {t("register_title", language)}
          </h1>
        </div>
  {/* Formulario de registro */}
  <form onSubmit={onSubmit} className="space-y-6">
          {/* Campo de nombre de usuario */}
          <div className="relative mb-4">
            <label htmlFor="userName" className="sr-only">
              Usuario
            </label>
            <input
              id="userName"
              type="text"
              {...register("userName", {
                required: t("username_required", language),
              })}
              onChange={() => clearErrors("userName")}
              className="w-full px-4 py-3 text-sm font-semibold bg-white border border-[#ffd700] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-center text-[#283e56]"
              placeholder={t("username", language)}
              aria-label={t("username", language)}
            />
            {errors.userName && (
              <span className="text-red-500 text-xs absolute left-0 -bottom-5">
                {errors.userName.message}
              </span>
            )}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
          </div>

          {/* Campo de email */}
          <div className="relative mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: t("email_required", language),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("email_invalid", language),
                },
              })}
              onChange={() => clearErrors("email")}
              className="w-full px-4 py-3 text-sm font-semibold bg-white border border-[#ffd700] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-center text-[#283e56]"
              placeholder={t("email", language)}
              aria-label={t("email", language)}
            />
            {errors.email && (
              <span className="text-red-500 text-xs absolute left-0 -bottom-5">
                {errors.email.message}
              </span>
            )}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                />
              </svg>
            </div>
          </div>

          {/* Campo de contraseña */}
          <div className="relative mb-4">
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              id="password"
              type={passwordVisible ? "text" : "password"}
              {...register("password", {
                required: t("password_required", language),
                minLength: { value: 6, message: t("password_min", language) },
              })}
              onChange={() => clearErrors("password")}
              className="w-full px-4 py-3 text-sm font-semibold bg-white border border-[#ffd700] rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-center text-[#283e56]"
              placeholder={t("password", language)}
              aria-label={t("password", language)}
            />
            {errors.password && (
              <span className="text-red-500 text-xs absolute left-0 -bottom-5">
                {errors.password.message}
              </span>
            )}
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer z-20"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Selección de rol */}
          <div className="flex flex-wrap justify-around mb-2">
            <div
              className={`flex items-center space-x-2 p-2 border rounded-lg cursor-pointer ${
                role === "student"
                  ? "border-2 border-[#4fc3f7] bg-[#e3f7fd] text-[#283e56]"
                  : "border-2 border-[#ffd700] text-black"
              }`}
              onClick={() => {
                setRole("student");
                setRoleError("");
              }}
            >
              <input
                type="radio"
                name="role"
                value="student"
                className="hidden"
                checked={role === "student"}
                readOnly
              />
              <img src={Student} alt="Student" className="w-10 h-10" />
              <span className="text-gray-700 font-semibold">
                {t("student", language)}
              </span>
            </div>
            <div
              className={`flex items-center space-x-2 p-2 border rounded-lg cursor-pointer ${
                role === "teacher"
                  ? "border-2 border-[#4fc3f7] bg-[#e3f7fd] text-[#283e56]"
                  : "border-2 border-[#ffd700] text-black"
              }`}
              onClick={() => {
                setRole("teacher");
                setRoleError("");
              }}
            >
              <input
                type="radio"
                name="role"
                value="teacher"
                className="hidden"
                checked={role === "teacher"}
                readOnly
              />
              <img src={Teacher} alt="Teacher" className="w-10 h-10" />
              <span className="font-semibold">{t("teacher", language)}</span>
            </div>
          </div>
          {/* Mensaje de error de rol */}
          {roleError && (
            <span className="text-red-500 text-xs block text-center mb-2">
              {t("role_required", language)}
            </span>
          )}

          {/* Mensaje de error de la API */}
          {errors.apiError && (
            <span className="text-red-500 text-xs block text-center mb-2">
              {errors.apiError.message}
            </span>
          )}

          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full px-4 py-3 text-sm font-bold text-[#ffd700] bg-[#283e56] rounded-lg shadow-md border-2 border-[#ffd700] hover:bg-[#ffd700] hover:text-[#283e56] transition duration-200"
            disabled={loading}
            style={{ boxShadow: "0 2px 8px #283e56aa" }}
          >
            {loading ? t("registering", language) : t("register", language)}
          </button>
        </form>
  {/* Enlace para usuarios que ya tienen cuenta */}
  <div className="text-center  dark:text-white text-black mt-4">
          {t("already_have_account", language)}{" "}
          <Link
            to={"/login"}
            className="text-[#4fc3f7] font-bold hover:text-[#ffd700] transition"
          >
            {t("login", language)}
          </Link>
        </div>
      </div>
    </div>
  );
}
