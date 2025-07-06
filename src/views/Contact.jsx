import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactContext";
import ContactCard from "../components/ContactCard";

const Contact = () => {
  const { contacts, deleteContact, setSelectedContact } = useContacts();
  const navigate = useNavigate();

  const [showConfirm, setShowConfirm] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    navigate("/contacts/add");
  };

  const confirmDelete = (contact) => {
    setContactToDelete(contact);
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    if (contactToDelete) {
      await deleteContact(contactToDelete.id);
      setShowConfirm(false);
      setContactToDelete(null);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Contact List</h2>
        <button
          onClick={() => {
            setSelectedContact(null);
            navigate("/contacts/add");
          }}
          className="btn btn-success"
        >
          Add new contact
        </button>
      </div>

      {contacts.length === 0 && <p>No contacts found. Add some!</p>}

      <div className="row">
        {Array.isArray(contacts) &&
          contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={() => handleEdit(contact)}
              onDelete={() => confirmDelete(contact)}
            />
          ))}
      </div>

      {showConfirm && (
        <div
          className="modal show fade"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{contactToDelete?.name}</strong>?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
