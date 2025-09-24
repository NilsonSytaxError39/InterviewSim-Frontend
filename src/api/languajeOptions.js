/**
 * Lista de opciones de lenguajes de programación y tecnologías
 * utilizadas en entornos de ejecución o compilación dentro del sistema.
 *
 * Cada objeto contiene:
 * - id: Identificador único del lenguaje (puede coincidir con una API externa como Judge0)
 * - name: Nombre completo y versión del lenguaje
 * - label: Texto que se muestra al usuario en menús desplegables
 * - value: Valor corto que representa el lenguaje internamente
 */
export const languageOptions = [
  // Lenguajes utilizados en el programa
  {
    id: 71,
    name: "Python (3.8.1)",
    label: "Python (3.8.1)",
    value: "python3",
  },
  {
    id: 63,
    name: "JavaScript (Node.js 18.x)",
    label: "JavaScript (Node.js 18.x)",
    value: "javascript",
  },
  {
    id: 62,
    name: "Java (OpenJDK 13.0.1)",
    label: "Java (OpenJDK 13.0.1)",
    value: "java",
  },
  {
    id: 54,
    name: "C++ (GCC 9.2.0)",
    label: "C++ (GCC 9.2.0)",
    value: "cpp",
  },
  {
    id: 72,
    name: "Ruby (2.7.0)",
    label: "Ruby (2.7.0)",
    value: "ruby",
  },
  {
    id: 78,
    name: "Kotlin (1.3.70)",
    label: "Kotlin (1.3.70)",
    value: "kotlin",
  },
  {
    id: 83,
    name: "Swift (5.2.3)",
    label: "Swift (5.2.3)",
    value: "swift",
  },
  {
    id: 74,
    name: "TypeScript (3.7.4)",
    label: "TypeScript (3.7.4)",
    value: "typescript",
  },
  {
    id: 68,
    name: "PHP (7.4.1)",
    label: "PHP (7.4.1)",
    value: "php",
  },
  {
    id: 1001,
    name: "Angular (Framework)",
    label: "Angular (Framework)",
    value: "angular",
  },
  {
    id: 51,
    name: "C# (Mono 6.6.0.161)",
    label: "C# (Mono 6.6.0.161)",
    value: "csharp",
  },
  {
    id: 2001,
    name: "Dart (2.17.0)",
    label: "Dart (2.17.0)",
    value: "dart",
  },
  {
    id: 3001,
    name: "Node.js (18.x)",
    label: "Node.js (18.x)",
    value: "nodejs",
  },
  {
    id: 60,
    name: "Go (1.13.5)",
    label: "Go (1.13.5)",
    value: "go",
  },
  {
    id: 73,
    name: "Rust (1.40.0)",
    label: "Rust (1.40.0)",
    value: "rust",
  },
  {
    id: 82,
    name: "SQL (SQLite 3.27.2)",
    label: "SQL (SQLite 3.27.2)",
    value: "sql",
  },

  // Lenguajes débilmente tipados (sin VBScript ni ActionScript)
  {
    id: 4001,
    name: "Perl (5.30)",
    label: "Perl (5.30)",
    value: "perl",
  },
  {
    id: 4002,
    name: "Lua (5.3)",
    label: "Lua (5.3)",
    value: "lua",
  },
  {
    id: 4003,
    name: "Bash (Shell scripting)",
    label: "Bash (Shell scripting)",
    value: "bash",
  },
  {
    id: 4004,
    name: "Tcl (8.6)",
    label: "Tcl (8.6)",
    value: "tcl",
  },
  {
  id: 5001,
  name: "GNU Bash",
  label: "GNU Bash (Bourne Again Shell)",
  value: "gnu-bash"
  }
];
