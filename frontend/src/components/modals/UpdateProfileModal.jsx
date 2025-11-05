import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../layouts/ListUsers.css'; // Reusing some styles
import ReactDOM from 'react-dom'; // Import ReactDOM

const UpdateProfileModal = ({ user, show, onClose, onSave }) => {
  const [formData, setFormData] = useState(user || {});
  const [documentTypes, setDocumentTypes] = useState([]); // New state

  useEffect(() => {
    setFormData(user || {});
  }, [user]);

  // New useEffect to fetch document types
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
  }, []); // Empty dependency array to run only once on mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert number_document and id_type_document to numbers
    if (name === 'number_document' || name === 'id_type_document') {
      setFormData((prevData) => ({ ...prevData, [name]: Number(value) }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to update your profile?')) {
      onSave(formData);
    }
  };

  if (!show) {
    return null;
  }

  return ReactDOM.createPortal( // Use createPortal
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Edit Profile</h2>
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
            <input type="email" name="email_user" value={formData.email_user || ''} onChange={handleChange} required 
            />
          </label>
          <label>
            Document Number:
            <input type="number" name="number_document" value={formData.number_document || ''} onChange={handleChange} required />
          </label>
          <label>
            Document Type:
            <select name="id_type_document" value={formData.id_type_document || ''} onChange={handleChange} required>
              <option value="">Select Document Type</option>
              {documentTypes.map(type => (
                <option key={type.id_type_document} value={type.id_type_document}>
                  {type.document_name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Direction:
            <input type="text" name="direction_user" value={formData.direction_user || ''} onChange={handleChange} />
          </label>
          <label>
            Date of Birth:
            <input type="date" name="date_birth" value={formData.date_birth ? formData.date_birth.split('T')[0] : ''} onChange={handleChange} />
          </label>
          <div className="modal-actions">
            <button type="submit" className="actionButton accept">
              Save Changes
            </button>
            <button type="button" className="actionButton cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body // Render into document.body
  );
};

export default UpdateProfileModal;
