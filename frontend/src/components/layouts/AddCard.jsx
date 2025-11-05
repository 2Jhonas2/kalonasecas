import { useState } from "react";
import FormCard from "./FormCard";
import "./AddCard.css";

export default function AddCard({ onCreated }) {
  const [showModal, setShowModal] = useState(false);

  // Ya no hacemos ningún POST aquí.
  // FormCard se encarga de enviar y, si todo OK,
  // nos llama con la entidad creada para que el padre refresque la lista.
  const handleSaveFromForm = (createdPlace) => {
    // Opcional: notifica al padre para refrescar cards sin recargar página
    onCreated?.(createdPlace);
    setShowModal(false);
  };

  return (
    <>
      <button className="add-card-btn" onClick={() => setShowModal(true)}>
        + Add Card
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // evita cerrar al hacer click dentro
          >
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✖
            </button>

            {/* FormCard hace el POST (multipart/form-data) y nos avisa por onSave */}
            <FormCard onClose={() => setShowModal(false)} onSave={handleSaveFromForm} />
          </div>
        </div>
      )}
    </>
  );
}