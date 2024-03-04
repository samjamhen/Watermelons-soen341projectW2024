import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; //install "npm install react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/bookingForm.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    vehicle: '',
    email: '',
    phone: '',
    pickupAddress: '',
    pickupDate: new Date(),
    returnDate: new Date(),
  });
  const [error, setError] = useState('')

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle pickup address change
  const handlePickupAddressChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, pickupAddress: value });
  };

  // Handle date picker changes
  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date || new Date() });
  };  

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here we send data to the server for processing and confirming the reservation
    const reservation = { fullName: formData.fullName, vehicle: formData.vehicle, email: formData.email, 
      phone: formData.phone, pickupAddress: formData.pickupAddress, pickupDate: formData.pickupDate, returnDate: formData.returnDate}
    console.log(formData);

    const response = await fetch('/api/reservations', {
      method: 'POST',
      body: JSON.stringify(reservation), 
      headers: {
          'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

        if (!response.ok){
            setError(json.error)
        }
        if (response.ok){
            setError(null)
            setFormData({
              fullName : '',
              email: '', 
              phone: '',
              pickupAddress: '',
              pickupDate: new Date(),
              returnDate: new Date() 
            })
            console.log('new reservation added')

        }
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
              <option value="">Select</option>
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
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default BookingForm;
