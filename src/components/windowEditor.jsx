import { useState } from "react";
import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";

const WindowEditor = ({ onChange, language, code }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="relative rounded-md overflow-hidden w-full h-full shadow-4xl">
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

WindowEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  language: PropTypes.string,
  code: PropTypes.string,
  theme: PropTypes.string,
};
