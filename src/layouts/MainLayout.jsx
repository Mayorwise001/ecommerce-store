// src/layouts/MainLayout.js
import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import Navbar from "../components/NavBar";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full p-4">
        <Breadcrumbs />
        <Outlet /> {/* This renders the current page */}
      </div>

    </div>
  );
};

export default MainLayout;
