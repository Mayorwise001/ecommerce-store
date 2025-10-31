// src/components/Wishlist.js
import React from "react";
import { useWishlist } from "./WishlistContext";
import "../styles/Wishlist.css";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-container">
        <h2>❤️ Your Wishlist</h2>
        <p>No items yet. Browse and add your favorites!</p>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2>❤️ Your Wishlist</h2>
      <button className="clear-wishlist-btn" onClick={clearWishlist}>
        Clear Wishlist
      </button>
      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div key={item.id} className="wishlist-item">
            <img src={item.image} alt={item.title} />
            <h4>{item.title.substring(0, 40)}</h4>
            <p>₦{item.price.toLocaleString()}</p>
            <div className="wishlist-actions">
              <button
                className="remove-btn"
                onClick={() => removeFromWishlist(item.id)}
              >
                ❌ Remove
              </button>
              <button
                className="view-btn"
                onClick={() => (window.location.href = `/product/${item.id}`)}
              >
                🔍 View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
