import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ================= AUTH PAGES =================
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LoginSuccess from "./pages/LoginSuccess";
import ExpiredPage from"./pages/ExpiredPage";
import ProtectedLinkPage from "./pages/ProtectedLinkPage";
import PublicAnalytics from "./pages/PublicAnalytics";
import AcceptInvite from "./pages/AcceptInvite";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Contact from "./pages/Contact";

// ================= DASHBOARD =================

import Dashboard from "./pages/Dashboard";

// ================= PROTECTED ROUTE =================

import ProtectedRoute from "./components/auth/ProtectedRoute";
import Analytics from "./components/links/LinksTable";
// ================= AUTH CHECK =================

const PublicRoute = ({
  children,
}) => {

  const token =
    localStorage.getItem(
      "token"
    );

  return token
    ? (
      <Navigate
        to="/dashboard"
      />
    )
    : children;
};

// ================= APP =================

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* ================= DEFAULT ROUTE ================= */}

        <Route
          path="/"
          element={
            <LandingPage/>}
            />

            <Route
  path="/expired"
  element={<ExpiredPage />}
/>

            <Route path="/login-success" element={<LoginSuccess/>} />

            <Route
  path="/protected/:shortId"
  element={<ProtectedLinkPage />}
/>

<Route
  path="/public/:shortId"
  element={
    <PublicAnalytics />
  }
/>

<Route
 path="/invite/:token"
 element={<AcceptInvite />}
/>

<Route
  path="/analytics/:id"
  element={
    <ProtectedRoute>
      <Analytics />
    </ProtectedRoute>
  }
/>

        {/* ================= LOGIN ================= */}

        <Route
          path="/login"
          element={
            <PublicRoute>

              <Login />

            </PublicRoute>
          }
        />

        {/* ================= SIGNUP ================= */}

        <Route
          path="/signup"
          element={
            <PublicRoute>

              <Signup />

            </PublicRoute>
          }
        />

        {/* ================= DASHBOARD ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
 path="/privacy"
 element={<PrivacyPolicy />}
/>

<Route
 path="/terms"
 element={<TermsOfService />}
/>

<Route
 path="/contact"
 element={<Contact />}
/>

        {/* ================= 404 PAGE ================= */}

        <Route
          path="*"
          element={

            <div className="
              min-h-screen
              flex
              flex-col
              items-center
              justify-center
              bg-[#030712]
              text-white
            ">

              <h1 className="
                text-7xl
                font-black
                text-blue-500
              ">
                404
              </h1>

              <p className="
                text-gray-400
                mt-4
                text-lg
              ">
                Page not found
              </p>

            </div>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}