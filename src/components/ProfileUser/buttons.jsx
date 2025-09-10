import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/themeContext";
import { t } from "../../i18n";
/**
 * Componente Buttons
 *
 * Renderiza un grupo de botones relacionados con la gestión de la cuenta de usuario:
 * - **Eliminar perfil** → Llama a `deleteUser` con los datos del usuario.
 * - **Editar perfil** → Redirige a la página de edición de perfil.
 * - **Cerrar sesión** → Llama a `signout` y redirige al inicio.
 *
 * El componente utiliza:
 * - `useAuth` → para acceder al usuario, cerrar sesión y eliminar cuenta.
 * - `useNavigate` → para redirecciones.
 * - `useTheme` + `t` → para traducciones dinámicas según idioma.
 *
 */
function Buttons() {
  const { signout, deleteUser, user } = useAuth();
  const navigate = useNavigate();
  const { language } = useTheme();
  /**
   * Maneja el cierre de sesión del usuario.
   *
   * - Ejecuta `signout` para terminar la sesión.
   * - Redirige al usuario a la página principal (`/`).
   */
  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  /**
   * Maneja la eliminación del usuario actual.
   *
   * - Construye un objeto `userData` con `id` y `role`.
   * - Llama a `deleteUser` desde el contexto.
   */
  
  const handleDeleteUser = async () => {
    const userData = {
      id: user.id,
      role: user.role,
    };
    console.log("userData", userData);
    try {
      await deleteUser(userData);
    } catch (error) {
      console.error("Error al borrar usuario:", error);
    }
  };
  return (
    <>
      <div className="h-full w-full flex items-center bg-gradient-to-r from-[#283e56] to-[#4fc3f7] border-2 border-yellow-400 overflow-hidden rounded-lg">
        <div className="flex w-full justify-between items-center">
          <div className="flex px-8">
            <button
              onClick={handleDeleteUser}
              className="bg-gradient-to-t from-[#283e56] to-[#4fc3f7] border-2 border-yellow-400 text-white font-bold py-2 px-3 rounded-lg flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              {t("delete_profile", language)}
            </button>
          </div>
          <div className="flex space-x-8 px-8">
            <button
              className="bg-gradient-to-t from-[#355c7d] to-[#6dd5fa] border-2 border-yellow-400 text-white font-bold py-2 px-3 rounded-lg flex items-center"
              onClick={() => navigate("/edit-profile")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              {t("edit_profile", language)}
            </button>

            <Link to="/edit-profile" onClick={handleSignOut}>
              <button className="bg-gradient-to-t from-[#1e3c72] to-[#2a5298] border-2 border-yellow-400 text-white font-bold py-2 px-3 rounded-lg flex items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                  />
                </svg>
                {t("close_session", language)}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Buttons;
