import React, { useState } from 'react';
import '../styles/paymentSettlement.css';

const PaymentSettlement = ({ fetchedReservation }) => {
  const [damagesPrice, setDamagesPrice] = useState('');
  const [totalPrice, setTotalPrice] = useState(fetchedReservation.totalPrice);
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCVV] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleDamagesPriceChange = (e) => {
    const value = e.target.value;
    // Validate if the input is a number
    if (!isNaN(value) || value === '') {
      const newDamagesPrice = value === '' ? 0 : parseFloat(value);
      setDamagesPrice(newDamagesPrice);
      // Update the total price including damages
      setTotalPrice(parseFloat(fetchedReservation.totalPrice) + newDamagesPrice);
    }
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value.slice(0, 12));
  };

  const handleCVVChange = (e) => {
    setCVV(e.target.value.slice(0, 3));
  };

  const handleExpirationDateChange = (e) => {
    setExpirationDate(e.target.value);
  };

  const handleSubmitPayment = () => {
    // Placeholder function for handling payment
    console.log('Payment submitted. Deposit will be refunded.');
  };

  return (
    <div className="payment-settlement-container">
      <h3>Payment Settlement</h3>
      <div className="damages-price-input">
        <label htmlFor="damages-price">Damages Price $:</label>
        <input
          type="text"
          id="damages-price"
          value={damagesPrice}
          onChange={handleDamagesPriceChange}
        />
      </div>
      <div>
        <p>Total Price:<h3>${totalPrice}</h3> </p>
      </div>
      <div className="payment-details">
        <label htmlFor="card-number">Card Number:</label>
        <input
          type="text"
          id="card-number"
          value={cardNumber}
          onChange={handleCardNumberChange}
          maxLength={12}
        />
        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          value={cvv}
          onChange={handleCVVChange}
          maxLength={3}
        />
        <label htmlFor="expiration-date">Expiration Date:</label>
        <input
          type="text"
          id="expiration-date"
          value={expirationDate}
          onChange={handleExpirationDateChange}
        />
      </div>
      <strong>By submitting this payment, your deposit will be automatically refunded.</strong>
      <div>      
        <button className="submit-payment-btn" onClick={handleSubmitPayment}>Submit Payment</button>
    </div>
    </div>
  );
};

export default PaymentSettlement;
