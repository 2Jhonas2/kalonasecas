/**
 * App (fusionado)
 * - Header/NavBar/Footer persistentes (modales globales: Login, Register, Profile)
 * - Rutas públicas, protegidas y con control de roles
 * - Reset password, Favorites, Dashboard
 * - Integra componentes extra: Carousel, Card (Catálogo), AddCard, AddPackage
 */

import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./Variables.css";
import "./App.css";
import "./components/layouts/Footer.css";

import Header from "./components/layouts/Header";
import NavBar from "./components/layouts/NavBar";
import Footer from "./components/layouts/Footer";

import Home from "./components/pages/Home";
import { Package } from "./components/pages/Package";
import { Promotions } from "./components/pages/Promotions";
import { News } from "./components/pages/News";
import Favorites from "./components/pages/Favorites";
import Dashboard from "./components/pages/Dashboard";
import ListUsers from "./components/layouts/ListUsers";
import Profile from "./components/pages/Profile";

import Carousel from "./components/layouts/Carousel";
import Card from "./components/layouts/Card";
import AddCard from "./components/layouts/AddCard.jsx";
import { AddPackage } from "./components/layouts/AddPackage.jsx";

import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { ResetPasswordForm } from "./auth/ResetPasswordForm";
import VerificationSuccess from "./components/pages/VerificationSuccess";
import VerificationFailure from "./components/pages/VerificationFailure";

import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const location = useLocation();
  const { user, logout } = useAuth();

  // 'login' | 'register' | 'profile' | null
  const [modal, setModal] = useState(null);

  const openModal = (name) => setModal(name);
  const closeModal = () => setModal(null);

  const handleLogout = () => {
    logout();
    closeModal();
  };

  // Cierra modales al cambiar de ruta
  useEffect(() => {
    setModal(null);
  }, [location]);

  const isAuthenticated = !!user;

  // IDs de roles
  const ROLE_LOGIST_AGENT = 2;
  const ROLE_ADMIN = 4;

  return (
    <>
      {/* ====== Layout persistente ====== */}
            <Header
        user={user}
        isAuthenticated={isAuthenticated}
        onLoginClick={() => openModal("login")}
        onProfileClick={() => openModal("profile")}
        onLogout={handleLogout}
      />
      <NavBar
        user={user}
        isLoginOpen={modal === "login"}
        onProfileClick={isAuthenticated ? () => openModal("profile") : () => openModal("login")}
      />

      {/* ====== Modales globales ====== */}
      {modal === "login" && (
        <Login
          setRegisterClick={() => openModal("register")}
          onClose={closeModal}
        />
      )}

      {modal === "register" && (
        <Register onLoginClick={() => openModal("login")} onClose={closeModal} />
      )}

      {modal === "profile" && (
        <Profile user={user} onClose={closeModal} onLogout={handleLogout} />
      )}

      {/* ====== Rutas ====== */}
      <main>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home user={user} />} />
          <Route path="/packages" element={<Package />} />
          <Route path="/news" element={<News />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
          <Route path="/verification-success" element={<VerificationSuccess />} />
          <Route path="/verification-failure" element={<VerificationFailure />} />

          {/* Extras integrados del #2 (públicos) */}
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/catalog" element={<Card />} />

          {/* Protegidas (login requerido) */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Logist Agent o Admin */}
          <Route
            path="/promotions"
            element={
              <PrivateRoute requireRoles={[ROLE_LOGIST_AGENT, ROLE_ADMIN]}>
                <Promotions />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/add-package"
            element={
              <PrivateRoute requireRoles={[ROLE_LOGIST_AGENT, ROLE_ADMIN]}>
                <AddPackage />
              </PrivateRoute>
            }
          />

          {/* Solo Admin */}
          <Route
            path="/listusers"
            element={
              <PrivateRoute requireRoles={[ROLE_ADMIN]}>
                <ListUsers />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;