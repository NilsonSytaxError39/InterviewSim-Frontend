import { useAuth } from "../context/authContext";
import Logo from "../assets/Logo.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";
import { updateProfileRequest } from "../api/auth";
import { toast } from "react-toastify";

export default function EditProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { language } = useTheme();

  const [profileImage, setProfileImage] = useState(Logo);
  const [newName, setNewName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    const loadImage = async () => {
      try {
        const firstLetter = user?.userName?.charAt(0).toUpperCase();
        const image = await import(`../assets/Letras/${firstLetter}.png`);
        setProfileImage(image.default);
      } catch (error) {
        console.error("Error loading image:", error);
        setProfileImage(Logo);
      }
    };
    if (user?.userName) loadImage();
  }, [user]);

  useEffect(() => {
    setNewName(user.userName);
    setEmail(user.email);
    setRole(user.role);
    setPreviewPhoto(profileImage);
  }, [user, profileImage]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setNewPhoto(file);
      setPreviewPhoto(URL.createObjectURL(file));
    } else {
      toast.error(t("photo_invalid", language));
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!newName) {
      toast.error(t("name_required", language));
      return;
    }
    if (!email) {
      toast.error(t("email_required", language));
      return;
    }
    if (password && password !== confirm) {
      toast.error(t("passwords_no_match", language));
      return;
    }

    setLoadingEdit(true);

    // Crear FormData
    const formData = new FormData();
    formData.append("userName", newName);
    formData.append("email", email);

    if (newPhoto) formData.append("photo", newPhoto);
    if (password) formData.append("password", password);

    try {
      // Enviar la solicitud al backend
      const response = await updateProfileRequest(formData);
      if (response.data.error === false) {
        window.location.reload();
        toast.success(t("profile_update_success", language));
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(t("profile_update_error", language));
    } finally {
      setLoadingEdit(false);
    }
  };

  return (
    <div className="h-screen w-full p-5 overflow-auto bg-[#cde5ff] dark:bg-gray-900">
      <div className="flex flex-col items-center h-full w-full">
        {/* Botón de regresar */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 z-50 rounded-full p-4 bg-gradient-to-r from-[#4fc3f7] via-[#ffd700] to-[#283e56] shadow-md hover:scale-110 transform duration-200 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        {/* Contenedor principal */}
        <div
          className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg flex flex-col items-center border-2 border-[#ffd700] dark:bg-gray-900"
          style={{ boxShadow: "0 8px 32px 0 rgba(40,62,86,0.15)" }}
        >
          {/* Encabezado con logo */}
          <div className="flex flex-col items-center ">
            <img
              src={Logo}
              alt="Logo"
              className="w-20 h-20 mb-2 border-2 border-[#ffd700] bg-white rounded-full shadow-md"
            />
            <h2
              className="text-2xl font-bold mb-2 text-black dark:text-white"
              style={{ textShadow: "0 2px 8px #ffd70055" }}
            >
              {t("edit_profile", language)}
            </h2>
          </div>

          {/* Formulario de perfil */}
          <form
            onSubmit={handleSaveChanges}
            className="w-full flex flex-col items-center"
          >
            {/* Foto de perfil */}
            <div className="mb-6 flex flex-col items-center w-full">
              <img
                src={previewPhoto}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-2 p-2"
              />
              <div className="flex items-center p-2">
                <label
                  htmlFor="photo-upload"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-t from-[#4fc3f7] to-[#ffd700] text-[#283e56] font-semibold rounded-lg shadow-md cursor-pointer hover:scale-105 transition border-2 border-[#ffd700]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16v-4m0 0V8m0 4h4m-4 0H8m12 4v1.25A2.25 2.25 0 0 1 17.75 19.5H6.25A2.25 2.25 0 0 1 4 17.25V6.75A2.25 2.25 0 0 1 6.25 4.5h7.5A2.25 2.25 0 0 1 16 6.75V8"
                    />
                  </svg>
                  {t("change_photo", language)}
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Campo de nombre */}
            <div className="mb-4 w-full">
              <label className="block mb-1 text-sm font-medium text-[#283e56]">
                {t("change_name", language)}
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] border-[#ffd700]"
                required
              />
            </div>

            {/* Campo de email EDITABLE */}
            <div className="mb-4 w-full">
              <label className="block mb-1 text-sm font-medium text-[#283e56]">
                {t("email", language)}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] border-[#ffd700]"
                required
              />
            </div>

            {/* Campo de contraseña */}
            <div className="mb-4 w-full">
              <label className="block mb-1 text-sm font-medium text-[#283e56]">
                {t("password", language)}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] border-[#ffd700]"
                placeholder={t("password", language)}
              />
            </div>

            {/* Confirmar contraseña */}
            <div className="mb-4 w-full">
              <label className="block mb-1 text-sm font-medium text-[#283e56]">
                {t("confirm_password", language)}
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] border-[#ffd700]"
                placeholder={t("confirm_password", language)}
              />
            </div>

            {/* Campo de rol */}
            <div className="mb-4 w-full">
              <label className="block mb-1 text-sm font-medium text-[#283e56]">
                {t("role", language)}
              </label>
              <input
                type="text"
                value={t(role, language)}
                disabled
                className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed border-[#ffd700]"
              />
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end w-full space-x-2 mt-8">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-gray-300 text-[#283e56] rounded-lg hover:bg-gray-400 border-2 border-[#ffd700]"
                disabled={loadingEdit}
              >
                {t("cancel", language)}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#283e56] text-[#ffd700] rounded-lg font-semibold hover:bg-[#ffd700] hover:text-[#283e56] transition border-2 border-[#ffd700]"
                disabled={loadingEdit}
              >
                {loadingEdit
                  ? t("saving", language)
                  : t("save_changes", language)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
