import React, { useState } from "react";
import Carousel from "../layouts/Carousel";
import Card from "../layouts/Card";
import AddCard from "../layouts/AddCard"; // Importamos el componente perfeccionado
import { AddPackage } from "../layouts/AddPackage"; // Importar AddPackage

/**
 * Home:
 * - Muestra carrusel de categorías y cards filtradas por categoría.
 * - Botón para añadir nuevas cards (controlado por rol).
 *
 * Props:
 *  - user?: { id_role_user?: number }
 */
function Home({ user }) {
  const [selectedClimateId, setSelectedClimateId] = useState(null);

  // IDs de roles que pueden añadir tarjetas
  const ROLE_LOGIST_AGENT = 2;
  const ROLE_ADMIN = 4;

  // Verificamos si el usuario tiene el rol permitido
  const canAddCard = user && [ROLE_LOGIST_AGENT, ROLE_ADMIN].includes(user.id_role_user);

  return (
    <>
      {/* Carrusel de categorías */}
      <Carousel
        selectedId={selectedClimateId}
        onSelect={(id) => setSelectedClimateId(id)}
      />

      {/* Cards filtradas por climateId */}
      <Card selectedClimateId={selectedClimateId} />

      {/* Botón para añadir Card (Solo para roles autorizados) */}
      {canAddCard && <AddCard />}
    </>
  );
}

export default Home;
export { Home };