// src/components/Checkout.js
import React, { useState } from "react";
import { useCart } from "./CartContext";
import "../styles/CheckoutPage.css";

const Checkout = () => {
  const { cartItems, cartTotal, clearCartAfterCheckout } = useCart();
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  // ✅ Coupon states
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");

  // ✅ Handle coupon apply
  const handleApplyCoupon = (e) => {
    e.preventDefault();

    const code = couponCode.trim().toUpperCase();

    // ✅ Example coupons (you can add more)
    const coupons = {
      SUMMER10: 10,
      WELCOME5: 5,
      SALE20: 20,
    };

    if (coupons[code]) {
      setDiscountPercent(coupons[code]);
      setDiscountMessage(`✅ ${coupons[code]}% discount applied!`);
    } else {
      setDiscountPercent(0);
      setDiscountMessage("❌ Invalid coupon code.");
    }
  };

  // ✅ Calculate total after discount
  const discountedTotal =
    discountPercent > 0
      ? cartTotal - (cartTotal * discountPercent) / 100
      : cartTotal;

  // ✅ Handle checkout confirmation
  const handleSubmit = (e) => {
    e.preventDefault();

    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 5);
    setDeliveryDate(estimatedDate.toDateString());

    const newOrderNumber = "ORD" + Math.floor(Math.random() * 1000000);
    setOrderNumber(newOrderNumber);

    setOrderConfirmed(true);
  };

  // ✅ Empty cart view
  if (cartItems.length === 0 && !orderConfirmed) {
    return (
      <div className="checkout-container">
        <h2 className="checkout-title">Checkout</h2>
        <p className="empty-checkout">
          Your cart is empty. Add items before checking out.
        </p>
      </div>
    );
  }

  // ✅ Order confirmation screen
  if (orderConfirmed) {
    return (
      <div className="checkout-container">
        <div className="order-confirmed">
          <h2>✅ Order Confirmed!</h2>
          <p>
            Thank you for shopping with <strong>Salford & Co</strong>.
          </p>
          <p className="order-number">Order Number: {orderNumber}</p>

          <div className="order-details">
            <h3>Items Ordered:</h3>
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <span>{item.title.substring(0, 40)}</span>
                  <span>₦{item.price.toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <p>
              <strong>Total:</strong> ₦{discountedTotal.toLocaleString()}
            </p>
            <p className="delivery-estimate">
              Estimated Delivery: {deliveryDate}
            </p>
          </div>

          <div className="confirmation-buttons">
            <button
              className="home-btn"
              onClick={() => {
                localStorage.removeItem("cartItems");
                if (typeof clearCartAfterCheckout === "function") {
                  clearCartAfterCheckout();
                }
                window.location.href = "/";
              }}
            >
              🏠 Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Default checkout view
  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-content">
        {/* === ORDER SUMMARY === */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="checkout-item">
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>₦{item.price.toLocaleString()}</p>
                  <span>Qty: {item.quantity}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* ✅ Coupon Section */}
          <div className="coupon-section">
            <form onSubmit={handleApplyCoupon}>
              <label>Have a coupon?</label>
              <div className="coupon-input">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button type="submit" className="apply-coupon-btn">
                  Apply
                </button>
              </div>
            </form>
            {discountMessage && (
              <p
                className={`discount-message ${
                  discountPercent > 0 ? "success" : "error"
                }`}
              >
                {discountMessage}
              </p>
            )}
          </div>

          {/* ✅ Show totals */}
          <div className="checkout-total">
            <strong>Subtotal:</strong> ₦{cartTotal.toLocaleString()}
          </div>
          {discountPercent > 0 && (
            <div className="checkout-discount">
              <strong>Discount ({discountPercent}%):</strong> -₦
              {((cartTotal * discountPercent) / 100).toLocaleString()}
            </div>
          )}
          <div className="checkout-total final-total">
            <strong>Total:</strong> ₦{discountedTotal.toLocaleString()}
          </div>
        </div>

        {/* === CHECKOUT FORM === */}
        <div className="checkout-form">
          <h3>Shipping & Payment Information</h3>
          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" required />

            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" required />

            <label>Phone Number</label>
            <input type="tel" placeholder="Enter your phone number" required />

            <label>Delivery Address</label>
            <textarea placeholder="Enter your full address" required></textarea>

            <label>Payment Method</label>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="delivery"
                  defaultChecked
                />{" "}
                Pay on Delivery
              </label>
              <label>
                <input type="radio" name="payment" value="card" /> Pay with Card
              </label>
              <label>
                <input type="radio" name="payment" value="transfer" /> Bank
                Transfer
              </label>
            </div>

            <button type="submit" className="checkout-btn">
              Confirm Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
