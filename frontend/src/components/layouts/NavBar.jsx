import React from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBolt,
  faBoxOpen,
  faMeteor,
  faStar,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

/**
 * NavBar fusionada:
 * - Desktop: lista con NavLink (activos por ruta).
 * - Mobile: barra inferior con FAB para Home, iconos laterales y botón Perfil.
 * - Filtrado por rol (Users solo Admin; Promotions Logist Agent/Admin).
 * - En anónimo: solo Home, Packages, News (y oculto Favorites).
 *
 * Props:
 *  - onProfileClick: () => void
 *  - isLoginOpen?: boolean
 *  - user?: { id_role_user?: number }
 */
const NavBar = ({ onProfileClick, isLoginOpen = false, user }) => {
  // Roles
  const ROLE_TRAVELER = 1;
  const ROLE_LOGIST_AGENT = 2;
  const ROLE_ADMIN_PLACE = 3;
  const ROLE_ADMIN = 4;

  // Catálogo base de links (rutas canónicas)
  const allLinks = [
    { name: "Home", icon: faHouse, path: "/" },
    { name: "Packages", icon: faBoxOpen, path: "/packages" },
    { name: "Promotions", icon: faBolt, path: "/promotions" },
    { name: "Favorites", icon: faStar, path: "/favorites" },
    { name: "News", icon: faMeteor, path: "/news" },
    { name: "Users", icon: faUsers, path: "/listusers" },
  ];

  // Filtrado por autenticación/rol
  const filteredLinks = allLinks.filter((link) => {
    // Público (no autenticado): Home, Packages, News
    if (!user) {
      return ["/", "/packages", "/news"].includes(link.path);
    }

    // Por rol:
    if (link.path === "/listusers") {
      return user.id_role_user === ROLE_ADMIN;
    }
    if (link.path === "/promotions") {
      return (
        user.id_role_user === ROLE_LOGIST_AGENT ||
        user.id_role_user === ROLE_ADMIN
      );
    }

    // Favorites visible solo si hay usuario
    if (link.path === "/favorites") return true;

    // Resto visibles para autenticados
    return true;
  });

  return (
    <>
      {/* ===== Desktop ===== */}
      <div className="container desktop-navbar">
        <nav className="navbar">
          <ul className="nav-links">
            {filteredLinks.map((link) => (
              <li key={link.name} className="nav-link">
                <NavLink
                  to={link.path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  end={link.path === "/"}
                  aria-label={link.name}
                  title={link.name}
                >
                  <FontAwesomeIcon icon={link.icon} style={{ marginRight: 8 }} />
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ===== Mobile / Tablet ===== */}
      <div className="mobile-navbar">
        <nav className="bottom-nav">
          {/* Laterales (sin Home: va como FAB) */}
          {filteredLinks
            .filter((l) => l.name !== "Home")
            .map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `nav-icon ${isActive ? "active" : ""}`
                }
                aria-label={link.name}
                title={link.name}
                end={link.path === "/"}
              >
                <FontAwesomeIcon icon={link.icon} />
              </NavLink>
            ))}

          {/* Perfil (FAB central) */}
          <button
            id="mobileUserIcon"
            className={`fab-button ${isLoginOpen ? "active" : ""}`} // Usar estilos de FAB
            onClick={onProfileClick}
            aria-label="Perfil de usuario"
            title="Perfil"
            type="button"
          >
            <FontAwesomeIcon icon={faUser} />
          </button>

          {/* Home (ahora lateral) */}
          <NavLink
            to="/"
            className={({ isActive }) => `nav-icon ${isActive ? "active" : ""}`} // Usar estilos de icono lateral
            aria-label="Home"
            title="Home"
            end
          >
            <FontAwesomeIcon icon={faHouse} />
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
