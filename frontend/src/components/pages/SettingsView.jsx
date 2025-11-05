import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const SettingsView = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutAllDevices = async () => {
    if (window.confirm('Are you sure you want to log out from all other devices?')) {
      try {
        const token = localStorage.getItem('token');
        // Assuming a new backend endpoint for this functionality
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout-all`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Logged out from all other devices successfully!');
        // Optionally, log out from the current device as well, or just navigate away
        logout(); // Log out from current device
        navigate('/login'); // Redirect to login page
      } catch (error) {
        console.error('Error logging out from all devices:', error);
        alert('Failed to log out from all devices. Please try again.');
      }
    }
  };

  return (
    <div className="settings-view">
      <h1>Settings</h1>
      <p>Here you can manage your account settings.</p>

      <button onClick={handleLogoutAllDevices} className="btn-logout-all">
        Log out from all other devices
      </button>

      {/* Add other settings options here */}
    </div>
  );
};

export default SettingsView;