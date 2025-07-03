import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className="container mt-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
