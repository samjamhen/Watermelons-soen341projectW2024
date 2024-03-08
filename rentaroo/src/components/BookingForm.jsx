import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useLocation } from 'react-router-dom'; // Import useLocation

import 'react-datepicker/dist/react-datepicker.css';
import '../styles/bookingForm.css';

const BookingForm = () => {

  const location = useLocation(); // Access location object
  const vehicle = location.state?.vehicle; // Access vehicle information passed through state

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupAddress: 'Montreal',
    pickupDate: new Date(),
    returnDate: new Date(),
    driversLicenseNumber: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle date picker changes
  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  // Handle form submission
// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Here we send data to the server for processing and confirming the reservation
    const reservation = {
      fullName: formData.fullName,
      vehicle: vehicle._id,
      email: formData.email, 
      phone: formData.phone,
      pickupAddress: formData.pickupAddress,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      driversLicenseNumber: formData.driversLicenseNumber
    };

    const response = await fetch('/api/reservations', {
      method: 'POST',
      body: JSON.stringify(reservation), 
      headers: {
          'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to submit reservation');
    }

    // Reset form fields
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      pickupAddress: 'Montreal',
      pickupDate: new Date(),
      returnDate: new Date(),
      driversLicenseNumber: '',
    });

    console.log('Reservation submitted successfully');
  } catch (error) {
    console.error('Error submitting reservation:', error.message);
  }
};


  return (
    <div className="booking-container">
      {vehicle && (
        <div className="information-placeholder">
          {/* Display vehicle information */}
          <img src={vehicle.imageUrl || 'path/to/default/image.jpg'} alt={`${vehicle.make} ${vehicle.model}`} />
          <h3>{`${vehicle.yearOfManufacture} ${vehicle.make} ${vehicle.model}`}</h3>
          <p>Price: ${vehicle.price} per day</p>
          <ul className="vehicle-details">
            <li>Color: {vehicle.color}</li>
            <li>Mileage: {vehicle.mileage}</li>
            <li>Transmission: {vehicle.transmissionType}</li>
            <li>Seating Capacity: {vehicle.seatingCapacity}</li>
            <li>Fuel Type: {vehicle.fuelType}</li>
            <li>Car Type: {vehicle.carType}</li>
            <li>Features: {vehicle.featuresAndAmenities.join(', ')}</li>
          </ul>

          {/* Add more vehicle details as needed */}
        </div>
      )}
      <form onSubmit={handleSubmit} className="booking-form">
        <h2>Booking Form</h2>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="pickupAddress">Pickup Address:
            <select id="pickupAddress" name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} required>
              <option value="Montreal">Montreal</option>
              <option value="Toronto">Toronto</option>
              <option value="Ottawa">Ottawa</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="pickupDate">Pickup Date:</label>
          <DatePicker
            selected={formData.pickupDate}
            onChange={(date) => handleDateChange(date, 'pickupDate')}
            minDate={new Date()}
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>
        <div>
          <label htmlFor="returnDate">Return Date:</label>
          <DatePicker
            selected={formData.returnDate}
            onChange={(date) => handleDateChange(date, 'returnDate')}
            minDate={formData.pickupDate} // Minimum date should be the same or after the pickup date
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>
        <div>
          <label htmlFor="driversLicenseNumber">Driving License Number:</label>
          <input type="text" id="driversLicenseNumber" name="driversLicenseNumber" value={formData.driversLicenseNumber} onChange={handleChange} required />
        </div>
      
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookingForm; 

