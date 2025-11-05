// Card.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReservationModal from "../ReservationModal";
import "./Card.css";

const API_URL = (
  import.meta.env?.VITE_API_URL ?? "http://10.17.0.35:3000"
).replace(/\/+$/, "");

const ROLE_LOGIST_AGENT = 2;
const ROLE_ADMIN = 4;
const PLACEHOLDER_IMG = "https://via.placeholder.com/640x360?text=No+image";

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
    // escape/unescape en algunos navegadores ayuda con unicode
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
    anyUser.uid,
    anyUser?.user?.id_user,
    anyUser?.user?.id,
    anyUser?.profile?.id_user,
    anyUser?.profile?.id,
    anyUser?.data?.id, // por si tu /auth/me retorna {data:{id,...}}
    anyUser?.sub, // a veces sub es el ID en el JWT
  ];

  for (const c of candidates) {
    const n = Number(c);
    if (!Number.isNaN(n) && n > 0) return n;
  }
  return null;
}

function resolveEffectiveUser(propUser) {
  // 1) prop
  if (propUser) return propUser;

  // 2) storage
  const stored = resolveUserFromStorage();
  if (stored) return stored;

  // 3) JWT
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("access_token") ||
    localStorage.getItem("jwt") ||
    "";
  if (token) {
    const payload = decodeJwt(token);
    if (payload) {
      return {
        ...payload,
        id_user:
          payload.id_user ??
          payload.userId ??
          payload.user_id ??
          payload.uid ??
          payload.sub ?? // a veces sub = id
          undefined,
      };
    }
  }
  return null;
}

