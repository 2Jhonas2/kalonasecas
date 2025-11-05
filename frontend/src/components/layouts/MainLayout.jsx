import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import NavBar from '../layouts/NavBar';
import { Login } from '../../auth/Login';
import { Register } from '../../auth/Register';
import Profile from '../layouts/Profile';
import { useAuth } from '../../context/AuthContext';

/**
 * Componente MainLayout.
 * Este componente actúa como un layout principal para la mayoría de las páginas de la aplicación.
 * Incluye el Header, NavBar y Footer, y gestiona la lógica de modales de autenticación
 * (Login, Register, Profile) que son comunes a varias partes de la aplicación.
 * Los componentes de página específicos se renderizan como `children`.
 * @param {object} props Las propiedades del componente.
 * @param {React.ReactNode} props.children Los componentes hijos que se renderizarán dentro del layout.
 */
const MainLayout = ({ children }) => {
  const [modal, setModal] = useState(null); // 'login', 'register', 'profile'
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Close modal on route change
    setModal(null);
  }, [location]);

  const handleLogout = () => {
    logout();
    setModal(null); // Close profile modal on logout
  };

  const openModal = (modalName) => {
    setModal(modalName);
  };

  const closeModal = () => {
    setModal(null);
  };

  const isAuthenticated = !!user;

  const handleProfileClick = () => {
    const targetModal = isAuthenticated ? 'profile' : 'login';
    if (modal === targetModal) {
      closeModal();
    } else {
      openModal(targetModal);
    }
  };

  return (
    <>
      <Header
        user={user}
        onLoginClick={() => openModal('login')}
        isAuthenticated={isAuthenticated}
        onProfileClick={() => openModal('profile')}
        onLogout={handleLogout}
      />
      <NavBar
        onProfileClick={handleProfileClick}
        isLoginOpen={modal === 'login'}
      />

      {modal === 'login' && (
        <Login
          setRegisterClick={() => openModal('register')}
          onClose={closeModal}
          onLoginSuccess={() => setModal(null)} // Close login modal on success
        />
      )}

      {modal === 'register' && (
        <Register
          onLoginClick={() => openModal('login')}
          onClose={closeModal}
        />
      )}

      {modal === 'profile' && (
        <Profile
          user={user}
          onClose={closeModal}
          onLogout={handleLogout}
        />
      )}

      {/* Renderiza los componentes hijos (el contenido específico de la página). */}
      {children}

      <Footer />
    </>
  );
};

export default MainLayout;
