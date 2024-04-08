import React, { useEffect, useState } from 'react';
import '../styles/ConfirmationPage.css';


const Confirmation = ({reservationDetails}) => {
  const [reservation , setReservation] = useState()
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
        <li>Additional Features: {reservation?.additionalFeatures}</li>
        <li>Rental Price: ${reservation?.rentalPrice}</li>
        <li>Additional Feature Price: ${reservation?.additionalFeaturesPrice}</li>
        <li>Total Price: {reservation?.totalPrice}</li>
      </ul>
      <p>You can view all your reservations in the "My Reservations" tab in your account.</p>
    </div>
  );
};

export default Confirmation;
