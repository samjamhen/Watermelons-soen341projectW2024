import React, { useState } from 'react';
import '../styles/CheckinInfo.css';
import ReservationCard from '../components/SystemAdministrator/ReservationCard';
import { useNavigate } from "react-router-dom"; // Import useNavigate

function CheckinInfo() {
  const [searchType, setSearchType] = useState('confirmationNumber');
  const [searchValue, setSearchValue] = useState('');
  const [fetchedReservation, setFetchedReservation] = useState(null);
  const [error, setError] = useState(null);
  const [showReservationButton, setShowReservationButton] = useState(false);
  const navigate = useNavigate(); // Create a navigate function

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
        setShowReservationButton(true);
      } else {
        // Set the error state
        setError(reservation.message);
        setShowReservationButton(false);
      }
    } catch (error) {
      // Set the error state
      setError('An error occurred while fetching the reservation.');
      setShowReservationButton(false);
    }
  };

  const handleReservationButtonClick = () => {
    // Your logic to navigate to the Car Inspection Form page
    // You can use the Link component or useHistory hook to navigate to the CarInspection component
    // and pass the fetchedReservation as a prop.
    navigate("/CarInspectionCheckin", { state: { fetchedReservation } });

  };

  return (
    <div className='container-1'>
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
      
    </div>
    <div className='fetched-reservation'>
      {fetchedReservation && <ReservationCard reservation={fetchedReservation} />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    
      {showReservationButton && (
  <button id="inspectcar"onClick={handleReservationButtonClick}>
    Inspect the reserved car
  </button>
)}
    </div></div>
  );
}

export default CheckinInfo;