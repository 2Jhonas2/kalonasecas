// Favorites.jsx (Refactored)
import { useEffect, useState } from "react";
import "./Favorites.css";

const API_URL = (
  import.meta.env?.VITE_API_URL || "http://10.17.0.35:3000"
).replace(/\/$/, "");
const PLACEHOLDER_IMG = "https://via.placeholder.com/800x500?text=Place";

/* ---------------- helpers ---------------- */
const getAuthHeaders = () => {
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("access_token") ||
    localStorage.getItem("jwt") ||
    "";
  return token ? { Authorization: `Bearer ${token}` } : {};
};

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function decodeJwt(token) {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decodeURIComponent(escape(json)));
  } catch {
    return null;
  }
}

function resolveUserFromStorage() {
  const keys = ["user", "authUser", "profile", "currentUser"];
  for (const k of keys) {
    const raw = localStorage.getItem(k);
    const u = raw ? safeParse(raw) : null;
    if (u) return u;
  }
  return null;
}

function resolveUserId(anyUser) {
  if (!anyUser) return null;
  const candidates = [
    anyUser.id_user,
    anyUser.id,
    anyUser.userId,
    anyUser.user_id,
    anyUser.sub,
  ];
  for (const c of candidates) {
    const n = Number(c);
    if (!Number.isNaN(n) && n > 0) return n;
  }
  return null;
}

function resolveEffectiveUser() {
  const stored = resolveUserFromStorage();
  if (stored) return stored;

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("access_token") ||
    localStorage.getItem("jwt") ||
    "";
  if (token) {
    return decodeJwt(token);
  }
  return null;
}

const formatPrice = (v) =>
  v == null || v === ""
    ? ""
    : `$${Number(v).toLocaleString("es-CO", { maximumFractionDigits: 0 })}`;

function mapPlace(p) {
  if (!p) return null;
  return {
    id: p.id_place_recreational ?? p.id,
    backendId: p.id_place_recreational,
    titulo: p.place_name ?? "Sin título",
    descripcion: p.short_description || p.direction || "Sin descripción",
    imagen: p.image_url || p.image || PLACEHOLDER_IMG,
    precio: p.price_from != null ? Number(p.price_from) : undefined,
  };
}

/* ---------------- component ---------------- */
export default function Favorites() {
  const [userId, setUserId] = useState(null);
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // ---- 1. Resolve user on mount ----
  useEffect(() => {
    const u = resolveEffectiveUser();
    const id = resolveUserId(u);
    setUserId(id);
    if (!id) {
      setErr("Inicia sesión para ver tus favoritos.");
      setLoading(false);
    }
  }, []);

  // ---- 2. Fetch favorites from backend when user is resolved ----
  useEffect(() => {
    if (!userId) return;

    const fetchFavorites = async () => {
      setLoading(true);
      setErr("");
      try {
        // Step A: Get favorite IDs
        const idsRes = await fetch(`${API_URL}/favorites/ids?userId=${userId}`, {
          headers: getAuthHeaders(),
        });

        if (!idsRes.ok) {
          const errorText = await idsRes.text();
          throw new Error(
            `No se pudieron obtener los IDs de favoritos: ${idsRes.status} ${errorText}`
          );
        }

        const favoriteIds = await idsRes.json();
        if (!Array.isArray(favoriteIds) || favoriteIds.length === 0) {
          setItems([]);
          setLoading(false);
          return;
        }

        // Step B: Get full details for each favorite place
        const placePromises = favoriteIds.map(async (id) => {
          try {
            const placeRes = await fetch(
              `${API_URL}/places-recreationals/${id}`
            );
            if (!placeRes.ok) return null; // Skip if a single place fails
            const placeData = await placeRes.json();
            return mapPlace(placeData);
          } catch {
            return null; // Skip on network error for a single place
          }
        });

        const settledPlaces = await Promise.all(placePromises);
        setItems(settledPlaces.filter(Boolean)); // Filter out any nulls

      } catch (e) {
        console.error("Error loading favorites:", e);
        setErr("Error al cargar favoritos. Intenta recargar la página.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  // ---- 3. Handle favorite removal ----
  const eliminarFavorito = async (backendId) => {
    if (!userId || !backendId) return;

    const idNum = Number(backendId);

    // Optimistic UI update
    setItems((prev) => prev.filter((it) => Number(it.backendId) !== idNum));

    // Backend request
    try {
      const res = await fetch(
        `${API_URL}/favorites/${idNum}?userId=${userId}`,
        {
          method: "DELETE",
          headers: getAuthHeaders(),
        }
      );

      if (!res.ok && res.status !== 404) {
        // Revert optimistic update if deletion fails for a reason other than "not found"
        console.error("Failed to delete favorite, reverting UI.");
        // Re-fetch to get the true state
        const u = resolveEffectiveUser();
        const id = resolveUserId(u);
        setUserId(id);
      }
    } catch (e) {
      console.error("Error deleting favorite:", e);
      // Re-fetch to get the true state
      const u = resolveEffectiveUser();
      const id = resolveUserId(u);
      setUserId(id);
    }
  };

  // ---- Modal handlers ----
  const openModal = (item) => {
    setSelected(item);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelected(null);
  };

  const empty = !loading && items.length === 0;

  return (
    <div className="favorites-container">
      <h1>Mis Favoritos</h1>

      {loading && <div className="favorites-status">Cargando…</div>}
      {err && <div className="favorites-error">{err}</div>}
      {empty && (
        <div className="favorites-empty">
          <h2>No tienes favoritos aún 😢</h2>
          <p>Marca con ★ tus paquetes favoritos para verlos aquí.</p>
        </div>
      )}

      {!loading && !err && items.length > 0 && (
        <div className="favorites-grid">
          {items.map((it) => (
            <div
              key={it.id}
              className="favorite-card"
              onClick={() => openModal(it)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && openModal(it)}
            >
              <img
                src={it.imagen}
                alt={it.titulo}
                className="favorite-img"
                onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMG)}
              />
              <div className="favorite-content">
                <h4>{it.titulo}</h4>
                <p>{it.descripcion}</p>
                {it.precio != null && <p>Precio: {formatPrice(it.precio)}</p>}
                <button
                  className="btn-delete-fav"
                  onClick={(e) => {
                    e.stopPropagation();
                    eliminarFavorito(it.backendId);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && selected && (
        <div
          className="card-modal-overlay"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="card-modal-content"
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
          >
            <button
              className="card-modal-close"
              onClick={closeModal}
              aria-label="Cerrar"
            >
              ✖
            </button>
            <img
              src={selected.imagen}
              alt={selected.titulo}
              className="card-modal-img"
              onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMG)}
            />
            <h2 className="card-modal-title">{selected.titulo}</h2>
            <p className="card-modal-description">{selected.descripcion}</p>
            {selected.precio != null && (
              <p className="card-modal-price">
                Precio: {formatPrice(selected.precio)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
