import { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';
import { faPen, faRightFromBracket, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UpdateProfileModal from '../modals/UpdateProfileModal';

// --- Helper consistente para construir la URL de imagen ---
const buildImageUrl = (photoPath) => {
  if (!photoPath) return null;

  const isAbsolute = /^https?:\/\//i.test(photoPath);
  const base = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, ''); // sin "/" al final

  const url = isAbsolute
    ? photoPath
    : `${base}/${photoPath.replace(/^\/+/, '')}`;

  // cache-buster para que se reflejen cambios de inmediato
  return `${url}?t=${Date.now()}`;
};

const Profile = ({ user, onClose, onLogout }) => {
  const { refreshUser } = useAuth();
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

  // placeholder común
  const PLACEHOLDER = '/src/assets/default-avatar.png'; // ajusta si en build usas /assets/...
  // si en producción no sirves /src, cambia a algo público final como '/assets/default-avatar.png'

  const handleLogout = () => {
    onLogout();
    onClose();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // --- Validaciones en cliente ---
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Please select a JPEG, PNG, or WEBP image.");
      return;
    }

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSizeInBytes) {
      alert("File is too large. The maximum size is 2MB.");
      return;
    }
    // --------------------------------

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `/api/users/${user.id_user}/photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log("Response data from photo update:", response.data);
      // Refresca el user global con la nueva ruta de la foto
      refreshUser(response.data);
    } catch (error) {
      console.error("Error updating photo:", error);
      const message = error.response?.data?.message || "Failed to update photo.";
      const detailedMessage = Array.isArray(message) ? message.join('\n') : message;
      alert(detailedMessage);
    }
  };

  const handleClickUpdatePhoto = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showUpdateProfileModal) return;

      const clickedOutside =
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !e.target.closest("#userIcon") &&     // header (desktop)
        !e.target.closest("#mobileUserIcon"); // navbar (móvil)

      if (clickedOutside) onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, showUpdateProfileModal]);

  const handleUpdateProfile = async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `/api/users/${user.id_user}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response data from profile update:", response.data);
      refreshUser(response.data);
      setShowUpdateProfileModal(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error("Error updating profile:", error);
      const message = error.response?.data?.message || "Failed to update profile.";
      const detailedMessage = Array.isArray(message) ? message.join('\n') : message;
      alert(detailedMessage);
    }
  };

  const getRoleName = (roleId) => {
    switch (roleId) {
      case 1: return "Traveler";
      case 2: return "LogistAgents";
      case 3: return "AdminPlace";
      case 4: return "Admin";
      default: return "Unknown";
    }
  };

  // URL de imagen consistente
  const imageUrl = buildImageUrl(user?.photo_user) || PLACEHOLDER;

  return (
    <div className='modalProfile' ref={modalRef}>
      <h1 className='modalProfileTittle'><strong>Bienveido de nuevo, {user?.name_user}</strong></h1>
      {user && (
        <div>
          <div className='photoContainer'>
            <img
              src={imageUrl}
              alt={user.name_user}
              className='photoProfile'
              referrerPolicy="no-referrer"
              onError={(e) => { e.currentTarget.src = PLACEHOLDER; }}
            />
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleClickUpdatePhoto(); }}
              className='updatePhotoButton'
              aria-label="Actualizar foto de perfil"
              title="Actualizar foto"
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
          </div>

          <p className='labelProfile'><strong>Email:</strong> <span className='emailDisplay'>{user.email_user}</span></p>
          <p className='labelProfile'><strong>Name:</strong> {user.name_user}</p>
          <p className='labelProfile'><strong>Last Name:</strong> {user.lastname_user}</p>
          {user.id_role_user && (
            <p className='labelProfile'><strong>Role:</strong> {getRoleName(user.id_role_user)}</p>
          )}

          <input
            className='fileInput'
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>
      )}

      <div className='buttonsContainer'>
        <button
          className='buttonUpdateData'
          onClick={() => setShowUpdateProfileModal(true)}
          aria-label="Editar datos de perfil"
          title="Editar perfil"
        >
          <FontAwesomeIcon icon={faUserEdit} />
        </button>
        <button
          className='buttonLogout'
          onClick={handleLogout}
          aria-label="Cerrar sesión"
          title="Cerrar sesión"
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>

      <UpdateProfileModal
        user={user}
        show={showUpdateProfileModal}
        onClose={() => setShowUpdateProfileModal(false)}
        onSave={handleUpdateProfile}
      />
    </div>
  );
};

export default Profile;