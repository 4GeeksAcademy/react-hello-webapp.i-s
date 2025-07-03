import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContactProvider } from "./context/ContactContext";
import Contact from "./views/Contact";
import AddContact from "./views/AddContact";

function App() {
  return (
    <ContactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Contact />} />
          <Route path="/add" element={<AddContact />} />
        </Routes>
      </Router>
    </ContactProvider>
  );
}

export default App;