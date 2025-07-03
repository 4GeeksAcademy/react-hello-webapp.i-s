import React from "react";
import { useContacts } from "../context/ContactContext";

const ConfirmDeleteModal = ({ contactId, onClose }) => {
  const { deleteContact } = useContacts();

  const handleDelete = async () => {
    await deleteContact(contactId);
    onClose();
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">¿Eliminar contacto?</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Esta acción no se puede deshacer.</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
