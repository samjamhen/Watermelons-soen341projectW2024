import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useLocation } from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';
import '../styles/bookingForm.css';

const ModifyBookingForm = () => {
  const location = useLocation();
  const vehicle = location.state?.vehicle;

  // Initialize form state with null values
  const [formData, setFormData] = useState({
    reservationId: '',
    fullName: '',
    email: '',
    phone: '',
    pickupAddress: '',
    pickupDate: null,
    returnDate: null,
    drivingLicenseNumber: '',
  });

  // This function simulates fetching reservation data from a backend
  // Replace it with your actual data fetching logic
  const fetchReservationData = async (reservationId) => {
    console.log(`Fetching data for reservation ID: ${reservationId}`);
    // Simulated fetch response
    const fetchedData = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      pickupAddress: 'Toronto',
      pickupDate: new Date('2024-03-10'),
      returnDate: new Date('2024-03-15'),
      drivingLicenseNumber: 'D12345678',
    };
    // Update form state with fetched data
    setFormData((prevState) => ({
      ...prevState,
      ...fetchedData,
      pickupDate: new Date(fetchedData.pickupDate),
      returnDate: new Date(fetchedData.returnDate),
    }));
  };

  // Effect hook to fetch data when a reservation ID is provided
  useEffect(() => {
    if (formData.reservationId) {
      fetchReservationData(formData.reservationId);
    }
  }, [formData.reservationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to update the reservation
    console.log('Updating reservation with data:', formData);
    // Make an API call to update the reservation in your backend
  };

  return (
    <div className="booking-container">
      <form onSubmit={handleSubmit} className="modify-booking-form">
        <h2>Modify Your Booking</h2>
        <div>
          <label htmlFor="reservationId">Reservation ID:</label>
          <input
            type="text"
            id="reservationId"
            name="reservationId"
            value={formData.reservationId}
            onChange={handleChange}
            placeholder="Enter reservation ID"
          />
        </div>
        {/* Form fields to modify reservation data */}
        {/* Note: Ensure each DatePicker's selected value can handle null/undefined */}
        <button type="submit">Update Reservation</button>
      </form>
    </div>
  );
};

export default ModifyBookingForm;
