
/**
 * Componente Tips
 * Muestra un carrusel de imágenes con consejos para entrevistas.
 * Permite navegación manual y automática entre los slides.
 *
 * @component
 * @returns {JSX.Element} Carrusel visual con controles y animación automática.
 */
import { useEffect, useState } from "react";
import Consejo1 from "../assets/Consejos.jpg";
import Consejo2 from "../assets/Consejos2.jpg";
import Consejo3 from "../assets/Consejos3.jpg";
import Consejo4 from "../assets/Consejos4.jpg";
import Consejo5 from "../assets/Consejos5.jpg";
import Consejo6 from "../assets/Consejos6.jpg";

function Tips() {
  // Estado para el índice actual del slide
  const [currentIndex, setCurrentIndex] = useState(0);
  // Array de slides con imágenes y texto alternativo
  const slides = [
    { src: Consejo2, alt: "Slide 1" },
    { src: Consejo1, alt: "Slide 2" },
    { src: Consejo3, alt: "Slide 3" },
    { src: Consejo4, alt: "Slide 4" },
    { src: Consejo5, alt: "Slide 5" },
    { src: Consejo6, alt: "Slide 6" },
  ];

  // Efecto para cambiar automáticamente de slide cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // Cambia de imagen cada 10 segundos
    return () => clearInterval(interval);
  }, [slides.length]);

  // Navega al slide anterior
  const goToPreviousSlide = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  // Navega al siguiente slide
  const goToNextSlide = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="flex items-center justify-center h-full w-full overflow-hidden rounded-lg p-4">
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex w-full h-full">
          <div
            id="default-carousel"
            className="relative w-full h-full rounded-lg overflow-hidden shadow-lg"
          >
            {/* Slides del carrusel */}
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
                    className="w-full h-full object-center"
                    alt={slide.alt}
                  />
                </div>
              ))}
            </div>

            {/* Indicadores de slide (puntos) */}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tips;
