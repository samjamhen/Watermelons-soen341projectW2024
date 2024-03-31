import React from 'react';
import '../styles/ConfirmationPage.css';


const Confirmation = ({reservationDetails}) => {
  if (!reservationDetails) {
    return <div>No reservation details found.</div>;
  }

  return (
    <div className="confirmation-container">
      <h1>Reservation Confirmed!</h1>
      <p>Thank you, <b>{reservationDetails.fullName}</b>, for booking with us.</p>
      <p>Your reservation details:</p>
      <ul>
        <li>Car: {reservationDetails.vehicle}</li>
        <li>Pick-up Date: {new Date(reservationDetails.pickupDate).toLocaleDateString()}</li>
        <li>Return Date: {new Date(reservationDetails.returnDate).toLocaleDateString()}</li>
        <li>Total Price: {reservationDetails.totalPrice}</li>
      </ul>
      <p>You can view all your reservations in the "My Reservations" tab in your account.</p>
    </div>
  );
};

export default Confirmation;
