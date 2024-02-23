import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // to install: npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/bookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupAddress: '',
    pickupDate: new Date(),
    returnDate: new Date(),
    drivingLicenseNumber: '',
    creditCardNumber: '',
    expirationDate: '',
    cvv: '',
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here we send data to the server for processing and confirming the reservation
    console.log(formData);
  };

  return (
    <div className="booking-container">
      <div className="car-image-placeholder">
        {/* Placeholder for the car image */}
        {/* You can replace this with an actual image */}
        Image Placeholder
      </div>
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
          <label htmlFor="pickupAddress">Pickup & Return Address:
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
          <label htmlFor="driverAge">Driver's Age:
            <select id="pickupAddress" name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} required>
              <option value="young">18-25</option>
              <option value="adult">25-65</option>
              <option value="senior">65+</option>
            </select>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookingForm;
