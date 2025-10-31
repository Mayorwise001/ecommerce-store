import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import ProductList from "./components/ProductList";
import "./App.css";
import Navbar from "./components/NavBar";
import { CartProvider } from "./components/CartContext";
import Cart from "./components/Cart";
import CheckoutPage from "./components/CheckoutPage";
import ProductDetails from "./components/ProductDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Don’t forget this import
import { WishlistProvider } from "./components/WishlistContext";
import Wishlist from "./components/Wishlist";
import MainLayout from "./layouts/MainLayout";
import SupportWidget from "./components/SupportWidget";

function App() {
  return (
    // **1. CartProvider for global state**

    <CartProvider>
      <WishlistProvider>
      {/* **2. BrowserRouter to enable routing context** */}
      <BrowserRouter>
        {/* **3. Toast container available globally (outside Routes)** */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />

        {/* **4. Components visible on ALL pages** */}
        <Navbar />

        <Banner />

        {/* **5. Routes to handle page navigation** */}
        <Routes>
          <Route element={<MainLayout />}>
       

          <Route
            path="/"
            element={
              <div id="product-section">
                <ProductList />
              </div>
            }
          />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<Wishlist/>} />

          {/* Catch-all 404 route */}
          <Route path="*" element={<div>404 Not Found</div>} />
      </Route>
        </Routes>
          <SupportWidget />
      </BrowserRouter>
       </WishlistProvider>
    </CartProvider>
  );
}

export default App;
