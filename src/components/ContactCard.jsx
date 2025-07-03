import React, { useState } from "react";
import { useContacts } from "../context/ContactContext";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const ContactCard = ({ contact }) => {
  const { setSelectedContact } = useContacts();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    setSelectedContact(contact);
    navigate("/add");
  };

  return (
    <div className="card mb-2">
      <div className="card-body d-flex">
        <img src="https://i.pravatar.cc/100" className="rounded-circle me-3" alt="Avatar" />
        <div className="flex-grow-1">
          <h5>{contact.full_name}</h5>
          <p><i className="fas fa-map-marker-alt me-2"></i>{contact.address}</p>
          <p><i className="fas fa-phone me-2"></i>{contact.phone}</p>
          <p><i className="fas fa-envelope me-2"></i>{contact.email}</p>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <button className="btn btn-link text-dark" onClick={handleEdit}>
            <i className="fas fa-pencil-alt"></i>
          </button>
          <button className="btn btn-link text-danger" onClick={() => setShowModal(true)}>
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
      {showModal && (
        <ConfirmDeleteModal contactId={contact.id} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ContactCard;