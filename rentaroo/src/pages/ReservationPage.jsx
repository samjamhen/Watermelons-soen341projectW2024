import React, { useState } from 'react';
import BookingForm from '../components/BookingForm'; 
import Header from '../components/Header';
import HeaderCSR from '../components/HeaderCSR';
import HeaderAdmin from '../components/HeaderAdmin';
import HeaderCustomer from '../components/HeaderCustomer';
import Footer from '../components/Footer';
import Confirmation from '../components/Confirmation';
import { useAuthContext } from '../hooks/useAuthContext';

const ReservationPage = () => {
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({});
  const { user } = useAuthContext();

  const renderHeader = () => {
    if (!user || !user.user || !user.user.userType) {
      return <Header />;
    }
    
    let userType = user.user.userType;
    switch (userType) {
      case "client":
        return <HeaderCustomer />;
      case "customer_representative":
        return <HeaderCSR />;
      case "system_administrator":
        return <HeaderAdmin />;
      default:
        return <Header />;
    }
  };

  // Function to call upon successful form submission
  const handleReservationSubmit = (details) => {
    setReservationDetails(details); // 'details' contains the reservation info
    setReservationSubmitted(true);
  };

  return (
    <div>
      {renderHeader()}
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