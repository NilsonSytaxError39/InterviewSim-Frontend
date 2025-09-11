
/**
 * Contexto de autenticación para la aplicación.
 * Proporciona estado y funciones para login, registro, cierre de sesión y eliminación de usuario.
 * Utiliza cookies y localStorage para persistencia del token.
 *
 * @module AuthContext
 */
import { createContext, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import {
  verifyTokenRequest,
  LoginRequest,
  registerRequest,
  logoutRequest,
  deleteUserRequest,
} from "../api/auth.js";

/**
 * Contexto global para autenticación.
 */
export const AuthContext = createContext();

/**
 * Hook para acceder al contexto de autenticación.
 * @throws Error si se usa fuera de AuthProvider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * Proveedor de autenticación.
 * Maneja el estado de usuario, autenticación y errores, y expone funciones para login, registro, logout y eliminación.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Componentes hijos envueltos por el proveedor.
 * @returns {JSX.Element} Contexto de autenticación para la aplicación.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado del usuario autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const [loading, setLoading] = useState(true); // Estado de carga
  const [errorMesage, setErrorMesage] = useState(null); // Mensaje de error

  /**
   * Limpia la sesión y elimina el token.
   */
  const cleanSession = () => {
    setUser(null);
    setIsAuthenticated(false);
    setErrorMesage(null);
    localStorage.removeItem("token");
    Cookies.remove("token");
  };

  // Verifica el login al montar el componente
  useEffect(() => {
    const checkLogin = async () => {
      setLoading(true);
      const token = localStorage.getItem("token") || Cookies.get("token");
      try {
        if (!token) {
          cleanSession();
          setLoading(false);
          return;
        } else {
          const response = await verifyTokenRequest(token);
          if (response.data.error) {
            cleanSession();
            setLoading(false);
            return;
          }
          setUser(response.data);
          setIsAuthenticated(true);
          setErrorMesage(null);
        }
      } catch (error) {
        cleanSession();
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  /**
   * Inicia sesión con los datos de usuario.
   * @param {Object} userData - Datos de usuario para login.
   * @returns {Object} Resultado del login.
   */
  const signin = async (userData) => {
    try {
      setLoading(true);
      const response = await LoginRequest(userData);
      if (response.data.error) {
        setErrorMesage(response.data.message);
        setIsAuthenticated(false);
        return { error: true, message: response.data.message };
      }
      setUser(response.data);
      setIsAuthenticated(true);
      setErrorMesage(null);
      localStorage.setItem("token", response.data.tokenSession);
      return { error: false, message: "Inicio de sesión exitoso" };
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      setErrorMesage(errorMessage);
      return { error: true, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Registra un nuevo usuario.
   * @param {Object} userData - Datos de usuario para registro.
   * @returns {Object} Resultado del registro.
   */
  const signup = async (userData) => {
    try {
      setLoading(true);
      setErrorMesage(null);
      const response = await registerRequest(userData);
      localStorage.setItem("token", response.data.tokenSession);
      if (response.status === 200) {
        return { error: false, message: "Registro exitoso" };
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Error desconocido";
      setErrorMesage(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cierra la sesión del usuario.
   */
  const signout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error("Error signing out:", error);
      setErrorMesage(error.response ? error.response.data : error.message);
    } finally {
      cleanSession();
    }
  };

  /**
   * Elimina el usuario actual.
   * @param {Object} userData - Datos del usuario a eliminar.
   */
  const deleteUser = async (userData) => {
    try {
      await deleteUserRequest(userData);
      cleanSession();
    } catch (error) {
      console.error("Error deleting user:", error);
      cleanSession();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        signin,
        signup,
        signout,
        deleteUser,
        errorMesage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
