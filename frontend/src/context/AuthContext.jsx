import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import axios from "axios";

const AuthContext = createContext(null);

/** Helpers */
const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

const b64urlToJson = (seg = "") => {
  try {
    const base64 = seg.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return {};
  }
};

const decodeJwt = (token) => {
  const [, payload] = (token || "").split(".");
  return b64urlToJson(payload); // { userId, email, iat, exp, ... }
};

const getApiBase = () =>
  (import.meta?.env?.VITE_API_URL || "").toString().replace(/\/$/, "") || "/api";

/** Carga detalles del usuario desde el backend (enriquece con rol, foto, etc.) */
const fetchUserById = async (id) => {
  if (!id) return null;
  const base = getApiBase();
  const url = base === "/api" ? `/api/users/${id}` : `${base}/users/${id}`;
  const { data } = await axios.get(url);
  return data ?? null;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);     // objeto usuario completo (cuando lo tenemos)
  const [loading, setLoading] = useState(true); // arranque / rehidratación
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  /** Rehidratación desde localStorage */
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");

        setAuthHeader(token);

        if (token) {
          // Intentamos enriquecer con /users/:id
          const { userId, email } = decodeJwt(token);
          try {
            const fullUser = await fetchUserById(userId);
            if (fullUser) {
              localStorage.setItem("user", JSON.stringify(fullUser));
              setUser(fullUser);
              // Limpieza de claves legacy si existían
              localStorage.removeItem("userEmail");
              localStorage.removeItem("userName");
              localStorage.removeItem("userPhoto");
              return;
            }
          } catch {
            // Si no existe endpoint o falla, hacemos un fallback mínimo
          }

          // Fallback mínimo (compatible con versión 1)
          const legacyEmail = localStorage.getItem("userEmail");
          const legacyName = localStorage.getItem("userName");
          const legacyPhoto = localStorage.getItem("userPhoto");
          if (legacyEmail || email) {
            const minimal = {
              email_user: (legacyEmail || email || "").toLowerCase(),
              name_user: legacyName || "Usuario",
              photo_user:
                legacyPhoto ||
                "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png",
            };
            localStorage.setItem("user", JSON.stringify(minimal));
            setUser(minimal);
            return;
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /** Login unificado (acepta token solo o token+user) */
  const login = async (email, password) => {
    const base = getApiBase();
    const url = base === "/api" ? `/api/auth/login` : `${base}/auth/login`;

    const res = await axios.post(url, {
      email: (email || "").trim().toLowerCase(),
      password,
    });

    const token = res?.data?.token || res?.data?.access_token;
    const incomingUser = res?.data?.user || null;

    if (!token) throw new Error("Invalid credentials");

    // Persist token + header
    localStorage.setItem("token", token);
    setAuthHeader(token);

    let finalUser = incomingUser;

    // Si el backend no envía el user, lo intentamos obtener por /users/:id
    if (!finalUser) {
      try {
        const { userId } = decodeJwt(token);
        finalUser = await fetchUserById(userId);
      } catch {
        // fallback mínimo con email conocido
        finalUser = {
          email_user: (email || "").trim().toLowerCase(),
          name_user: "Usuario",
          photo_user:
            "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png",
        };
      }
    }

    // Persist user
    localStorage.setItem("user", JSON.stringify(finalUser));
    // Limpieza de claves legacy (si existían)
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhoto");

    setUser(finalUser);

    // Devolvemos ambos para máxima compatibilidad con código existente
    return { token, user: finalUser };
  };

  const triggerUserRefresh = () => setRefreshTrigger(prev => prev + 1);

  /** Permite actualizar el objeto usuario y persistirlo */
  const refreshUser = (updatedUser) => {
    if (!updatedUser) return;
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    triggerUserRefresh();
  };

  /** Logout limpio */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // por si quedan restos legacy:
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhoto");
    setAuthHeader(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, login, logout, refreshUser, loading, isLoading: loading, refreshTrigger, triggerUserRefresh }),
    [user, loading, refreshTrigger]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);