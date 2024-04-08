import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../components/HeaderCustomer";
import Footer from "../components/Footer";
import ReservationCard from '../components/SystemAdministrator/ReservationCard';
import RequestCard from '../components/RequestCard';

function ViewReservationPage() {
    const [reservations, setReservations] = useState([]);
    const [vehicles, setVehicles]=useState([]);
    const storedUser = localStorage.getItem('user');
    const user = JSON.parse(storedUser);
    const userId = user?.user?._id; 

    useEffect(() => {
      fetchAllReservations();
      fetchRequestedVehicles();
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

  const fetchRequestedVehicles = async () => {
    try {
        const response = await axios.get('/api/vehicles');
        if (response.status === 200) {
            const vehiclesWithSubmittedBy = response.data.filter(vehicle => vehicle.submittedBy === userId);
            setVehicles(vehiclesWithSubmittedBy);
            console.log(vehicles);
        } else {
            throw new Error('Unable to fetch vehicles');
        }
    } catch (error) {
        console.error('Error fetching vehicles:', error);
    }
};


  const handleDeleteReservation = async (reservationId) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this reservation?");

    if (!isConfirmed) {
        // If the user clicks "Cancel", exit the function
        return;
    }

    // Proceed with deletion if the user confirmed
    const storedData = localStorage.getItem('user');
    const user = storedData ? JSON.parse(storedData) : null;

    if (user && user.token) {
        try {
            await axios.delete(`/api/reservations/${reservationId}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            // Update the state to reflect the deleted reservation
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

const filteredReservations = reservations.filter(reservation => reservation.userID === userId);

return (
    <div>
        <Header />

        <div className="Reservations">
        <h1>My Reservations</h1>
        {filteredReservations.length > 0 ? (
            filteredReservations.map(reservation => (
                <ReservationCard 
                    key={reservation._id}
                    reservation={reservation} 
                    onDelete={() => handleDeleteReservation(reservation._id)} 
                />
            ))
        ) : (
            <h3>You have no reservations.</h3> // Display this message if there are no reservations
        )}

     </div>


     <div className="Vehicle-Requests">

     <div className="Vehicle-Requests">
                <h1>My Vehicles Requests</h1>
                {vehicles.length > 0 ? (
                    vehicles.map(vehicle => (
                        <RequestCard
                            key={vehicle._id}
                            vehicle={vehicle} // Pass the vehicle data as prop
                        />
                    ))
                ) : (
                    <h3>No vehicles found.</h3>
                )}
            </div>



     </div>




        <Footer />
    </div>
);
}

export default ViewReservationPage;
