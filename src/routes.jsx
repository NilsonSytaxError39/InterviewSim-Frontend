import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/authContext";
import Spinner from "./components/spinner";

// Ruta protegida general (solo autenticados)
export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
};

// Ruta protegida por rol (ejemplo para estudiantes)
export const StudentRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  if (user?.role !== "student") return <Navigate to="/" replace />;
  return <Outlet />;
};

// Ruta protegida por rol (ejemplo para profesores)
export const TeacherRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <Spinner />;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  if (user?.role !== "teacher") return <Navigate to="/" replace />;
  return <Outlet />;
};

// Ruta pública (solo para usuarios NO autenticados)
export const PublicRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <Spinner />;

  // Si está autenticado, redirigir según el rol
  if (isAuthenticated) {
    if (user?.role === "student") {
      return <Navigate to="/student" replace />;
    } else if (user?.role === "teacher") {
      return <Navigate to="/teacher" replace />;
    }
  }

  // Si no está autenticado, mostrar la página pública
  return <Outlet />;
};
