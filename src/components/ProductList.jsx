import React, { useEffect, useState } from "react";
import "../styles/ProductList.css";
import { FaCartPlus, FaTimes } from "react-icons/fa";
import { useCart } from "../components/CartContext";
import { useWishlist } from "./WishlistContext"; // ✅ Wishlist context
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Toast
import "react-toastify/dist/ReactToastify.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ NEW: Category state
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { cartItems, addItemToCart, clearItemFromCart, searchTerm } = useCart();
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();

  // ✅ FIXED: Use _id for MongoDB-based products
  const isProductInCart = (id) => cartItems.some((item) => item._id === id);
  const isInWishlist = (id) => wishlistItems.some((w) => w._id === id);

  useEffect(() => {
    // ✅ Fetch from your backend API instead of fakestoreapi
    fetch("https://backend-8ivf.onrender.com/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        // ✅ Your backend returns { message, count, products: [...] }
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ✅ NEW: Define available categories (you can replace these with your actual ones)
  const categories = [
    "All",
    "Laptops",
    "Accessories",
    "Gaming",
    "Electronics",
  ];

  // ✅ Combine search + category filter
  const visibleProducts = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.categories?.some((c) =>
        c.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" ||
      p.categories?.some(
        (c) => c.toLowerCase() === selectedCategory.toLowerCase()
      );

    return matchesSearch && matchesCategory;
  });

  if (loading)
    return (
      <div className="deal-grid">
        {[...Array(8)].map((_, index) => (
          <div className="deal-card skeleton" key={index}>
            <div className="deal-img-wrapper skeleton-box"></div>
            <div className="deal-info">
              <p className="skeleton-line title"></p>
              <p className="skeleton-line price"></p>
            </div>
          </div>
        ))}
      </div>
    );

  if (error) return <p className="error">Error: {error}</p>;

  return (
    <>
      {/* ✅ CATEGORY FILTER BUTTONS */}
      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* ✅ PRODUCTS DISPLAY */}
      <div className="deal-grid">
        {visibleProducts.map((p) => (
          <div className="deal-card-wrapper" key={p._id}>
            <Link to={`/product/${p._id}`} className="deal-card">
              <div className="deal-img-wrapper">
                <img src={p.image} alt={p.title} loading="lazy" />
              </div>
            </Link>

            <div className="deal-info">
              <p className="deal-title">{p.name}</p>
              <p className="deal-title">{p.title}</p>

              <div className="product-rating">
                {p.rating && p.rating.rate ? (
                  <>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`star ${
                          i < Math.round(p.rating.rate) ? "filled" : ""
                        }`}
                      >
                        ★
                      </span>
                    ))}
                    <span className="rating-value">
                      {p.rating.rate.toFixed(1)}
                    </span>
                    <span className="rating-count">
                      ({p.rating.count || 0})
                    </span>
                  </>
                ) : (
                  <>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className="star filled">
                        ★
                      </span>
                    ))}
                    <span className="rating-value">5.0</span>
                    <span className="rating-count">(10)</span>
                  </>
                )}
              </div>

              <div className="price-cart">
                <p className="deal-price">₦{p.price?.toFixed(2)}</p>

                {/* 🛒 CART BUTTON */}
                {/* <button
                  className="cart-btn"
                  onClick={() =>
                    isProductInCart(p._id)
                      ? clearItemFromCart(p._id)
                      : addItemToCart(p)
                  }
                  aria-label={
                    isProductInCart(p._id)
                      ? "Remove from cart"
                      : "Add to cart"
                  }
                >
                  {isProductInCart(p._id) ? (
                    <FaTimes className="cart-icon remove" />
                  ) : (
                    <FaCartPlus className="cart-icon add" />
                  )}
                </button> */}

                {/* 🛒 CART BUTTON */}
<button
  className="cart-btn"
  onClick={() => {
    const product = { ...p, id: p._id }; // ✅ normalize MongoDB _id → id

    if (isProductInCart(product.id)) {
      clearItemFromCart(product.id); // ✅ Remove product if already in cart
    } else {
      addItemToCart(product); // ✅ Add new product
    }
  }}
  aria-label={
    isProductInCart(p._id) ? "Remove from cart" : "Add to cart"
  }
>
  {isProductInCart(p._id) ? (
    <FaTimes className="cart-icon remove" />
  ) : (
    <FaCartPlus className="cart-icon add" />
  )}
</button>


                {/* 🧡 WISHLIST BUTTON */}
                {/* <button
                  className="wishlist-btn"
                  onClick={() => {
                    if (isInWishlist(p._id)) {
                      removeFromWishlist(p._id);
                      toast.error("💔 Removed from Wishlist!", {
                        position: "top-center",
                        autoClose: 1500,
                      });
                    } else {
                      addToWishlist(p);
                      toast.success("🧡 Added to Wishlist!", {
                        position: "top-center",
                        autoClose: 1500,
                      });
                    }
                  }}
                >
                  <span
                    style={{
                      color: isInWishlist(p._id) ? "orange" : "lightgray",
                      fontSize: "1.3rem",
                      transition: "color 0.3s ease, transform 0.2s ease",
                    }}
                  >
                    {isInWishlist(p._id) ? "🧡" : "🤍"}
                  </span>
                </button> */}
                {/* 🧡 WISHLIST BUTTON */}
<button
  className="wishlist-btn"
  onClick={() => {
    // normalize product id so context can read it
    const product = { ...p, id: p._id };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.error("💔 Removed from Wishlist!", {
        position: "top-center",
        autoClose: 1500,
      });
    } else {
      addToWishlist(product);
      toast.success("🧡 Added to Wishlist!", {
        position: "top-center",
        autoClose: 1500,
      });
    }
  }}
>
  <span
    style={{
      color: isInWishlist(p._id) ? "orange" : "lightgray",
      fontSize: "1.3rem",
      transition: "color 0.3s ease, transform 0.2s ease",
    }}
  >
    {isInWishlist(p._id) ? "🧡" : "🤍"}
  </span>
</button>

              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductList;
