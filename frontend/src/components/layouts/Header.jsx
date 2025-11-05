import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * Header (encabezado) con:
 * - Logo animado enlazado a Home
 * - Buscador (desktop + móvil)
 * - Botón/área de perfil:
 *    - Si está autenticado: muestra nombre y avatar y dispara onProfileClick
 *    - Si no: botón que dispara onLoginClick (con id="userIcon" para detección de click-afuera)
 *
 * Props:
 *  - onLoginClick: () => void
 *  - query?: string
 *  - onQueryChange?: (v: string) => void
 *  - onSubmit?: () => void
 *  - user?: { name_user?: string; photo_user?: string }
 *  - isAuthenticated?: boolean
 *  - onProfileClick?: () => void
 *  - onLogout?: () => void  // (reservado para futuras mejoras UI)
 */

// helper para construir la URL de la foto de usuario
const buildImageUrl = (photoPath) => {
  if (!photoPath) return null;

  const isAbsolute = /^https?:\/\//i.test(photoPath);
  const base = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, ""); // quita barras extra

  // arma URL absoluta si es relativa
  const url = isAbsolute
    ? photoPath
    : `${base}/${photoPath.replace(/^\/+/, "")}`;

  // cache-buster para evitar imágenes cacheadas
  return `${url}?t=${Date.now()}`;
};

const Header = ({
  onLoginClick,
  query = "",
  onQueryChange = () => {},
  onSubmit = () => {},
  user,
  isAuthenticated,
  onProfileClick,
  // onLogout, // no se renderiza por ahora
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSubmit();
  };

  const placeholder =
    "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png";

  const avatar = buildImageUrl(user?.photo_user) || placeholder;
  const displayName = user?.name_user || user?.email_user || "Perfil";

  return (
    <>
      {/* ===== Header (desktop) ===== */}
      <section className="header-section">
        <header className="header-container">
          {/* Logo */}
          <div className="logo-container" aria-label="Logo Kalon Itinere">
            <div className="logo-stage" aria-hidden="true">
              <div className="logo-brand">
                <Link to="/" className="logo-link" aria-label="Ir al inicio">
                  <div className="brand-wrap">
                    <span className="logo-title-primary">Kalon</span>
                    <span className="logo-title-secondary">Itinere</span>

                    <svg
                      className="road"
                      viewBox="0 0 300 24"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M 6 12 C 80 2, 200 22, 294 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 6 12 C 80 2, 200 22, 294 12"
                        fill="none"
                        stroke="rgba(255,255,255,.85)"
                        strokeWidth="2"
                        strokeDasharray="10 10"
                        strokeLinecap="round"
                      />
                    </svg>

                    <div className="car" aria-hidden="true">
                      <FontAwesomeIcon icon={faCarSide} />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Buscador (desktop) */}
          <div className="search-bar">
            <div className="search-container">
              <input
                type="search"
                placeholder="What are you looking for? (e.g. school desks)"
                aria-label="Buscar"
                className="input-search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="search-icon"
                onClick={onSubmit}
                aria-label="Buscar"
                title="Buscar"
                type="button"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Perfil */}
          <div className="profile-wrapper" style={{ position: "relative" }}>
            {isAuthenticated && user ? (
              <div
                id="userIcon"
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: 10,
                }}
                onClick={onProfileClick}
                title="Abrir perfil"
                aria-label="Abrir perfil de usuario"
              >
                <span className="profile-name" aria-hidden={!user?.name_user}>
                  {displayName}
                </span>
                <img
                  src={avatar}
                  alt={`Avatar de ${displayName}`}
                  width={40}
                  height={40}
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = placeholder;
                  }}
                />
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                aria-label="Perfil de usuario"
                title="Perfil"
                className="button-profile"
                id="userIcon"
                type="button"
              >
                <svg
                  className="icon-medium"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 21a7.5 7.5 0 0 1 13 0" />
                </svg>
              </button>
            )}
          </div>
        </header>
      </section>

      {/* ===== Buscador (móvil) ===== */}
      <section>
        <div className="mobile-search-bar">
          <div className="search-container">
            <input
              type="search"
              placeholder="Search"
              aria-label="Buscar"
              className="input-search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="search-icon"
              onClick={onSubmit}
              aria-label="Buscar"
              type="button"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;