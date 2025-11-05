import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './ResetPasswordForm.css'; // Import the CSS file

export function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError('Token de restablecimiento de contraseña no encontrado en la URL.');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!token) {
      setError('No hay token de restablecimiento de contraseña.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/reset-password', {
        token,
        newPassword: password,
      });
      setMessage(response.data.message || 'Contraseña restablecida con éxito.');
      // Optionally redirect to login page after successful reset
      setTimeout(() => {
        navigate('/login'); // Assuming you have a /login route
      }, 3000);
    } catch (err) {
      console.error('Error resetting password:', err);
      setError(err.response?.data?.message || 'Error al restablecer la contraseña.');
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-content">
        <h2 className="reset-password-title">Reset Password</h2>
        <form onSubmit={handleSubmit} className="reset-password-form">
          {message && <p className="reset-password-message">{message}</p>}
          {error && <p className="reset-password-error">{error}</p>}

          {!token && error && (
            <p className="reset-password-error">{error}</p>
          )}

          {token && (
            <>
              <div className="reset-password-group">
                <label htmlFor="password">New Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>

              <div className="reset-password-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                />
              </div>

              <button type="submit" className="reset-password-submit-btn">Reset Password</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}