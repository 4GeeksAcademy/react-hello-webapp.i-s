import React from "react";
import { useNavigate } from "react-router-dom";
import { useContacts } from "../context/ContactContext";
import ContactCard from "../components/ContactCard";

const Contact = () => {
  const { contacts } = useContacts();
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-end mb-3">
        <button onClick={() => navigate("/add")} className="btn btn-success">
          Add new contact
        </button>
      </div>
      {contacts.map(contact => (
        <ContactCard key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default Contact;