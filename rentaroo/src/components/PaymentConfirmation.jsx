import React from 'react';
import '../styles/ConfirmationPage.css';

const PaymentConfirmation = ({reservationDetails}) => {
  if (!reservationDetails) {
    return <div>No reservation details found.</div>;
  }
  // Calculate the damages price
  const damagesPrice = reservationDetails.finalPrice - reservationDetails.totalPrice;


  return (
    <div className="confirmation-container">
      <h1>Thank You! Payment Confirmed</h1>
      <p>Thank you, <b>{reservationDetails.fullName}</b>, for your payment. Your payment has been successfully confirmed.</p>
      <p>Your payment details:</p>
      <ul>
        <li>Rental Price: ${reservationDetails.totalPrice}</li>
        <li>Damages: ${damagesPrice}</li>
        <li>Total Price: ${reservationDetails.finalPrice}</li> 
        <li>Timestamp: {new Date().toLocaleString()}</li>
      </ul>
    </div>
  );
};

export default PaymentConfirmation;