import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/ProductDetails.css";
import { FaCartPlus, FaTimes, FaArrowLeft } from "react-icons/fa";
import { useCart } from "../components/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cartItems, addItemToCart, clearItemFromCart } = useCart();

  const isProductInCart = (id) => cartItems.some((item) => item.id === id);

  useEffect(() => {
    // fetch(`http://localhost:5000/api/products/${id}`)
    fetch(`https://backend-8ivf.onrender.com/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product details");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading product details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p className="error">Product not found.</p>;

  return (
    <div className="product-details-container">
      {/* ✅ Back Button */}
      <div className="back-btn-wrapper">
        <Link to="/" className="back-btn">
          <FaArrowLeft /> Back to Products
        </Link>
      </div>

      <div className="product-details-card">
        {/* ✅ Product Image */}
        <div className="product-details-image">
          <img src={product.image} alt={product.title} />

        </div>

        {/* ✅ Product Info */}
        <div className="product-details-info">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-category">
            Category: <span>{product.categories}</span>
          </p>
          <p className="product-description">{product.description}</p>
          <p className="product-description">{product.details}</p>

          <div className="product-meta">
            {/* <p className="product-price">₦{product.price.toFixed(2)}</p> */}
            <p className="product-rating">
              ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
            </p>
          </div>

          <button
            className={`cart-action-btn ${
              isProductInCart(product.id) ? "remove" : "add"
            }`}
            onClick={() =>
              isProductInCart(product.id)
                ? clearItemFromCart(product.id)
                : addItemToCart(product)
            }
          >
            {isProductInCart(product.id) ? (
              <>
                <FaTimes /> Remove from Cart
              </>
            ) : (
              <>
                <FaCartPlus /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
