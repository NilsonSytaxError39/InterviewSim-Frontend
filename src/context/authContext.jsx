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

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMesage, setErrorMesage] = useState(null);

  const cleanSession = () => {
    setUser(null);
    setIsAuthenticated(false);
    setErrorMesage(null);
    localStorage.removeItem("token");
    Cookies.remove("token");
  };

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
