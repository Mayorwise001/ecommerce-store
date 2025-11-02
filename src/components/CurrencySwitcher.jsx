import React, { useState } from "react";
import "../styles/CurrencySwitcher.css";

const CurrencySwitcher = ({ onCurrencyChange }) => {
  const [currency, setCurrency] = useState("₦");

  const handleChange = (e) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);
    if (onCurrencyChange) onCurrencyChange(selectedCurrency);
  };

  return (
    <div className="currency-switcher">
      <label htmlFor="currency" className="currency-label">
        Currency:
      </label>
      <select
        id="currency"
        value={currency}
        onChange={handleChange}
        className="currency-select"
      >
        <option value="₦">₦ NGN</option>
        <option value="$">$ USD</option>
        <option value="£">£ GBP</option>
      </select>
    </div>
  );
};

export default CurrencySwitcher;
