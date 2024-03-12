// ReservationsManagement.js
import React, { useEffect, useState } from 'react';
import Header from '../../../components/HeaderAdmin';
import HeaderCSR from '../../../components/HeaderCSR';
import HeaderAdmin from '../../../components/HeaderAdmin';
import HeaderCustomer from '../../../components/HeaderCustomer';
import Footer from '../../../components/Footer';
import ReservationCard from '../../../components/SystemAdministrator/ReservationCard';
import { useAuthContext } from '../../../hooks/useAuthContext';

const ReservationsManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('referenceNumber');
  const { user } = useAuthContext();


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

  useEffect(() => {
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

  

  const handleSearch = async () => {
    try {
      let url;
      if (searchTerm) {
        let encodedSearchTerm = encodeURIComponent(searchTerm);
        url = `/api/reservations/${searchOption}/${encodedSearchTerm}`;

      } else {
        // Otherwise, fetch all reservations
        fetchReservations();
        return;
      }
      
      const response = await fetch(url);
      console.log(url)
      if (response.ok) {
        const json = await response.json();
        setReservations(json);
      } else {
        throw new Error('Failed to search reservations');
      }
    } catch (error) {
      console.error('Error searching reservations:', error.message);
    }
  };

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
        <button onClick={handleSearch}>Search</button>
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