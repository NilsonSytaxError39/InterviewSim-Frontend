import { useAuth } from "../../context/authContext";
import Logo from "../../assets/Logo.png";
import Info from "./Info";
import Acciones from "./acciones";
import Buttons from "./buttons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/themeContext";
import { t } from "../../i18n";
import { updateProfileRequest } from "../../api/auth";
import { toast } from "react-toastify";

function Profile() {
  // Obtenemos el usuario desde el contexto de autenticación
  const { user } = useAuth();
  const navigate = useNavigate();
  const { language } = useTheme();
  console.log(user);
  const Back = () => {
    window.history.back();
  };
  // Estado inicial del perfil
  const [profileImage, setProfileImage] = useState(Logo); // Imagen de perfil (por defecto el logo)
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [indetifiquer, setIndetifiquer] = useState("");  // ID del usuario
  const [fechas, setFechas] = useState(""); // Fecha de registro
  const [role, setRole] = useState(""); // Rol del usuario (student / teacher)
    // Estados para edición de perfil
  const [showEditModal, setShowEditModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [newBio, setNewBio] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // 🔹 Carga dinámica de imagen según la primera letra del nombre de usuario
  useEffect(() => {
    const loadImage = async () => {
      try {
        const firstLetter = user?.userName?.charAt(0).toUpperCase(); // Primera letra del nombre
        const image = await import(`../../assets/Letras/${firstLetter}.png`);
        setProfileImage(image.default);
      } catch (error) {
        console.error("Error al cargar la imagen:", error);
        setProfileImage(Logo);
      }
    };

    if (user?.userName) {
      loadImage();
    }
  }, [user]);
  // 🔹 Cuando el usuario cambia, se actualizan los datos del perfil
  useEffect(() => {
    setUsername(user.userName);
    setEmail(user.email);
    setIndetifiquer(user.id);
    setFechas(user.date);
    setRole(user.role);
    setNewName(user.userName);
    setPreviewPhoto(profileImage);
    setNewBio(user.bio || "");
    setNewPhone(user.phone || "");
  }, [user, profileImage]);

  // 🔹 Redirección según el rol del usuario
  const handleRedirect = () => {
    if (user?.role === "student") {
      navigate("/student");
    } else if (user?.role === "teacher") {
      navigate("/teacher");
    }
  };
  
  // Abrir el modal de edición
  const handleEditProfile = () => setShowEditModal(true);

  // Cerrar el modal y resetear cambios
  const handleCloseModal = () => {
    setShowEditModal(false);
    setNewPhoto(null);
    setPreviewPhoto(profileImage);
    setNewName(username);
  };

  // 🔹 Manejo de carga de foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setNewPhoto(file);
      setPreviewPhoto(URL.createObjectURL(file)); // Vista previa de la foto
    } else {
      toast.error(t("photo_invalid", language));
    }
  };

  // 🔹 Guardar cambios del perfil en el backend
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!newName) {
      toast.error(t("name_required", language));
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      toast.error(t("passwords_no_match", language));
      return;
    }

    // Enviamos datos al backend
    setLoadingEdit(true);
    const formData = new FormData();
    formData.append("userName", newName);
    formData.append("bio", newBio);
    formData.append("phone", newPhone);
    if (newPassword) formData.append("password", newPassword);
    if (newPhoto) formData.append("photo", newPhoto);
    try {
      await updateProfileRequest(formData);
      toast.success(t("profile_update_success", language));
      setShowEditModal(false);
      window.location.reload(); // Recarga la página para reflejar cambios
    } catch (err) {
      toast.error(t("profile_update_error", language));
    } finally {
      setLoadingEdit(false);
    }
  };

  // 🔹 Renderizado del componente
  return (
    <div className="h-screen w-full p-5 overflow-auto bg-[#cde5ff] dark:bg-gray-900">
      <div className="flex flex-col items-start h-full">
        {/* Barra superior con botón de volver, logo e info usuario */}
        <div className="w-full flex justify-between items-center rounded-lg space-x-6 mx-auto">
          {/* Botón regresar */}
          <button
            onClick={Back}
            className="rounded-full p-4 bg-gradient-to-r from-[#283e56] to-[#4fc3f7] shadow-md hover:scale-110 transform duration-200 ease-in-out"
          >
            {/* Icono flecha */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#FFD700"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          {/* Logo y título */}
          <div className="flex text-center bg-gradient-to-r from-[#283e56] to-[#4fc3f7] border-2 border-yellow-400 rounded-lg w-full justify-between shadow-md px-10 mx-auto items-center">
            <div className="p-1 flex items-center justify-center cursor-pointer">
              <img
                src={Logo}
                alt="Logo"
                className="h-14 w-14 bg-white rounded-full p-1"
              />
              <h1 className="text-2xl font-bold text-gray-900 ml-1 hidden lg:block lg:text-2xl">
                InterviewSim
              </h1>
            </div>
            {/* Info bienvenida y foto de perfil */}
            <div className="flex items-center justify-center">
              <p className="text-xl font-bold text-gray-900 mr-5 hidden lg:block md:text-base">
                {t("welcome", language)} {t("profile", language)} 👋❤️!
              </p>
              <div className="flex h-10 items-center rounded-3xl animate-jump-in bg-white text-gray-900 p-2">
                <img
                  className="w-14 h-14 rounded-full p-1 md:block text-sm md:text-base font-bold text-gray-900"
                  src={profileImage}
                  alt="Profile"
                />
                <span className="sm:text-xl md:text-sm font-bold hidden md:block mr-1 text-gray-900">
                  {user.userName}
                </span>
              </div>
            </div>
          </div>
          {/* Botón para redirigir según rol */}
          <button
            onClick={handleRedirect}
            className="rounded-full p-4 bg-gradient-to-r from-[#283e56] to-[#4fc3f7] shadow-md hover:scale-110 transform duration-200 ease-in-out"
          >
          {/* Icono casa */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#FFD700"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-16 h-[75vh] py-8">
          <div className="w-full md:w-1/2 bg-gradient-to-r from-[#283e56] to-[#4fc3f7] rounded-xl p-12 shadow-lg text-white h-full flex flex-col justify-between">
            <Info
              name={username}
              email={email}
              indetifiquer={indetifiquer}
              date={fechas}
              role={role}
            />
          </div>
          {/* Contenido principal: Info usuario y acciones */}
          <div className="w-full md:w-1/2 bg-gradient-to-r from-[#283e56] to-[#4fc3f7] rounded-xl p-12 shadow-lg overflow-y-auto text-white h-full flex flex-col justify-between">
            <Acciones />
          </div>
        </div>
        {/* Botones inferiores */}
        <div className="bottom-0 w-full flex justify-center items-center  h-1/4 overflow-hidden">
          <Buttons />
        </div>
      </div>
    </div>
  );
}

export default Profile;
