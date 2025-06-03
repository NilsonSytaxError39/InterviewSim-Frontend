import { useEffect, useState } from "react";
import Consejo1 from "../assets/Consejos.jpg";
import Consejo2 from "../assets/Consejos2.jpg";
import Consejo3 from "../assets/Consejos3.jpg";
import Consejo4 from "../assets/Consejos4.jpg";
import Consejo5 from "../assets/Consejos5.jpg";
import Consejo6 from "../assets/Consejos6.jpg";

function Tips() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      src: Consejo2,
      alt: "Slide 1",
    },
    {
      src: Consejo1,
      alt: "Slide 2",
    },
    {
      src: Consejo3,
      alt: "Slide 3",
    },
    {
      src: Consejo4,
      alt: "Slide 4",
    },
    {
      src: Consejo5,
      alt: "Slide 5",
    },
    {
      src: Consejo6,
      alt: "Slide 6",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // Cambia de imagen cada 3 segundos
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPreviousSlide = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const goToNextSlide = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="flex items-center justify-center  h-full w-full overflow-hidden rounded-lg p-4">
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex w-full h-full">
          <div
            id="default-carousel"
            className="relative w-full h-full rounded-lg overflow-hidden shadow-lg"
          >
            <div className="relative w-full h-full">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <img
                    src={slide.src}
                    className="w-full h-full  object-center"
                    alt={slide.alt}
                  />
                </div>
              ))}
            </div>

            <div className="flex absolute bottom-5 left-1/2 z-30 -translate-x-1/2 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex
                      ? "bg-gradient-to-tr from-lime-500 via-sky-500 to-orange-500 animate-bounce"
                      : "bg-gray-300 hover:bg-gray-400 bg-opacity-50"
                  }`}
                ></button>
              ))}
            </div>

            <button
              onClick={goToPreviousSlide}
              type="button"
              className="flex absolute top-1/2 left-3 z-40 items-center justify-center w-10 h-10 dark:bg-gray-800 border border-[#ffd700] bg-white dark:border-yellow-600 rounded-lg shadow-sm  focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] dark:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              onClick={goToNextSlide}
              type="button"
              className="flex absolute top-1/2 right-3 z-40 items-center justify-center w-10 h-10 dark:bg-gray-800 border border-[#ffd700] bg-white dark:border-yellow-600 rounded-lg shadow-sm  focus:outline-none focus:ring-2 focus:ring-[#ffd700] text-[#283e56] dark:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tips;
