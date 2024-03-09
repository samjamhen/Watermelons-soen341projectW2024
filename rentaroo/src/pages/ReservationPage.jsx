import React from 'react';
import AdminBookingForm from '../components/SystemAdministrator/AdminBookingForm'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReservationPage = () => {
  return (
    <div>
      <Header />
      <h1>Reservation Page</h1>
      {/* Render the BookingForm component */}
      <AdminBookingForm />
      <Footer />
    </div>
  );
};

export default ReservationPage;