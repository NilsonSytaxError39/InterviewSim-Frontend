import { useAuth } from "../context/authContext";
import Logo from "../assets/Logo.png";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";

function Navbar() {
  const { user, signout } = useAuth();
  console.log("datos del usuario", user);
  const navigate = useNavigate();
  const { language } = useTheme();

  const handleSignOut = async () => {
    try {
      await signout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const [profileImage, setProfileImage] = useState(Logo); // Valor por defecto

  useEffect(() => {
    const loadImage = async () => {
      try {
        const firstLetter = user?.userName?.charAt(0).toUpperCase();
        const image = await import(`../assets/Letras/${firstLetter}.png`);
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

  return (
    <>
      <header className="flex items-center justify-center top-0 bg-gradient-to-r from-[#283e56] to-[#4fc3f7] shadow-md h-20 w-full md:px-6 rounded-lg border-b-4 border-[#ffd700]">
        <nav className="flex justify-between items-center w-full  px-6 mx-auto">
          <div className="p-1 flex items-center justify-center cursor-pointer">
            <img
              src={Logo}
              alt="Logo"
              className="h-14 w-14 bg-white rounded-full p-1"
            />
            <h1 className="text-2xl font-bold text-gray-900 ml-1 hidden lg:block  lg:text-2xl ">
              InterviewSim
            </h1>
          </div>
          <div className=" items-center space-x-14  md:flex">
            <Menu as="nav" className="relative z-10 ">
              {({ open }) => (
                <>
                  <div className="flex items-center justify-center">
                    <p className="text-xl font-bold text-gray-900 mr-5 hidden lg:block md:text-base">
                      {t("welcome_student", language)}
                    </p>

                    <MenuButton
                      className={`flex h-10 items-center rounded-3xl animate-jump-in bg-white dark:bg-gray-800 border border-[#ffd700]  dark:border-yellow-600  shadow-sm  focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] dark:text-white`}
                    >
                      <img
                        className={`w-14 h-14 rounded-full p-1 md:block text-sm md:text-base font-bold  `}
                        src={profileImage}
                        alt="Profile"
                      />
                      <span
                        className={`sm:text-xl md:text-sm font-bold hidden md:block mr-1 `}
                      >
                        {user.userName}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className={`w-4 h-4 m-2 transition duration-300 ease-in-out ml-1 text-black font-bold ${
                          open === true &&
                          "transform rotate-180 transition duration-300 ease-in-out"
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </MenuButton>
                  </div>
                  <MenuItems
                    className="absolute p-1 top-20 right-0 w-52  translate-y-5  md:text-sm animate-jump-in z-50
                  bg-white
                        dark:bg-gray-800 border border-[#ffd700] dark:border-yellow-600 rounded-lg shadow-sm  focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] dark:text-white"
                  >
                    <MenuItem className="flex justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-700">
                      {(active) => (
                        <Link
                          to={"/profile"}
                          className={`h-10 flex items-center justify-between px-2 text-sm rounded-md${
                            active && "bg-white   font-bold"
                          }`}
                        >
                          {t("profile", language)}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 m-1 ml-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                            />
                          </svg>
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem className="flex justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-700">
                      {(active) => (
                        <Link
                          className={`h-10 flex items-center justify-between px-2 text-sm rounded-md${
                            active && "bg-white  font-bold"
                          }`}
                          to={"/settings"}
                        >
                          {t("settings", language)}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 m-1 ml-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </Link>
                      )}
                    </MenuItem>
                    <MenuItem className="flex justify-between items-center hover:bg-gray-200 dark:hover:bg-gray-700">
                      {(active) => (
                        <Link
                          className={`h-10 flex items-center justify-between px-2 text-sm rounded-md${
                            active && "bg-white  font-bold"
                          }`}
                          onClick={handleSignOut}
                        >
                          {t("signoff", language)}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 m-1 ml-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                            />
                          </svg>
                        </Link>
                      )}
                    </MenuItem>
                  </MenuItems>
                </>
              )}
            </Menu>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
