import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListUsers.css";
import UserModal from "./UserModal";

// Usa la MISMA base que el resto del front.
// ⚠️ Cambia VITE_API_URL en .env si usas otra IP/puerto.
// Ej.: VITE_API_URL=http://10.17.0.35:3000
const API_URL = (import.meta.env?.VITE_API_URL || "http://10.17.0.35:3000").replace(/\/$/, "");

// Roles (ajusta si tus IDs son distintos)
const ROLE_TRAVELER = 1;
const ROLE_LOGIST_AGENT = 2;
const ROLE_ADMIN_PLACE = 3;
const ROLE_ADMIN = 4;

// Placeholder para fotos
const AVATAR_PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='128' height='128'>
      <rect width='100%' height='100%' fill='#e9ecf3'/>
      <text x='50%' y='52%' dominant-baseline='middle' text-anchor='middle'
        font-family='Segoe UI, Arial' font-size='18' fill='#5a6b87'>Sin foto</text>
    </svg>`
  );

// Resuelve URLs relativas/absolutas de imagen
function resolveImage(url) {
  if (!url) return null;
  const v = String(url).trim();
  if (!v) return null;
  // absoluta o data/blob
  if (/^(https?:)?\/\//i.test(v) || /^data:|^blob:/i.test(v)) return v;
  // backend relativo (/uploads/...)
  if (v.startsWith("/")) return `${API_URL}${v}`;
  // valor suelto (por si guardaste sin slash inicial)
  return `${API_URL}/${v}`;
}

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [filterRole, setFilterRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRoleName = (roleId) => {
    switch (Number(roleId)) {
      case ROLE_TRAVELER:
        return "Traveler";
      case ROLE_LOGIST_AGENT:
        return "LogistAgents";
      case ROLE_ADMIN_PLACE:
        return "AdminPlace";
      case ROLE_ADMIN:
        return "Admin";
      default:
        return "Unknown";
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // 👇 ¡NO uses localhost aquí!
      const { data } = await axios.get(`${API_URL}/users`, {
        // headers: { Authorization: `Bearer ${token}` } si hace falta
      });
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // filtrar por rol
  useEffect(() => {
    if (filterRole) {
      setFilteredUsers(users.filter((u) => Number(u.id_role_user) === Number(filterRole)));
    } else {
      setFilteredUsers(users);
    }
  }, [users, filterRole]);

  const handleOpenModal = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  const handleSaveUser = async (userData) => {
    try {
      if (userData.id_user) {
        await axios.patch(`${API_URL}/users/${userData.id_user}`, userData);
      } else {
        await axios.post(`${API_URL}/users`, userData);
      }
      await fetchUsers();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Error saving user. Check console for details.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/users/${userId}`);
      await fetchUsers();
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user. Check console for details.");
    }
  };

  const handleFilterChange = (roleId) => setFilterRole(roleId);

  if (loading) {
    return (
      <section className="listUsers">
        <h1 className="titleListUsers">Lista de Usuarios</h1>
        <p style={{ opacity: 0.7 }}>Cargando...</p>
      </section>
    );
  }

  return (
    <>
      <section className="listUsers">
        <h1 className="titleListUsers">Lista de Usuarios</h1>

        <div className="userActions">
          <button className="actionButton add" onClick={() => handleOpenModal(null)}>
            Add User
          </button>
          <button className="actionButton filter" onClick={() => handleFilterChange(null)}>
            All Users
          </button>
          <button className="actionButton filter" onClick={() => handleFilterChange(ROLE_TRAVELER)}>
            Travelers
          </button>
          <button className="actionButton filter" onClick={() => handleFilterChange(ROLE_LOGIST_AGENT)}>
            Logist Agents
          </button>
          <button className="actionButton filter" onClick={() => handleFilterChange(ROLE_ADMIN_PLACE)}>
            Admin Places
          </button>
          <button className="actionButton filter" onClick={() => handleFilterChange(ROLE_ADMIN)}>
            Admins
          </button>
        </div>

        <div className="user-cards-container">
          {filteredUsers.map((user) => {
            const src = resolveImage(user.photo_user) || AVATAR_PLACEHOLDER;
            return (
              <div
                className="user-card"
                key={user.id_user}
                onClick={() => handleOpenModal(user)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleOpenModal(user)}
              >
                <div className="user-card-photo">
                  <img
                    src={src}
                    alt={`${user.name_user} ${user.lastname_user || ""}`}
                    onError={(e) => (e.currentTarget.src = AVATAR_PLACEHOLDER)}
                  />
                </div>
                <div className="user-card-name">
                  {user.name_user} {user.lastname_user}
                  <div className="user-card-role">{getRoleName(user.id_role_user)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <UserModal
        show={showModal}
        onClose={handleCloseModal}
        user={currentUser}
        onSave={handleSaveUser}
        onDelete={handleDeleteUser}
      />
    </>
  );
}