import React from 'react';
import BookingForm from '../components//BookingForm'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReservationPage = () => {
  return (
    <div>
      <Header />
      <h1>Reservation Page</h1>
      {/* Render the BookingForm component */}
      <BookingForm />
      <Footer />
    </div>
  );
};

export default ReservationPage;