import Logo from "../assets/Logo.png";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-screen relative bg-white dark:bg-gray-900">
      <div role="status" className="flex flex-col items-center">
        <svg
          aria-hidden="true"
          className="w-28 h-28 animate-spin"
          viewBox="0 0 100 101"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#0f52ba" /> {/* Azul metalizado  */}
              <stop offset="50%" stopColor="#87ceeb" /> {/*Azul celeste */}
              <stop offset="100%" stopColor="#ffd700" /> {/* Dorado */}
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#gradient)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset="75"
          />
        </svg>
        <img
          src={Logo}
          className="h-20 w-20 rounded-full absolute"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <span className="absolute text-center text-gray-400 text-xl bottom-10">
          Cargando...
        </span>
      </div>
    </div>
  );
}
