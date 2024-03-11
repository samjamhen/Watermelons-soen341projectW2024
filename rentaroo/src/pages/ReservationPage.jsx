import React, { useState } from 'react';
import BookingForm from '../components/BookingForm'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import Confirmation from '../components/Confirmation';

const ReservationPage = () => {
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({});

  // Function to call upon successful form submission
  const handleReservationSubmit = (details) => {
    setReservationDetails(details); // 'details' contains the reservation info
    setReservationSubmitted(true);
  };

  return (
    <div>
      <Header />
      <h1>Reservation Page</h1>
      {!reservationSubmitted ? (
        // Pass the submit handler to the BookingForm
        <BookingForm onSuccessfulSubmission={handleReservationSubmit} />
      ) : (
        // Pass the reservation details to the confirmation component
        <Confirmation reservationDetails={reservationDetails} />
      )}
      <Footer />
    </div>
  );
};

export default ReservationPage;