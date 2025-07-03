import React, { useEffect, useState } from "react";
import { useContacts } from "../context/ContactContext";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const { createContact, updateContact, selectedContact, setSelectedContact } = useContacts();
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", address: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedContact) {
      setForm(selectedContact);
    }
  }, [selectedContact]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (selectedContact) {
      await updateContact(selectedContact.id, form);
      setSelectedContact(null);
    } else {
      await createContact(form);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">{selectedContact ? "Edit contact" : "Add a new contact"}</h2>
      {['full_name', 'email', 'phone', 'address'].map(field => (
        <div key={field} className="mb-3">
          <input
            type="text"
            className="form-control"
            name={field}
            placeholder={`Enter ${field.replace("_", " ")}`}
            value={form[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit" className="btn btn-primary w-100 mb-2">save</button>
      <div className="text-center">
        <a href="/" className="text-muted">or get back to contacts</a>
      </div>
    </form>
  );
};

export default AddContact;
