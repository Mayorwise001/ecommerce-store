// src/components/Breadcrumbs.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Breadcrumbs.css"; // Import CSS

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="breadcrumb-container">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">
            Home
          </Link>
        </li>

        {pathnames.map((value, index) => {
          // ✅ NEW: If path includes "product", redirect link to homepage
          const to =
            value.toLowerCase() === "product"
              ? "/"
              : `/${pathnames.slice(0, index + 1).join("/")}`;

          const isLast = index === pathnames.length - 1;
          const label = decodeURIComponent(value.replace(/-/g, " "));

          return (
            <li key={to} className="breadcrumb-item">
              <span className="breadcrumb-separator">›</span>
              {isLast ? (
                <span className="breadcrumb-current">{label}</span>
              ) : (
                <Link to={to} className="breadcrumb-link">
                  {/* ✅ Replace “product” text with Home */}
                  {label.toLowerCase() === "product" ? "Product" : label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
