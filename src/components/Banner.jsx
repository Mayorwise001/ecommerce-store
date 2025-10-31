import React from "react";
import "../styles/Banner.css";
import { ShoppingBag } from "lucide-react"; // or any other icon library

const Banner = () => {

    // Smooth scroll to product section
  const scrollToProducts = () => {
    const section = document.getElementById("product-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="banner">
      <img
        src="banner5.png"
        alt="Banner"
        className="banner-image"
      />

            {/* Floating Shop Now Icon */}
      <div className="shop-now-icon" onClick={scrollToProducts}>
        <ShoppingBag size={40} />
        <span>Best Deals</span>
      </div>
    </div>
  );
};

export default Banner;