function resolveImageSrc(t) {
  const raw =
    t?.image_url ??
    t?.image ??
    t?.url_image ??
    t?.photo_url ??
    t?.cover ??
    t?.picture ??
    t?.imagePath ??
    t?.image_path ??
    null;

  if (!raw) return null;

  const val = String(raw).trim();
  if (!val || /undefined|null|\{.+\}/i.test(val)) return null;

  if (/^(https?:)?\/\//i.test(val) || /^data:|^blob:/i.test(val)) return val;
  if (val.startsWith("/")) return `${API_URL}${val}`;
  return `${API_URL}/${val}`;
}

/* ---------------- component ---------------- */
export default function Card({ user: userProp, selectedClimateId }) {
  const [tarjetas, setTarjetas] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState(new Set()); // solo IDs
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedForReservation, setSelectedForReservation] = useState(null);

  const [effectiveUser, setEffectiveUser] = useState(null);
  const [authResolving, setAuthResolving] = useState(true); // evita alert mientras resuelve user
  const [busyFav, setBusyFav] = useState(false);

  const _navigate = useNavigate();

  /* ---- resolver usuario una vez (prop > storage/JWT > /auth/me) ---- */
  useEffect(() => {
    (async () => {
      let u = userProp || resolveEffectiveUser(userProp);

      // último recurso: pregunta al backend quién soy
      if (!resolveUserId(u)) {
        const token =
          localStorage.getItem("token") ||
          localStorage.getItem("access_token") ||
          localStorage.getItem("jwt") ||
          "";
        if (token) {
          try {
            const res = await fetch(`${API_URL}/auth/me`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
              const me = await res.json();
              u = {
                ...me,
                id_user:
                  me.id_user ?? me.id ?? me.userId ?? me.user_id ?? me?.user?.id,
              };
            } else {
              console.warn("[auth/me] HTTP", res.status);
            }
          } catch (e) {
            console.warn("[auth/me] fallo", e);
          }
        }
      }

      setEffectiveUser(u || null);
      setAuthResolving(false);

      // Logs de diagnóstico (quítalos luego si quieres)
      console.log("[Card] userProp:", userProp);
      console.log("[Card] effectiveUser:", u);
      console.log("[Card] resolved userId:", resolveUserId(u));
    })();
  }, [userProp]);

  const userId = resolveUserId(effectiveUser);

  const canAddCard =
    !!effectiveUser &&
    [ROLE_LOGIST_AGENT, ROLE_ADMIN].includes(
      Number(effectiveUser?.id_role_user)
    );

  /* ---- fetch cards ---- */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/places-recreationals`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setTarjetas(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching cards:", err);
      }
    })();
  }, []);

  /* ---- fetch favorite IDs para este usuario ---- */
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const url = `${API_URL}/favorites/ids?userId=${userId}`;
        const res = await fetch(url, {
          headers: { ...getAuthHeaders() },
        });
        if (!res.ok) {
          const txt = await res.text();
          console.error("[GET /favorites/ids] HTTP", res.status, txt);
          return;
        }
        const ids = await res.json(); // p.ej. [3,7,9]
        setFavoriteIds(new Set((ids || []).map(Number)));
      } catch (err) {
        console.error("Error fetching favorite ids:", err);
      }
    })();
  }, [userId]);

  /* ---- filter by climate (front) ---- */
  const filteredTarjetas = useMemo(() => {
    if (selectedClimateId === null || selectedClimateId === undefined) {
      return tarjetas;
    }
    const selected = Number(selectedClimateId);
    return tarjetas.filter((t) => {
      const tClimate = Number(
        t?.id_climate ?? t?.id_climate_fk ?? t?.climate_id ?? t?.idClimate
      );
      return tClimate === selected;
    });
  }, [tarjetas, selectedClimateId]);

  /* ---- modal handlers ---- */
  const openModal = (tarjeta) => {
    setSelected({ ...tarjeta });
    setPreviewImage(resolveImageSrc(tarjeta) || "");
    setIsOpen(true);
    setIsEditing(false);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelected(null);
    setIsEditing(false);
    setPreviewImage("");
  };
  const openReservationModal = (tarjeta) => {
    setSelectedForReservation(tarjeta);
    setIsReservationModalOpen(true);
  };
  const closeReservationModal = () => {
    setIsReservationModalOpen(false);
    setSelectedForReservation(null);
  };

  /* ---- favorites toggle (POST/DELETE backend + UI optimista) ---- */
  const toggleFavorito = async (tarjeta) => {
    if (busyFav) return;

    if (authResolving) {
      console.log("[Card] Aún resolviendo usuario, ignoro click en favorito.");
      return;
    }

    const uid = resolveUserId(effectiveUser);
    if (!uid) {
      console.warn("[Card] No hay userId. Revisa de dónde viene el usuario.");
      alert("Debes iniciar sesión para agregar favoritos (no se pudo resolver tu ID).");
      // Opcional: navigate("/login");
      return;
    }

    const placeId = Number(tarjeta.id_place_recreational);
    const isFav = favoriteIds.has(placeId);

    // Optimista: refleja enseguida en UI
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (isFav) next.delete(placeId);
      else next.add(placeId);
      return next;
    });

    try {
      setBusyFav(true);

      if (isFav) {
        const url = `${API_URL}/favorites/${placeId}?userId=${uid}`;
        console.log("[DELETE] ->", url);
        const res = await fetch(url, {
          method: "DELETE",
          headers: { ...getAuthHeaders() },
        });
        const txt = await res.text().catch(() => "");
        console.log("[DELETE /favorites/:placeId] status:", res.status, "body:", txt);
        if (!res.ok) {
          // Si el backend devuelve 404 cuando ya no existe, lo tratamos como éxito
          if (res.status !== 404) throw new Error(`${res.status} ${txt}`);
        }
      } else {
        const url = `${API_URL}/favorites`;
        // Enviamos varios alias por compatibilidad con el DTO del backend
        const body = {
          userId: uid,
          id_place_recreational: placeId,
        };
        console.log("[POST] ->", url, body);
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify(body),
        });
        const txt = await res.text().catch(() => "");
        console.log("[POST /favorites] status:", res.status, "body:", txt);
        if (!res.ok) {
          // Trata 409 (duplicado) como éxito visual
          if (res.status !== 409) throw new Error(`${res.status} ${txt}`);
        }
      }
    } catch (err) {
      console.error("Error updating favorite:", err);

      // revertir optimismo si falló “de verdad”
      setFavoriteIds((prev) => {
        const next = new Set(prev);
        if (isFav) next.add(placeId);
        else next.delete(placeId);
        return next;
      });

      const msg = String(err?.message || "");
      if (msg.startsWith("401") || msg.startsWith("403")) {
        alert("Tu sesión expiró o no tienes permiso. Inicia sesión nuevamente.");
      } else if (msg.startsWith("422") || msg.startsWith("400")) {
        alert("Datos inválidos para el backend. Revisemos los nombres de campos.");
      } else if (msg.startsWith("404")) {
        alert("Endpoint no encontrado. Confirma la ruta /favorites en el backend.");
      } else {
        alert("No se pudo actualizar el favorito. Intenta de nuevo.");
      }
    } finally {
      setBusyFav(false);
    }
  };

  const handleFavoritoClick = (e, tarjeta) => {
    e?.stopPropagation?.();
    toggleFavorito(tarjeta);
  };

  const handleSave = () => {
    setTarjetas((prev) =>
      prev.map((t) =>
        t.id_place_recreational === selected.id_place_recreational ? selected : t
      )
    );
    setIsEditing(false);
    setIsOpen(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta card?")) return;
    try {
      const res = await fetch(`${API_URL}/places-recreationals/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setTarjetas((prev) => prev.filter((t) => t.id_place_recreational !== id));
      closeModal();
      alert("✅ Carta eliminada con éxito!");
    } catch (error) {
      console.error("Error al eliminar la carta:", error);
      alert(`❌ Error al eliminar la carta: ${error.message}`);
    }
  };

  return (
    <div>
      <div className="container-cards">
        {filteredTarjetas.map((tarjeta) => {
          const src = resolveImageSrc(tarjeta);
          const id = Number(tarjeta.id_place_recreational);
          const isFav = favoriteIds.has(id);

          return (
            <div key={id} className="cards">
              <span
                className={`favorite ${isFav ? "active" : ""}`}
                onClick={(e) => handleFavoritoClick(e, tarjeta)}
                title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
                style={{ cursor: busyFav ? "wait" : "pointer" }}
              >
                {isFav ? "★" : "☆"}
              </span>

              <img
                src={src || PLACEHOLDER_IMG}
                alt={tarjeta.place_name}
                className="img-cards"
                onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMG)}
              />

              <div className="cards-content">
                <h3 className="cards-title">{tarjeta.place_name}</h3>
                <p className="cards-description">{tarjeta.short_description}</p>
                <p className="cards-price">
                  Price: ${Number(tarjeta.price_from).toLocaleString("es-CO")}
                </p>

                <div className="card-buttons">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(tarjeta);
                    }}
                  >
                    Show more
                  </button>
                  {effectiveUser && (
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        openReservationModal(tarjeta);
                      }}
                    >
                      Reservate
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de detalle / edición */}
      {isOpen && selected && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content scrollable-modal" tabIndex={-1}>
            <button className="modal-close" onClick={closeModal}>
              ✖
            </button>

            {isEditing ? (
              <div className="edit-form">
                {previewImage && <img src={previewImage} alt="Vista previa" />}
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    value={selected.place_name}
                    onChange={(e) =>
                      setSelected({ ...selected, place_name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={selected.short_description}
                    onChange={(e) =>
                      setSelected({
                        ...selected,
                        short_description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    value={selected.price_from}
                    onChange={(e) =>
                      setSelected({ ...selected, price_from: e.target.value })
                    }
                  />
                </div>
                <button className="btn-save" onClick={handleSave}>
                  Save
                </button>
              </div>
            ) : (
              <>
                {(resolveImageSrc(selected) || PLACEHOLDER_IMG) && (
                  <img
                    src={resolveImageSrc(selected) || PLACEHOLDER_IMG}
                    alt={selected.place_name}
                    className="modal-img"
                    onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMG)}
                  />
                )}
                <h2>{selected.place_name}</h2>
                <p>{selected.short_description}</p>
                <p>
                  Price: ${Number(selected.price_from).toLocaleString("es-CO")}
                </p>

                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      openReservationModal(selected);
                      closeModal();
                    }}
                  >
                    Reservate
                  </button>

                    <button
                      className="btn btn-primary"
                      onClick={(e) => handleFavoritoClick(e, selected)}
                    >
                      {favoriteIds.has(Number(selected.id_place_recreational))
                        ? "Remove from Favorites"
                        : "Add to Favorites"}
                    </button>

                  {canAddCard && (
                    <>
                      <button
                        className="btn btn-edit"
                        onClick={() => setIsEditing(true)}
                      >
                        ✎
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() =>
                          handleDelete(selected.id_place_recreational)
                        }
                      >
                        🗑
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal de reserva */}
      {isReservationModalOpen && selectedForReservation && (
        <ReservationModal
          place={selectedForReservation}
          onClose={closeReservationModal}
        />
      )}
    </div>
  );
}