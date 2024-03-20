import React, { useState } from 'react';
import '../styles/CheckinInfo.css';
import ReservationCard from '../components/SystemAdministrator/ReservationCard';
import { Link } from "react-router-dom";

function CheckinInfo() {
  const [searchType, setSearchType] = useState('confirmationNumber');
  const [searchValue, setSearchValue] = useState('');
  const [fetchedReservation, setFetchedReservation] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchValue('');
    setFetchedReservation(null);
    setError(null);
  };

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch the reservation by selected search type
    try {
      console.log(searchType)
      let url = `/api/reservations/${searchType.trim()}/${searchValue}`;
      const response = await fetch(url);
      const reservation = await response.json();

      if (response.ok) {
        // Set the fetched reservation state
        setFetchedReservation(reservation);
        setError(null);
      } else {
        // Set the error state
        setError(reservation.message);
      }
    } catch (error) {
      // Set the error state
      setError('An error occurred while fetching the reservation.');
    }
  };

  return (
    <div className="checkin-info-container">
      <h4>Search for Customer Reservation</h4>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search-type">Search by:</label>
        <select id="search-type" value={searchType} onChange={handleSearchTypeChange}>
          <option value="confirmationNumber">Confirmation Number</option>
          <option value="driversLicenseNumber">License Number</option>
          <option value="creditCardNumber">Credit Card Number</option>
        </select>
        <br />

        <label htmlFor="search-value">Search Value:</label>
        <input
          type="text"
          id="search-value"
          value={searchValue}
          onChange={handleSearchValueChange}
        />
        <br/>

        <button type="submit">Search for Customer Reservation</button>
      </form>
      {fetchedReservation && <ReservationCard reservation={fetchedReservation} />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    
      <Link to="/CarInspectionCheckin" id="link">
        Inspect Car
          </Link>
    </div>
  );
}

export default CheckinInfo;