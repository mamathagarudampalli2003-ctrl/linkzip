import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Landing from "../pages/LandingPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import Dashboard from "../pages/Dashboard";
import Pricing from "../pages/Pricing";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {

  const token =
    localStorage.getItem("token");

  return (
    <Routes>

      {/* LANDING */}
      <Route
        path="/"
        element={
          token
            ? <Navigate to="/dashboard" />
            : <Landing />
        }
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={
          token
            ? <Navigate to="/dashboard" />
            : <Login />
        }
      />

      {/* SIGNUP */}
      <Route
        path="/Signup"
        element={
          token
            ? <Navigate to="/dashboard" />
            : <Signup />
        }
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          token
            ? <Dashboard />
            : <Navigate to="/login" />
        }
      />

      {/* PRICING */}
      <Route
        path="/pricing"
        element={<Pricing />}
      />

      {/* 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}