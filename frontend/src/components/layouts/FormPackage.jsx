import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormPackage.css';

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

export function FormPackage({ onClose, onPackageAdded }) {
  const [formData, setFormData] = useState({
    name_package_touristic: '',
    description_package_touristic: '',
    days_durations: '',
    price_package_touristic: '',
    id_climate: '',
    id_place_recreational: '', // Added place
  });

  const [climates, setClimates] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchData = async (endpoint, setter) => {
      try {
        const response = await axios.get(`${API_URL}/${endpoint}`);
        setter(response.data);
      } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err);
        setError(`Failed to load ${endpoint}.`);
      }
    };
    fetchData("climates", setClimates);
    fetchData("places-recreationals", setPlaces);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const payload = {
        ...formData,
        days_durations: new Date(formData.days_durations).toISOString(),
        price_package_touristic: parseInt(formData.price_package_touristic, 10),
        id_climate: parseInt(formData.id_climate, 10),
        id_place_recreational: parseInt(formData.id_place_recreational, 10),
      };

      if (Object.values(payload).some(val => val === '' || isNaN(val))) {
        setError('All fields are required.');
        setLoading(false);
        return;
      }

      await axios.post(`${API_URL}/packages-touristics`, payload);
      setSuccess('Tour package created successfully!');
      if (onPackageAdded) onPackageAdded();
      setTimeout(() => onClose(), 1500);

    } catch (err) {
      console.error('Error creating package:', err);
      setError(err.response?.data?.message || 'An error occurred while creating the package.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-package-modal-overlay">
      <div className="form-package-modal-content">
        <button type="button" className="form-package-close-btn" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit} className="form-package-form">
          <h2>Create New Tour Package</h2>
          
          {success && <p className="form-package-message success-message">{success}</p>}
          {error && <p className="form-package-message error-message">{error}</p>}

          <div className="form-package-group">
            <label htmlFor="name_package_touristic">Package Name:</label>
            <input type="text" id="name_package_touristic" name="name_package_touristic" value={formData.name_package_touristic} onChange={handleChange} required />
          </div>

          <div className="form-package-group">
            <label htmlFor="id_place_recreational">Destination:</label>
            <select id="id_place_recreational" name="id_place_recreational" value={formData.id_place_recreational} onChange={handleChange} required>
              <option value="">Select a destination</option>
              {places.map((place) => (
                <option key={place.id_place_recreational} value={place.id_place_recreational}>
                  {place.place_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-package-group">
            <label htmlFor="description_package_touristic">Description:</label>
            <textarea id="description_package_touristic" name="description_package_touristic" value={formData.description_package_touristic} onChange={handleChange} required></textarea>
          </div>

          <div className="form-package-group">
            <label htmlFor="days_durations">Duration Date:</label>
            <input type="date" id="days_durations" name="days_durations" value={formData.days_durations} onChange={handleChange} required />
          </div>

          <div className="form-package-group">
            <label htmlFor="price_package_touristic">Price:</label>
            <input type="number" id="price_package_touristic" name="price_package_touristic" value={formData.price_package_touristic} onChange={handleChange} required />
          </div>

          <div className="form-package-group">
            <label htmlFor="id_climate">Climate:</label>
            <select id="id_climate" name="id_climate" value={formData.id_climate} onChange={handleChange} required>
              <option value="">Select a climate</option>
              {climates.map((climate) => (
                <option key={climate.id_climate} value={climate.id_climate}>
                  {climate.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-package-actions">
            <button type="submit" className="form-package-submit-btn" disabled={loading}>
              {loading ? 'Creating...' : 'Create Package'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
