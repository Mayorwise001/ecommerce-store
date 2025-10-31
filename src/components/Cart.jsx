// src/components/Cart.js
import React from 'react';
import { useCart } from './CartContext';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa6';
import '../styles/Cart.css'; // You will need to create this CSS file
import { Link } from "react-router-dom"; 

function Cart() {
    const { 
        cartItems, 
        cartTotal, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart 
    } = useCart();

    // Helper to format currency
    const formatCurrency = (amount) => `₦${amount.toFixed(2)}`;

    return (
        <div className="cart-page-container">
            <h2 className="cart-title">🛍️ Your Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <div className="empty-cart-message">
                    <p>Your cart is empty. Start adding some amazing products!</p>
                              <Link to="/" className='here'>
Click here
        </Link>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items-list">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item-card">
                                <div className="item-image-wrapper">
                                    <img src={item.image} alt={item.title} className="item-image" />
                                </div>
                                <div className="item-details">
                                    <h4 className="item-title">{item.title}</h4>
                                    <p className="item-price">Price: {formatCurrency(item.price)}</p>
                                    <div className="item-quantity-control">
                                        <button 
                                            onClick={() => removeItemFromCart(item.id)}
                                            aria-label="Decrease quantity"
                                        >
                                            <FaMinus />
                                        </button>
                                        <span className="item-quantity-count">{item.quantity}</span>
                                        <button 
                                            onClick={() => addItemToCart(item)}
                                            aria-label="Increase quantity"
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                    <p className="item-subtotal">
                                        Subtotal: {formatCurrency(item.price * item.quantity)}
                                    </p>
                                </div>
                                <button 
                                    className="item-remove-btn"
                                    onClick={() => clearItemFromCart(item.id)}
                                    aria-label="Remove item completely"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary-box">
                        <h3 className="summary-title">Order Summary</h3>
                        <div className="summary-line">
                            <span>Total Items:</span>
                            <span>{cartItems.reduce((count, item) => count + item.quantity, 0)}</span>
                        </div>
                        <div className="summary-line total-amount">
                            <span>Grand Total:</span>
                            <span className="total-price">{formatCurrency(cartTotal)}</span>
                        </div>
                          <Link to="/checkout" className='here'>
                        <button className="checkout-btn">Proceed to Checkout</button>

                                                    

        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;