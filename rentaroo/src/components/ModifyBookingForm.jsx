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
    driversLicenseNumber: '',
    totalPrice: 0
  });  
  const [initialFormData, setInitialFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [phoneNumberFormatError, setPhoneNumberFormatError] = useState(false);
  const [validDates, setValidDates] = useState(true)
  const [validLicense, setValidLicense] = useState(true)
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [reservationDates, setReservationDates] = useState([]);

  useEffect(() => {
    // Update totalPrice whenever pickupDate or returnDate changes
    setFormData(prevData => ({
      ...prevData,
      totalPrice: vehicle.price * (Math.abs(formData.returnDate - formData.pickupDate) / (1000 * 60 * 60 * 24) + 1)
    }));

    if (new Date(formData.returnDate) < new Date(formData.pickupDate)) {
      console.log('Dates are not valid');
      setValidDates(false)
      // Set totalPrice to 0 if return date is before pickup date
      setFormData(prevData => ({
        ...prevData,
        totalPrice: 0
      }))
    }
  }, [formData.pickupDate, formData.returnDate]);

  useEffect(() => {
    // Construct an array containing all dates within the reservation range
    const dates = [];
    let currentDate = new Date(editedData.pickupDate);
    while (currentDate <= editedData.returnDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setReservationDates(dates);

  }, [formData]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`/api/reservations/vehicle/${formData.vehicle}`);
        if (response.ok) {
          const reservations = await response.json();
          const dates = reservations.map(reservation => ({
            startDate: new Date(reservation.pickupDate),
            endDate: new Date(reservation.returnDate)
          }));
          setUnavailableDates(dates);
        } else {
          console.error('Failed to fetch reservations');
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };
    fetchReservations();
  }, [formData]);
  //id for now
  const fakeUserId = "Will be implemented when we have a login";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  const handleEmailAddressChange = (e) => {
    const { name, value } = e.target;
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      setEmailFormatError(false);
    } else {
      setEmailFormatError(true);
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneNumberChange = (e) => {
    const { name, value } = e.target;
    if (/^\d{3}-\d{3}-\d{4}$/.test(value)) {
      setPhoneNumberFormatError(false);
    } else {
      setPhoneNumberFormatError(true);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLicenseChange = (e) => {
    const { name, value } = e.target;
    if(/^[A-Za-z0-9]{8}$/.test(value)){
        setValidLicense(true);
    } else{
        setValidLicense(false);
    }

    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
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
    console.log(formData.vehicle)
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
      setEmailFormatError(false)
      setPhoneNumberFormatError(false)
      setValidLicense(true)
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
    setValidDates(true)
    setEmailFormatError(false)
    setPhoneNumberFormatError(false)
    setValidLicense(true)
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
          <label htmlFor="email">Email:</label>{emailFormatError && <span style={{ color: 'red' }}>Please enter a valid email address.</span>}
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleEmailAddressChange}
            disabled={!editMode}
            placeholder="Enter email"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>{phoneNumberFormatError && <span style={{ color: 'red' }}>Please enter a phone number in the correct format.</span>}
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneNumberChange}
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
            minDate={() => new Date()}
            filterDate={date => isDateDisabledModify(date, unavailableDates, reservationDates)}
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
            filterDate={date => isDateDisabledModify(date, unavailableDates, reservationDates)}
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <div>
          <label htmlFor="driversLicenseNumber">Driving License Number:</label>{validLicense ? null : (<p style={{ color: 'red' }}>A valid Driver's License is 8 Alphanumeric Characters</p>)}
          <input
            type="text"
            id="driversLicenseNumber"
            name="driversLicenseNumber"
            value={formData.driversLicenseNumber}
            onChange={handleLicenseChange}
            disabled={!editMode}
            placeholder="Enter Driver's License Number"
          />
        </div>
        <div>
        <div>
          <label htmlFor="totalPrice">Total Price:</label>
          <input
            type="text"
            id="totalPrice"
            name="totalPrice"
            value={formData.totalPrice}
            onChange={handleChange}
            disabled="true"
            placeholder=""
          />
        </div>
        </div>
        <button type="button" onClick={editMode? handleCancelClick: handleEditClick}>{editMode? "Cancel": "Edit"}</button>
        {editMode && <button type="submit">Update Reservation</button>}
      </form>
    </div>
  );
};

export default ModifyBookingForm;
