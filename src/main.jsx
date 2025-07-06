import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ContactProvider } from "./context/ContactContext";
import { StoreProvider } from "./hooks/useGlobalReducer";
import { router } from "./routes";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <ContactProvider>
        <RouterProvider router={router} />
      </ContactProvider>
    </StoreProvider>
  </React.StrictMode>
);
