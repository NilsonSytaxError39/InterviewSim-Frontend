import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import { getGradesRequest, getGradesTeacherRequest } from "../../api/auth";
import { useTheme } from "../../context/themeContext";
import { t } from "../../i18n";

function Acciones() {
  const { user } = useAuth();
  const [acciones, setAcciones] = useState([]);
  const { language } = useTheme();

  useEffect(() => {
    const traerAcciones = async () => {
      try {
        let response;
        if (user.role === "student") {
          response = await getGradesRequest(user.id, user.role);
        } else if (user.role === "teacher") {
          response = await getGradesTeacherRequest(user.id, user.role);
        } else {
          console.error("Rol no reconocido:", user.role);
          setAcciones([]);
          return;
        }

        const data = response.data;

        console.log("Datos recibidos:", data);

        if (user.role === "student" && Array.isArray(data.calificaciones)) {
          setAcciones(data.calificaciones);
        } else if (user.role === "teacher" && Array.isArray(data.acciones)) {
          setAcciones(data.acciones);
        } else {
          console.error(
            "La propiedad no es un arreglo:",
            user.role === "student" ? data.calificaciones : data.acciones
          );
          setAcciones([]);
        }
      } catch (error) {
        console.error("Error al traer las acciones:", error);
        setAcciones([]);
      }
    };

    if (user?.id && user?.role) {
      traerAcciones();
    }
  }, [user]);

  return (
    <div className="h-full w-full p-5 bg-gradient-to-r from-[#283e56] to-[#4fc3f7] border-2 border-yellow-400 rounded-lg overflow-hidden">
      <div className="flex flex-col w-full h-full p-5 space-y-5 overflow-y-auto">
        {acciones.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="bg-white shadow-md rounded-lg p-3 font-semibold text-center">
              <p className="text-gray-700">{t("nothin_accions", language)}</p>
            </div>
          </div>
        ) : (
          acciones.map((accion, index) => (
            <div
              key={index}
              className="bg-white shadow-md border-2 rounded-lg p-3 font-semibold text-center flex items-center justify-center hover:bg-cyan-100 transition duration-300 ease-in-out hover:scale-105"
            >
              <p className="text-gray-800">{accion}</p>
            </div>
          ))
        )}
      </div>
      <div className="flex items-center justify-center mt-6 ">
        <p className="text-sm text-gray-600">
          {t("profile_info_text", language)}
        </p>
      </div>
    </div>
  );
}

export default Acciones;
