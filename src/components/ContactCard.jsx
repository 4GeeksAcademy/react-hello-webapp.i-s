import React from "react";

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="card mb-3 col-md-4">
      <div className="card-body">
        <h5 className="card-title">{contact.name}</h5>
        <p className="card-text">
          <strong>Email:</strong> {contact.email} <br />
          <strong>Phone:</strong> {contact.phone} <br />
          <strong>Address:</strong> {contact.address}
        </p>
        <button className="btn btn-primary me-2" onClick={onEdit}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
