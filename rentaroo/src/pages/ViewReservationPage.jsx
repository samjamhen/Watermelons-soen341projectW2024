import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReservationCard from '../components/SystemAdministrator/ReservationCard';

function ViewReservationPage() {
    const [reservations, setReservations] = useState([]);
    const storedUser = localStorage.getItem('user');
    const user = JSON.parse(storedUser);
    const userId = user?.user?._id; 

    useEffect(() => {
      fetchAllReservations();
  }, []);

  const fetchAllReservations = async () => {
      try {
          const response = await axios.get('/api/reservations');
          if (response.status === 200) {
              setReservations(response.data); // Assuming the API returns an array of all reservations
          } else {
              throw new Error('Unable to fetch reservations');
          }
      } catch (error) {
          console.error('Error fetching reservations:', error);
      }
  };


  const handleDeleteReservation = async (reservationId) => {
    const storedData = localStorage.getItem('user');
    const user = storedData ? JSON.parse(storedData) : null;

    if (user && user.token) {
        try {
            await axios.delete(`/api/reservations/${reservationId}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setReservations(current => current.filter(res => res._id !== reservationId));
            alert('Reservation successfully deleted');
        } catch (error) {
            console.error('Error deleting the reservation:', error);
            alert('Failed to delete the reservation');
        }
    } else {
        console.error("User token not found.");
    }
  };


    return (
        <div>
            <Header />
            <h1>My Reservations</h1>
            <p>User ID: {userId}</p> 
            {reservations
                .filter(reservation => reservation.userID === userId) // Filter reservations by userID
                .map(reservation => (
                  <ReservationCard 
                    key={reservation._id}
                    reservation={reservation} 
                    onDelete={() => handleDeleteReservation(reservation._id)} 
                  />
                ))}
            <Footer />
        </div>
    );
}

export default ViewReservationPage;
