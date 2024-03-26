import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/HeaderCSR';
import Footer from '../../components/Footer';
import CarReturnForm from '../../components/CarReturnForm';

const ConfirmReturn = () => {
  const location = useLocation();
  const fetchedReservation = location.state.fetchedReservation;

  return (
    <div>
      <Header />
      <h2>Confirm Return</h2>
      {/* Render the CarReturnForm component */}
      <CarReturnForm fetchedReservation={fetchedReservation} />
      <Footer />
    </div>
  );
};

export default ConfirmReturn;
