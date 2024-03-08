import React, { useState } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import FindReservation from '../components/FindReservation';
import ReservationCard from '../components/SystemAdministrator/ReservationCard'; // Import ReservationCard 

function ViewReservationPage() {
  const [reservation, setReservation] = useState(null);

  const fetchReservationDetails = async (reservationNumber) => {
    try {
      const response = await fetch(`/api/reservations/${reservationNumber}`);
      console.log(reservationNumber)
      if (response.ok) {
        const json = await response.json();
        setReservation(json);
      } else {
        throw new Error('Failed to fetch reservations');
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
    };
};

  // Function to handle the deletion of a reservation
  const handleDeleteReservation = (reservationId) => {
    axios.delete(`/api/reservations/${reservationId}`)
      .then(() => {
        alert('Reservation successfully deleted');
        setReservation(null); // Clear the reservation state to remove it from the UI
      })
      .catch(error => {
        console.error('Error deleting the reservation:', error);
        alert('Failed to delete the reservation');
      });
  };

  return (
    <div>
      <Header />
      <h1>View My Reservation</h1>
      {!reservation && <FindReservation onFetch={fetchReservationDetails} />}
      {reservation && <ReservationCard reservation={reservation} onDelete={handleDeleteReservation} />}
      <Footer />
    </div>
  );
}

export default ViewReservationPage;
