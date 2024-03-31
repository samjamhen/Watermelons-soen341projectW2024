import React from 'react';
import '../styles/ConfirmationPage.css';
import { useState, useEffect } from 'react';

const PaymentConfirmation = ({reservationDetails}) => {
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    updatedReservation();
  })

  if (!reservationDetails) {
    return <div>No reservation details found.</div>;
  }

  const updatedReservation = async () => {
    try{
      const response = await fetch(`api/reservations/${reservationDetails._id}`)
      if(response.ok){
        const json = await response.json();
        setReservation(json);
      }
      else{
        throw new Error('Failed to fetch reservation');
      }
    }catch(error){
      console.error('Error fetching reservation')
    }
  }

  // Calculate the damages price
  const damagesPrice = reservationDetails.finalPrice - reservationDetails.rentalPrice;


  return (
    <div className="confirmation-container">
      <h1>Thank You! Payment Confirmed</h1>
      <p>Thank you, <b>{reservationDetails.fullName}</b>, for your payment. Your payment has been successfully confirmed.</p>
      <p>Your payment details:</p>
      <ul>
        <li>Damages: {reservation?.newDamages}</li>
        <li>Additional Features: {reservation?.additionalFeatures}</li>
        <li>Rental Price: ${reservation?.rentalPrice}</li>
        <li>Additional Feature Price: ${reservation?.additionalFeaturesPrice}</li>
        <li>Total Price: ${reservation?.finalPrice}</li>
        <li>Timestamp: {new Date().toLocaleString()}</li>
      </ul>
    </div>
  );
};

export default PaymentConfirmation;