import React, { createContext, useContext, useState, useEffect } from "react";

const ContactContext = createContext();

const AGENDA_SLUG = "isabel";
const API_BASE = "https://playground.4geeks.com/contact";
const API_CONTACTS_LIST = `${API_BASE}/agendas/${AGENDA_SLUG}/contacts`;
const API_CONTACTS = `${API_BASE}/agendas/${AGENDA_SLUG}/contacts`;

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const getContacts = async () => {
    try {
      const res = await fetch(API_CONTACTS_LIST, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Error fetching contacts: ${res.statusText}`);
      const data = await res.json();
      console.log("🟢 Contacts fetched raw:", data);

      if (Array.isArray(data)) {
        setContacts(data);
      } else if (data.contacts && Array.isArray(data.contacts)) {
        setContacts(data.contacts);
      } else if (data.results && Array.isArray(data.results)) {
        setContacts(data.results);
      } else {
        setContacts([]);
        console.warn("⚠️ Estructura inesperada en datos de contactos");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setContacts([]);
    }
  };

  const createContact = async (contact) => {
    console.log("🟡 Enviando contacto:", contact);
    try {
      const res = await fetch(API_CONTACTS_LIST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        console.error("🔴 Error creando contacto:", responseData);
        return false;
      }

      console.log("🟢 Contacto creado correctamente:", responseData);
      await getContacts();
      return true;
    } catch (error) {
      console.error("🔴 Error creando contacto:", error);
      return false;
    }
  };

  const updateContact = async (id, contact) => {
    try {
      const res = await fetch(`${API_CONTACTS}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address,
          agenda_slug: AGENDA_SLUG,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        console.error("Error updating contact:", responseData);
        return false;
      }

      await getContacts();
      return true;
    } catch (error) {
      console.error("Error updating contact:", error);
      return false;
    }
  };

  const deleteContact = async (id) => {
    try {
      const res = await fetch(`${API_CONTACTS}/${id}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Error deleting contact:", errorData);
        return false;
      }

      await getContacts();
      return true;
    } catch (error) {
      console.error("Error deleting contact:", error);
      return false;
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ContactContext.Provider
      value={{
        contacts,
        selectedContact,
        setSelectedContact,
        createContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => useContext(ContactContext);
