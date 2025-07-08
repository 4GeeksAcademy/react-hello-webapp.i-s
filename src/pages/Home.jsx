// src/pages/Home.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/contacts");
  }, []);

  return null;
};
