import React from 'react';
import './Modal.css';

const Modal = ({ children, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      {React.cloneElement(children, { onClick: (e) => e.stopPropagation() })}
    </div>
  );
};

export default Modal;
