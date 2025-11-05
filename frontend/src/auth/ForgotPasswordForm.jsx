import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPasswordForm.css'; // Import the CSS file

export function ForgotPasswordForm({ onClose }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!email) {
      setError('Por favor, ingresa tu correo electrónico.');
      return;
    }

    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      setMessage(response.data.message || 'Si tu correo está registrado, recibirás un enlace para restablecer tu contraseña.');
    } catch (err) {
      console.error('Error requesting password reset:', err);
      setError(err.response?.data?.message || 'Error al solicitar el restablecimiento de contraseña.');
    }
  };

  return (
    <div className="forgot-password-modal-overlay">
      <div className="forgot-password-modal-content">
        <button
          type="button"
          onClick={onClose}
          className="forgot-password-close-btn"
        >
          ✖️
        </button>
        <h2 className="forgot-password-title">Forget Your Password</h2>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          {message && <p className="forgot-password-message">{message}</p>}
          {error && <p className="forgot-password-error">{error}</p>}

          <div className="forgot-password-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="forgot-password-submit-btn">Send link</button>
        </form>
      </div>
    </div>
  );
}