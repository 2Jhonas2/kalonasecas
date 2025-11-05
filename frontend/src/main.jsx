/**
 * Punto de entrada principal de la aplicación React.
 * Configura el renderizado de la aplicación en el DOM y envuelve el componente principal
 * con proveedores de contexto y enrutamiento necesarios.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Componente principal de la aplicación.
import { BrowserRouter } from 'react-router-dom'; // Proveedor de enrutamiento para la aplicación.
import { AuthProvider } from './context/AuthContext'; // Proveedor de contexto para la autenticación.

// Renderiza la aplicación React en el elemento DOM con id 'root'.
ReactDOM.createRoot(document.getElementById('root')).render(
  // `React.StrictMode` activa comprobaciones adicionales y advertencias para sus descendientes.
  <React.StrictMode>
    {/* `BrowserRouter` habilita el enrutamiento basado en el historial del navegador. */}
    <BrowserRouter>
      {/* `AuthProvider` proporciona el contexto de autenticación a toda la aplicación. */}
      <AuthProvider>
        {/* El componente principal de la aplicación. */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);