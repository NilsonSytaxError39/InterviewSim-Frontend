import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Spinner from "./components/spinner";
import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "./context/themeContext";
import AreaStudent from "./pages/AreaStudent";
import AreaTeacher from "./pages/AreaTeacher";
import AreaInterview from "./pages/AreaInterview";
import { ProtectedRoute } from "./routes";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import Profile from "./components/ProfileUser/Profile";
import Settings from "./components/Settings/Settings";
import EditProfilePage from "./pages/EditProfilePage";
import RecoveryPassword from "./pages/recoveryPassword";
import ResetPassword from "./pages/resertPassword";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner />
    </div>
  ) : (
    <BrowserRouter>
      <ThemeProvider>
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-200 via-rose-100 to-orange-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900">
          <AuthProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/recovery-password" element={<RecoveryPassword />} />
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />
              <Route element={<ProtectedRoute />}>
                <Route path="/interview/:id" element={<AreaInterview />} />
                <Route path="/student" element={<AreaStudent />} />
                <Route path="/teacher" element={<AreaTeacher />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/edit-profile" element={<EditProfilePage />} />
              </Route>
            </Routes>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              closeOnClick={false}
              pauseOnHover={true}
              draggablePercent={100}
              bodyClassName={"text-sm p-2 m-2"}
              theme={"light"}
            />
          </AuthProvider>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
