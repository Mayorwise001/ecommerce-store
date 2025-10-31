// src/components/CartContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify"; // ✅ import toast
import "react-toastify/dist/ReactToastify.css"; // ✅ import styles

// Create the context
const CartContext = createContext();

// ✅ Provider component
export const CartProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Global search state

  // ✅ Load cart from localStorage initially
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ✅ Sync cart with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add product or increase its quantity
  const addItemToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // 🔔 Item already exists — increase quantity
        toast.info(`➕ Increased quantity of "${product.title}"`, {
          position: "top-center",
          autoClose: 1500,
        });
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 🔔 New item added
        toast.success(`✅ Added "${product.title}" to Cart!`, {
          position: "top-center",
          autoClose: 1500,
        });
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // ✅ Remove or decrease quantity
  const removeItemFromCart = (id) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);

      if (existingItem && existingItem.quantity > 1) {
        // 🔔 Decrease quantity
        toast.warning(`➖ Decreased quantity of "${existingItem.title}"`, {
          position: "top-center",
          autoClose: 1500,
        });
        return prevItems.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        // 🔔 Item removed completely
        toast.error(`❌ Removed "${existingItem.title}" from Cart!`, {
          position: "top-center",
          autoClose: 1500,
        });
        return prevItems.filter((item) => item.id !== id);
      }
    });
  };

  // ✅ Remove item entirely
  const clearItemFromCart = (id) => {
    setCartItems((prevItems) => {
      const removedItem = prevItems.find((item) => item.id === id);
      toast.error(`🗑️ Deleted "${removedItem?.title}" from Cart`, {
        position: "top-center",
        autoClose: 1500,
      });
      return prevItems.filter((item) => item.id !== id);
    });
  };

  // ✅ Completely clear cart after checkout
  const clearCartAfterCheckout = () => {
    setCartItems([]); // clear state
    localStorage.removeItem("cartItems"); // clear saved cart
    toast.success("🎉 Cart cleared after checkout!", {
      position: "top-center",
      autoClose: 1500,
    });
  };

  // ✅ Calculate totals
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartTotal,
        cartCount,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        clearCartAfterCheckout, // ✅ exposed for checkout page
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom hook
export const useCart = () => useContext(CartContext);
