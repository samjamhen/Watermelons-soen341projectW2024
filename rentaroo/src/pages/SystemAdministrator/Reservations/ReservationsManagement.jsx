// ReservationsManagement.js
import React, { useEffect, useState } from 'react';
import Header from '../../../components/HeaderAdmin';
import Footer from '../../../components/Footer';
import ReservationCard from '../../../components/SystemAdministrator/ReservationCard';

const ReservationsManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('referenceNumber');

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('/api/reservations/');
        if (response.ok) {
          const json = await response.json();
          setReservations(json);
        } else {
          throw new Error('Failed to fetch reservations');
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleDelete = async (_id) => {
    try {
      if (window.confirm('Are you sure you want to delete this reservation?')) {
        const response = await fetch(`/api/reservations/${_id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete reservation');
        }
        setReservations((prevReservations) => prevReservations.filter((reservation) => reservation._id !== _id));
      }
    } catch (error) {
      console.error('Error deleting reservation:', error.message);
    }
  };

  {/*}
  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/reservations/${searchOption}/${searchTerm}`);
      if (!response.ok) {
        throw new Error('Failed to search reservations');
      }
      const json = await response.json();
      setReservations(json);
    } catch (error) {
      console.error('Error searching reservations:', error.message);
    }
  };*/}

  return (
    <div>
      <Header />
      <main>
        <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
          <option value="referenceNumber">Reference Number</option>
          <option value="name">Name</option>
          <option value="phone">Phone Number</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter reservation search term"
        />
        <button>Search</button>
        <button onClick = {() => window.location.href = 'http://localhost:3000/StartReservation'}>Add</button>
        <div>
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <ReservationCard key={reservation._id} reservation={reservation} onDelete={handleDelete} />
            ))
          ) : (
            <p>No reservations found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReservationsManagement;