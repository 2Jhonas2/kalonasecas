import React from 'react';

/**
 * Componente Dashboard (Panel de Control).
 * Representa la página principal a la que acceden los usuarios autenticados.
 * Esta ruta está protegida y solo es accesible si el usuario ha iniciado sesión.
 * Actualmente, es un componente de marcador de posición con contenido básico.
 */
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the dashboard page. You can only see this if you are logged in.</p>
    </div>
  );
};

export default Dashboard;
