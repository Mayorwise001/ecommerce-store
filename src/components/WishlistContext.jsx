// src/components/WishlistContext.js
import React, { createContext, useContext, useEffect, useState } from "react";

// ✅ Create Context
const WishlistContext = createContext();

// ✅ Custom hook for easy access
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // ✅ Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlistItems");
    if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist));
  }, []);

  // ✅ Save to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // ✅ Add item
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) return prev; // Prevent duplicates
      return [...prev, product];
    });
  };

  // ✅ Remove item
  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem("wishlistItems");
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
