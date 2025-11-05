import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListUsers.css';

// UserModal Component
const UserModal = ({ show, onClose, user, onSave, onDelete }) => {
  const [formData, setFormData] = useState(user || {});
  const [documentTypes, setDocumentTypes] = useState([]);

  useEffect(() => {
    setFormData(user || {});
  }, [user]);

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/types-documents");
        setDocumentTypes(response.data);
      } catch (error) {
        console.error("Error fetching document types:", error);
      }
    };
    fetchDocumentTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to save these changes?')) {
      onSave(formData);
    }
  };

  const handleDelete = () => {
    if (formData.id_user && window.confirm('Are you sure you want to delete this user?')) {
      onDelete(formData.id_user);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{user ? 'Edit User' : 'Add User'}</h2>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Names:
            <input type="text" name="name_user" value={formData.name_user || ''} onChange={handleChange} required />
          </label>
          <label>
            Last Names:
            <input type="text" name="lastname_user" value={formData.lastname_user || ''} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email_user" value={formData.email_user || ''} onChange={handleChange} disabled/>
          </label>
          <label>
            Role ID:
            <select name="id_role_user" value={formData.id_role_user || ''} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="1">Traveler</option>
              <option value="2">Logist Agent</option>
              <option value="3">Admin Place</option>
              <option value="4">Admin</option>
            </select>
          </label>
          <div className="modal-actions">
            {user && (
              <button type="button" className="actionButton delete" onClick={handleDelete}>
                Delete
              </button>
            )}
            <button type="submit" className="actionButton accept">
              {user ? 'Accept Changes' : 'Add User'}
            </button>
            <button type="button" className="actionButton cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;