import React, { useEffect, useState } from "react";
import { useContacts } from "../context/ContactContext";
import { useNavigate, Link } from "react-router-dom";

const AddContact = () => {
  const { createContact, updateContact, selectedContact, setSelectedContact } = useContacts();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedContact) {
      setForm({
        name: selectedContact.name || "",
        email: selectedContact.email || "",
        phone: selectedContact.phone || "",
        address: selectedContact.address || "",
      });
    } else {
      setForm({ name: "", email: "", phone: "", address: "" });
    }
  }, [selectedContact]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    let success;
    if (selectedContact) {
      success = await updateContact(selectedContact.id, form);
      setSelectedContact(null);
    } else {
      success = await createContact(form);
    }

    if (success) {
      navigate("/contacts");
    } else {
      setError("Error saving contact. Please check the data and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">{selectedContact ? "Edit contact" : "Add a new contact"}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {["name", "email", "phone", "address"].map((field) => (
        <div key={field} className="mb-3">
          <input
            type="text"
            className="form-control"
            name={field}
            placeholder={`Enter ${field}`}
            value={form[field]}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit" className="btn btn-primary w-100 mb-2">
        Save
      </button>
      <div className="text-center">
        <Link to="/contacts" className="text-muted">
          or get back to contacts
        </Link>
      </div>
    </form>
  );
};

export default AddContact;
