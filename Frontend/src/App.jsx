import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useContext } from "react";

import AuthState from "./auth/AuthState";
import AuthContext from "./auth/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/Homepage";
import RecommendationsPage from "./pages/RecomendationPage";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// In App component

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <Navigate to="/home" /> : children;
}

// This is important to access route in App for conditional footer
function AppRoutes() {
  const location = useLocation();
  const hideFooterRoutes = ["/login", "/register"];

  const shouldHideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/recommendations"
          element={
            <PrivateRoute>
              <RecommendationsPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Show footer only on selected pages */}
      {!shouldHideFooter && <Footer />}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}

export default function App() {
  return (
    <AuthState>
      <Router>
        <AppRoutes />
      </Router>
    </AuthState>
  );
}
