
/**
 * Componente WindowEditor
 * Renderiza un editor de código basado en Monaco Editor, permitiendo edición y cambio de lenguaje.
 * Recibe el código inicial, el lenguaje y una función para manejar cambios.
 *
 * @component
 * @param {Object} props
 * @param {function} props.onChange - Función llamada al cambiar el código.
 * @param {string} props.language - Lenguaje de programación para el editor.
 * @param {string} props.code - Código inicial a mostrar en el editor.
 * @returns {JSX.Element} Editor visual de código.
 */
import { useState } from "react";
import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";

const WindowEditor = ({ onChange, language, code }) => {
  // Estado para el valor actual del editor
  const [value, setValue] = useState(code || "");

  /**
   * Maneja el cambio de código en el editor.
   * @param {string} value - Nuevo valor del código.
   */
  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="relative rounded-md overflow-hidden w-full h-full shadow-4xl">
      {/* Editor Monaco configurado con tema oscuro y sin minimapa */}
      <Editor
        language={language}
        value={value}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
        }}
      />
    </div>
  );
};

export default WindowEditor;

/**
 * PropTypes para WindowEditor
 * Valida los tipos de las props recibidas.
 */
WindowEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  language: PropTypes.string,
  code: PropTypes.string,
  theme: PropTypes.string,
};
