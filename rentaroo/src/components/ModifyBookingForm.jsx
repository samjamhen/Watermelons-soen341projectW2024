import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useLocation } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/bookingForm.css';

const ModifyBookingForm = ({ reservation, searchTerm, searchOption, onFormSubmitComplete}) => {
  // Initialize form state with reservation data or null values if no reservation is provided
  const [formData, setFormData] = useState({...reservation});
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to update the reservation
    console.log('Updating reservation with data:', formData);
    // Make an API call to update the reservation in your backend
    try {
      const response = await fetch(`/api/reservations/${formData._id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Network response was not okay');
      }
      console.log('Reservation updated successfully');
      onFormSubmitComplete();
      // Optionally, you can redirect or perform any other action upon successful update
    } catch (error) {
      console.error('Error updating reservation:', error);
      // Handle error, show error message, etc.
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  }

  const handleCancelClick = () => {
    setEditMode(false);
    setFormData({...reservation});
  }

  return (
    <div className="booking-container">
      <form onSubmit={handleSubmit} className="booking-form">

        <div>
          <label htmlFor="reservationId">Reservation ID:</label>
          <input
            type="text"
            id="reservationId"
            name="reservationId"
            value={formData.id}
            onChange={handleChange}
            disabled="true"
            placeholder="Enter reservation ID"
          />
        </div>
        {/* Form fields to modify reservation data */}
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Enter full name"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Enter email"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Enter phone Number"
          />
        </div>
        <div>
          <label htmlFor="pickupAddress">Pickup Address:
            <select id="pickupAddress" name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} disabled={!editMode} required>
              <option value="Montreal">Montreal</option>
              <option value="Toronto">Toronto</option>
              <option value="Ottawa">Ottawa</option>
            </select>
          </label>
        </div>
        {/* Add more input fields for other reservation data */}
        {/* Date picker for pickup date */}
        <div>
          <label>Pickup Date:</label>
          <DatePicker
            selected={formData.pickupDate}
            onChange={(date) => handleDateChange(date, 'pickupDate')}
            disabled={!editMode}
            dateFormat="MM/dd/yyyy"
          />
        </div>
        {/* Date picker for return date */}
        <div>
          <label>Return Date:</label>
          <DatePicker
            selected={formData.returnDate}
            onChange={(date) => handleDateChange(date, 'returnDate')}
            disabled={!editMode}
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <button type="button" onClick={editMode? handleCancelClick: handleEditClick}>{editMode? "Cancel": "Edit"}</button>
        {editMode && <button type="submit">Update Reservation</button>}
      </form>
    </div>
  );
};

export default ModifyBookingForm;
