import React from 'react';
import '../styles/ConfirmationPage.css';

const PaymentConfirmation = ({reservationDetails}) => {
  if (!reservationDetails) {
    return <div>No reservation details found.</div>;
  }

  return (
    <div className="confirmation-container">
      <h1>Thank You! Payment Confirmed</h1>
      <p>Thank you, <b>{reservationDetails.fullName}</b>, for your payment. Your payment has been successfully confirmed.</p>
      <p>Your payment details:</p>
      <ul>
        <li>Rental Price: ${reservationDetails.TotalPrice}</li>
        {/* <li>Damages: ${reservationDetails.damages}</li> */}
        {/* <li>Total Price: ${reservationDetails.updatedPrice}</li> */} 
        <li>Timestamp: {new Date().toLocaleString()}</li>
      </ul>
    </div>
  );
};

export default PaymentConfirmation;