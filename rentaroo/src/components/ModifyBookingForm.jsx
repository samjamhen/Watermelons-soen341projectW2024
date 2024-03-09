import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useLocation } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/bookingForm.css';

const ModifyBookingForm = () => {
  // Initialize form state with reservation data or null values if no reservation is provided
  const [formData, setFormData] = useState({
    id: '',
    fullName: '',
    email: '',
    phone: '',
    pickupAddress: '',
    pickupDate: new Date(), // default pickup date
    returnDate: new Date(), // default return date
    driversLicenseNumber: ''
  });  
  const [initialFormData, setInitialFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [validDates, setValidDates] = useState(true)
  //id for now
  const fakeUserId = "Will be implemented when we have a login";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`/api/reservations/${fakeUserId}`);
        if (response.ok) {
          const json = await response.json();
          setFormData(json);
          setInitialFormData(json);
        } else {
          throw new Error('Failed to fetch reservations');
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to update the reservation
    console.log('Updating reservation with data:', formData);
    // Make an API call to update the reservation in your backend
    if (new Date(formData.returnDate) <= new Date(formData.pickupDate)) {
      console.log('Dates are not valid');
      setValidDates(false)
      return;
    }
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
      setInitialFormData(formData)
      setValidDates(true)
      console.log('Reservation updated successfully');
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
    setFormData(initialFormData);
    setValidDates(true);
  };
  

  return (
    <div className="booking-container">
      <form onSubmit={handleSubmit} className="booking-form">

        <div>
          <label htmlFor="reservationId">Reservation ID:</label>
          <input
            type="text"
            id="reservationId"
            name="reservationId"
            value={formData._id}
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
          <label>Pickup Date:</label>{validDates ? null : (<p style={{ color: 'red' }}>Pickup Date must be before return Date.</p>)}
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
        <div>
          <label htmlFor="driversLicenseNumber">Driving License Number:</label>
          <input
            type="text"
            id="driversLicenseNumber"
            name="driversLicenseNumber"
            value={formData.driversLicenseNumber}
            onChange={handleChange}
            disabled={!editMode}
            placeholder="Enter Driver's License Number"
          />
        </div>
        <button type="button" onClick={editMode? handleCancelClick: handleEditClick}>{editMode? "Cancel": "Edit"}</button>
        {editMode && <button type="submit">Update Reservation</button>}
      </form>
    </div>
  );
};

export default ModifyBookingForm;
