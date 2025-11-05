import React, { useState } from 'react';
import './ReservationModal.css'; // We'll create this CSS file next

export default function ReservationModal({ place, onClose }) {
  const [reserverName, setReserverName] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [reservationDate, setReservationDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would send the reservation data to your backend
    const reservationData = {
      placeId: place.id_place_recreational,
      reserverName,
      numberOfPeople,
      reservationDate,
    };
    console.log('Reservation Data:', reservationData);

    try {
      const response = await fetch('http://localhost:3000/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert('Reserva realizada con éxito!');
      console.log('Reservation successful:', result);
      onClose(); // Close modal on success
    } catch (error) {
      console.error('Error making reservation:', error);
      alert(`Error al realizar la reserva: ${error.message}`);
    }
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content scrollable-modal">
        <button className="modal-close" onClick={onClose}>
          ✖
        </button>
        <h2>Reservar: {place.place_name}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reserverName">Nombre de la persona que reserva:</label>
            <input
              type="text"
              id="reserverName"
              value={reserverName}
              onChange={(e) => setReserverName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfPeople">Para cuántas personas es:</label>
            <input
              type="number"
              id="numberOfPeople"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservationDate">Fecha de la reserva:</label>
            <input
              type="date"
              id="reservationDate"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Confirmar Reserva</button>
        </form>
      </div>
    </div>
  );
}
