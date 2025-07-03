import React, { createContext, useContext, useState, useEffect } from 'react';

const ContactContext = createContext();
const API_URL = "https://playground.4geeks.com/contact/";

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const agendaSlug = "isabel_agenda";

  const getContacts = async () => {
    const res = await fetch(`${API_URL}agendas/${agendaSlug}`);
    const data = await res.json();
    setContacts(data.contacts || []);
  };

  const createContact = async (contact) => {
    await fetch(`${API_URL}contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...contact, agenda_slug: agendaSlug }),
    });
    getContacts();
  };

  const updateContact = async (id, contact) => {
    await fetch(`${API_URL}contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...contact, agenda_slug: agendaSlug }),
    });
    getContacts();
  };

  const deleteContact = async (id) => {
    await fetch(`${API_URL}contacts/${id}`, {
      method: "DELETE"
    });
    getContacts();
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ContactContext.Provider value={{
      contacts,
      selectedContact,
      setSelectedContact,
      createContact,
      updateContact,
      deleteContact
    }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => useContext(ContactContext);
