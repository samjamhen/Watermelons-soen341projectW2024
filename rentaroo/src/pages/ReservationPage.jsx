import React, { useState } from 'react';
import BookingForm from '../components/BookingForm'; 
import Header from '../components/Header';
import HeaderCSR from '../components/HeaderCSR';
import HeaderAdmin from '../components/HeaderAdmin';
import HeaderCustomer from '../components/HeaderCustomer';
import Footer from '../components/Footer';
import Confirmation from '../components/Confirmation';
import { useAuthContext } from '../hooks/useAuthContext';
import AdditionalFeatures from '../components/AdditionalFeatures'; // Import AdditionalFeatures component

const ReservationPage = () => {
  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [reservationDetails, setReservationDetails] = useState({});
  const [additionalFeaturesSubmitted, setAdditionalFeaturesSubmitted] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false); // State to track visibility of confirmation
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

  // Function to call upon successful submission of additional features
  const handleAdditionalFeaturesSubmit = () => {
    setAdditionalFeaturesSubmitted(true);
    setConfirmationVisible(true); // Show confirmation after additional features are submitted
  };

  return (
    <div>
      {renderHeader()}
      <h1>Reservation Page</h1>
      {!reservationSubmitted ? (
        // Pass the submit handler to the BookingForm
        <BookingForm onSuccessfulSubmission={handleReservationSubmit} />
      ) : (
        <>
          {!additionalFeaturesSubmitted ? (
            // Pass the submit handler to the AdditionalFeatures component
            <AdditionalFeatures
              reservationDetails={reservationDetails}
              onSubmit={handleAdditionalFeaturesSubmit}
            />
          ) : (
            // Display the Confirmation component after both forms are submitted
            confirmationVisible && <Confirmation reservationDetails={reservationDetails} />
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default ReservationPage;
