import React, { useState } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import FindReservation from '../components/FindReservation';
import ReservationCard from '../components/SystemAdministrator/ReservationCard'; // Import ReservationCard instead of ReservationDetails

function ViewReservationPage() {
  const [reservation, setReservation] = useState(null);

  const fetchReservationDetails = (reservationNumber) => {
    axios.get(`/api/reservations/ReferenceNumber/${reservationNumber}`) // this doesnt seem to work
      .then(response => {
        setReservation(response.data); // Set the fetched reservation data
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          alert('No reservation was found');
        } else {
          console.error('Error fetching reservation details:', error);
        }
      });
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
      <FindReservation onFetch={fetchReservationDetails} />
      {reservation && <ReservationCard reservation={reservation} onDelete={handleDeleteReservation} />}
      <Footer />
    </div>
  );
}

export default ViewReservationPage;
