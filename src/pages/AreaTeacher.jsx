import MenuTeacher from "../components/MenuTeacher";
import NavbarTeacher from "../components/NavbarTeacher";
import CreateInterview from "../components/createInterview";
import ViewInterview from "../components/viewInterview";
import EstadisticasEntrevistador from "../components/EstadisticasEntrevistador";
import { useState } from "react";

export default function AreaTeacher() {
  // Estado para el ítem de menú seleccionado
  const [selectedMenuItem, setSelectedMenuItem] = useState("create");

  /**
   * Renderiza el componente correspondiente según el menú seleccionado.
   * @returns {JSX.Element}
   */
  const renderSelectedComponent = () => {
    switch (selectedMenuItem) {
      case "create":
        return <CreateInterview />;
      case "view":
        return <ViewInterview />;
      case "stats":
        return <EstadisticasEntrevistador />;
      default:
        return <CreateInterview />;
    }
  };

  return (
    <>
      <div className="p-5 h-screen flex flex-col overflow-hidden bg-[#cbe2fe] dark:bg-gray-900 text-gray-900 dark:text-gray-200">
        <div className="flex flex-col lg:flex-row my-5 space-y-5 lg:space-y-0 lg:space-x-5 flex-grow overflow-hidden">
          {/* Menú lateral para navegación de opciones */}
          <div
            className="order-2 lg:order-1 w-full lg:w-1/3 flex flex-col h-full overflow-hidden mt-5 lg:mt-0 bg-white dark:bg-gray-800 bg-opacity-95 rounded-xl shadow-lg border-2 border-[#ffd700] dark:border-yellow-600"
            style={{ boxShadow: "0 4px 16px 0 rgba(40,62,86,0.15)" }}
          >
            <MenuTeacher onMenuItemChange={setSelectedMenuItem} />
          </div>
          {/* Panel principal dinámico según opción seleccionada */}
          <div
            className={`order-1 lg:order-2 w-full lg:w-3/4 flex flex-col space-y-5 h-full overflow-hidden ${
              selectedMenuItem === "view"
            } rounded-xl shadow-lg`}
            style={{ boxShadow: "0 4px 16px 0 rgba(40,62,86,0.10)" }}
          >
            <NavbarTeacher />
            <div className="flex flex-col h-full overflow-hidden">
              {renderSelectedComponent()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
