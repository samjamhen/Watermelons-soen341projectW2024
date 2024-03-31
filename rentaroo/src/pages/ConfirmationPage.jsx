import React from 'react';
import Footer from '../components/Footer';
import Confirmation from '../components/Confirmation';
import { useAuthContext } from '../hooks/useAuthContext';
import Header from '../components/Header';
import HeaderCSR from '../components/HeaderCSR';
import HeaderAdmin from '../components/HeaderAdmin';
import HeaderCustomer from '../components/HeaderCustomer';
import { useLocation } from 'react-router-dom'; // Import useLocation hook

const ConfirmationPage = () => {
  const { user } = useAuthContext();
  const location = useLocation(); // Initialize useLocation hook
  const reservationDetails = location.state.reservationDetails; // Get reservationDetails from location state

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

  return (
    <div>
      {renderHeader()}
      <Confirmation reservationDetails={reservationDetails} /> {/* Pass reservationDetails to Confirmation component */}
      <Footer />
    </div>
  );
};

export default ConfirmationPage;
