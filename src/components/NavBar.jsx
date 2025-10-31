import React, { useState, useEffect } from "react";
import { Search, ShoppingCart,Heart, Home, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import { useCart } from "../components/CartContext.js";
import { useWishlist } from "../components/WishlistContext.jsx";

const Navbar = () => {
  const [placeholder, setPlaceholder] = useState("Search for anything...");
  const [products, setProducts] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // ✅ Theme state

  const { cartItems, cartCount, setSearchTerm } = useCart();
  const { wishlistItems } = useWishlist();

  // ✅ Fetch all products for suggestions
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  // ✅ Update placeholder based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 140) {
        setPlaceholder("");
      } else {
        setPlaceholder("Search for anything...");
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Handle search input changes
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredSuggestions([]);
    } else {
      const matches = products.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
      setFilteredSuggestions(matches.slice(0, 5));
    }
  };

  // ✅ Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo-link">
          <h2 className="navbar-logo">Salford & Co</h2>
        </Link>
      </div>

      <div className="navbar-center">
        <div className="search-container">
          <input
            type="text"
            className="navbar-search"
            placeholder={placeholder}
            onChange={handleSearchChange}
          />
          <Search className="search-icon" />

          {filteredSuggestions.length > 0 && (
            <ul className="search-suggestions">
              {filteredSuggestions.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/product/${item.id}`}
                    onClick={() => setFilteredSuggestions([])}
                    className="search-suggestion-item"
                  >
                    <img src={item.image} alt={item.title} />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="navbar-right">
        {/* 🏠 Home */}
        <Link to="/" className="navbar-logo-link">
          <Home className="nav-icon" />
        </Link>

        {/* ❤️ Wishlist */}
        <Link to="/wishlist" className="navbar-logo-link wishlist-link">
          <div className="wishlist-wrapper">
            <Heart className="nav-icon" />
            {wishlistItems.length > 0 && (
              <span className="wishlist-count">{wishlistItems.length}</span>
            )}
          </div>
        </Link>
                 {/* 🌙 Theme toggle */}
        <button className="theme-toggle-btn" onClick={toggleDarkMode}>
          {darkMode ? <Sun className="nav-icon" /> : <Moon className="nav-icon" />}
        </button>

        {/* 🛒 Cart */}
        <Link to="/cart" className="cart-link">
          <div className="cart-wrapper">
            <ShoppingCart className="nav-icon" />
            {cartItems.length > 0 && (
              <span className="cart-count">
                {cartCount || cartItems.length}
              </span>
            )}
          </div>
        </Link>


      </div>
    </nav>
  );
};

export default Navbar;
