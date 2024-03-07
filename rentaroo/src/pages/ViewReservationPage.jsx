import React from 'react';
import ReservationDetails from '../components/ReservationDetails'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

const ViewReservationPage = () => {
  // Example static reservation data
  const exampleReservation = {
    reservationId: '123456',
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '555-1234',
    pickupAddress: '123 Main St, Anytown, AT 12345',
    pickupDate: new Date('2024-04-01'),
    returnDate: new Date('2024-04-07'),
    drivingLicenseNumber: 'D987654321',
  };

  return (
    <div>
      <Header />
      <h1>Reservation Page</h1>
      {/* Render the ReservationDetails component with the example reservation */}
      <ReservationDetails reservation={exampleReservation} />
      <Footer />
    </div>
  );
};

export default ViewReservationPage;
