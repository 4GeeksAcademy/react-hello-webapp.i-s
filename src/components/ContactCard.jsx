import React from "react";
import { useContacts } from "../context/ContactContext"; // ajusta si tu carpeta es distinta

const ContactCard = ({ contact, onEdit }) => {
  const { deleteContact } = useContacts();

  const handleDelete = () => {
    if (confirm(`¿Seguro que quieres eliminar a ${contact.name}?`)) {
      deleteContact(contact.id);
    }
  };

  return (
    <div className="card mb-3 col-md-4">
      <div className="card-body">
        <h5 className="card-title">{contact.name}</h5>
        <p className="card-text">
          <strong>Email:</strong> {contact.email} <br />
          <strong>Phone:</strong> {contact.phone} <br />
          <strong>Address:</strong> {contact.address}
        </p>
        <button className="btn btn-primary me-2" onClick={() => onEdit(contact)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
