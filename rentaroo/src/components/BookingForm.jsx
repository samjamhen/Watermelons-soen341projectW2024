import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
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
          <label htmlFor="drivingLicenseNumber">Driving License Number:</label>
          <input type="text" id="drivingLicenseNumber" name="drivingLicenseNumber" value={formData.drivingLicenseNumber} onChange={handleChange} required />
        </div>
        <h3>Credit Card Information</h3>
        <div>
          <label htmlFor="creditCardNumber">Credit Card Number:</label>
          <input type="text" id="creditCardNumber" name="creditCardNumber" value={formData.creditCardNumber} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input type="text" id="expirationDate" name="expirationDate" value={formData.expirationDate} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookingForm;
