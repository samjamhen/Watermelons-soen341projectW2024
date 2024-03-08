
import React, { useState } from 'react';

function FindReservation({ onFetch }) {
  const [fullName, setFullName] = useState('');
  const [reservationNumber, setReservationNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onFetch function passed from the parent component, passing the reservationNumber
    onFetch(reservationNumber);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="reservationNumber">Reservation Number:</label>
        <input
          type="text"
          id="reservationNumber"
          value={reservationNumber}
          onChange={(e) => setReservationNumber(e.target.value)}
          required
        />
      </div>
      <button type="submit">Find Reservation</button>
    </form>
  );
}

export default FindReservation;
