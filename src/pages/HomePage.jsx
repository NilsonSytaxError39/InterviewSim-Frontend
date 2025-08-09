import { Link } from "react-router-dom";
import Fondo from "../assets/Banner.jpg";
import Logo from "../assets/Logo.png";
import { useTheme } from "../context/themeContext";
import { t } from "../i18n";

export default function HomePage() {
  const { language, changeLanguage } = useTheme();
  return (
    <div className="relative h-screen flex w-full flex-col justify-center items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={Fondo} alt="Fondo" className="w-full h-full object-cover opacity-20" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#283e56] via-[#4fc3f7] to-[#283e56] opacity-95"></div>
      <div className="relative z-10 flex flex-col items-center text-center text-[#283e56] p-6 bg-white bg-opacity-95 rounded-xl max-w-lg mx-4 sm:mx-8 lg:mx-16 shadow-lg border-2 border-[#ffd700]" style={{boxShadow: '0 8px 32px 0 rgba(40,62,86,0.25)'}}>
        <div className="bg-white rounded-full p-3 animate-jump-in mb-4 shadow-md border-2 border-[#ffd700]">
          <img src={Logo} alt="Logo" className="w-40 h-40 md:w-32 md:h-32" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-jump text-black">
          InterviewSim
        </h1>
        <div className="flex justify-end w-full mb-2">
          <select
            value={language}
            onChange={e => changeLanguage(e.target.value)}
            className="rounded px-2 py-1 text-[#283e56] bg-white border border-[#ffd700] focus:outline-none focus:ring-2 focus:ring-[#ffd700] font-semibold"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
        <p className="bg-white bg-opacity-80 text-black p-4 rounded-lg text-base md:text-lg max-w-md mx-auto shadow border-l-4 border-[#ffd700]">
          {t('homepage_paragraph', language)}
        </p>
        <div className="flex flex-col sm:flex-row sm:space-x-8 mt-6">
          <Link
            to={"/login"}
            className="block px-6 py-2 bg-[#283e56] text-[#ffd700] font-bold rounded-md shadow-md border-2 border-[#ffd700] hover:bg-[#ffd700] hover:text-[#283e56] transition mb-2 sm:mb-0 duration-200"
            style={{boxShadow: '0 2px 8px #283e56aa'}}
          >
            {t('login', language)}
          </Link>
          <Link
            to={"/register"}
            className="block px-6 py-2 bg-[#4fc3f7] text-[#283e56] font-bold rounded-md shadow-md border-2 border-[#ffd700] hover:bg-[#ffd700] hover:text-[#283e56] transition duration-200"
            style={{boxShadow: '0 2px 8px #4fc3f7aa'}}
          >
            {t('register', language)}
          </Link>
        </div>
      </div>
      <footer className="absolute bottom-0 left-0 w-full text-black dark:text-white flex justify-center items-center bg-opacity-60 p-2">
        <p className="text-xs sm:text-sm text-center">
          © 2024 InterviewSim. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
