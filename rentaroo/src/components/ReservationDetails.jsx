import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const ReservationDetails = ({ reservation }) => {
  const navigate = useNavigate();

  const handleModify = () => {
    // Navigate to the modify reservation page, add the path when available
    navigate('/modify-reservation-path'); // Replace '/modify-reservation-path' with your actual route
  };

  const handleCancel = () => {
    // Navigate to the cancel reservation confirmation page, add the path when available
    navigate('/cancel-reservation-path'); // Replace '/cancel-reservation-path' with your actual route
  };

  return (
    <div className="reservation-details-container">
      <h2>Reservation Details</h2>
      <div><strong>Reservation ID:</strong> {reservation.reservationId}</div>
      <div><strong>Full Name:</strong> {reservation.fullName}</div>
      <div><strong>Email:</strong> {reservation.email}</div>
      <div><strong>Phone Number:</strong> {reservation.phone}</div>
      <div><strong>Pickup Address:</strong> {reservation.pickupAddress}</div>
      <div><strong>Pickup Date:</strong> {reservation.pickupDate.toLocaleDateString()}</div>
      <div><strong>Return Date:</strong> {reservation.returnDate.toLocaleDateString()}</div>
      <div><strong>Driving License Number:</strong> {reservation.drivingLicenseNumber}</div>
      {/* Include additional reservation details as needed */}
      
      <button onClick={handleModify}>Modify</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default ReservationDetails;
