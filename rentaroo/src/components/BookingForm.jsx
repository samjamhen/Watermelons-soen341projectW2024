import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { isDateDisabled } from './utils/utils';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/bookingForm.css';
import { useAuthContext } from '../hooks/useAuthContext';

const BookingForm = ({onSuccessfulSubmission}) => {

  const location = useLocation(); // Access location object
  const vehicle = location.state?.vehicle; // Access vehicle information passed through state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    pickupDate: new Date(),
    returnDate: new Date(),
    driversLicenseNumber: '',
    rentalPrice: 0,
    creditCard: ''
  });
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [phoneNumberFormatError, setPhoneNumberFormatError] = useState(false);
  const [validDates, setValidDates] = useState(true)
  const [validLicense, setValidLicense] = useState(true)
  const [unavailableDates, setUnavailableDates] = useState([])
  const [reservations, setReservations] = useState([])
  const [creditCardFormatError, setCreditCardFormatError] = useState(false);
  const { user } = useAuthContext();

  // Fetch reservations associated with the vehicle
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`/api/reservations/vehicle/${vehicle._id}`);
        if (response.ok) {
          const reservations = await response.json();

          if (Array.isArray(reservations)) {
            // Handle the case when reservations is an array
            console.log("fetched");
            setReservations(reservations); // Store reservations in state
            const dates = reservations.map(reservation => ({
              startDate: new Date(reservation.pickupDate),
              endDate: new Date(reservation.returnDate)
            }));
            setUnavailableDates(dates);
            console.log("Unavailable dates:", dates);
          } else {
            // Handle the case when reservations is not an array
            console.error('Response is not an array of reservations:', reservations);
          }
        } else {
          console.error('Failed to fetch reservations');
        }
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };
    if (vehicle) {
      fetchReservations(); // Call fetchReservations if vehicle is available
    }
    
  }, [vehicle]);
  
  useEffect(() => {
    // Calculate the difference in milliseconds between pickupDate and returnDate
    const differenceInMilliseconds = formData.returnDate - formData.pickupDate;
    // Convert the difference to days and round up using Math.ceil()
    const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    // Calculate the rentalPrice
    const rentalPrice = vehicle.price * (differenceInDays + 1);
    // Update the formData with the new rentalPrice
    setFormData(prevData => ({
    ...prevData,
    rentalPrice: rentalPrice
    }));

    if (new Date(formData.returnDate) < new Date(formData.pickupDate)) {
      console.log('Dates are not valid');
      setValidDates(false)
      // Set rentalPrice to 0 if return date is before pickup date
      setFormData(prevData => ({
        ...prevData,
        rentalPrice: 0
      }))
    }
  }, [formData.pickupDate, formData.returnDate, formData.creditCard]);
  // Handle form input changes
  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormData({ ...formData, [name]: value });
  };

  // Handle date picker changes
  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
    setValidDates(true)
  };

  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    // Regular expression to validate credit card numbers
    const creditCardRegex = /^(?:3[47]\d{13}|(?:4\d|5[1-5]|65)\d{14}|6011\d{12}|(?:2131|1800)\d{11})$/;
    if (creditCardRegex.test(value)) {
      setCreditCardFormatError(false); // Set error state to false when the credit card number is valid
    } else {
      setCreditCardFormatError(true); // Set error state to true when the credit card number is invalid
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
  // Handle form submission
// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser);
  const userId = user?.user?._id; 

  if(!validLicense || emailFormatError || phoneNumberFormatError || creditCardFormatError){
    return
  }
  if (new Date(formData.returnDate) < new Date(formData.pickupDate)) {
    console.log('Dates are not valid');
    setValidDates(false)
    return;
  }

  console.log("Booking Form Submitted...");
  try {
    // Here we send data to the server for processing and confirming the reservation
    const reservation = {
      fullName: formData.fullName,
      userID: userId, 
      vehicle: vehicle._id,
      email: formData.email,
      phone: formData.phone,
      pickupAddress: vehicle.location,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      driversLicenseNumber: formData.driversLicenseNumber,
      rentalPrice: formData.rentalPrice,
      creditCard: formData.creditCard
    };
    console.log(reservation)

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

    const reservationDetails = await response.json();
    // Reset form fields
    setValidLicense(true)
    setValidDates(true)
    setPhoneNumberFormatError(false)
    setEmailFormatError(false)
    setCreditCardFormatError(false)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      pickupDate: new Date(),
      returnDate: new Date(),
      driversLicenseNumber: '',
      rentalPrice: 0,
      creditCard: ''
    });

    console.log('Reservation submitted successfully');
    onSuccessfulSubmission(reservationDetails); // Call the callback with reservation details


  
    
    alert("Reservation Form has been sucessfully submitted!")
  } catch (error) {
    console.error('Error submitting reservation:', error.message);
  }
};



  return (
    <div className="booking-container">
      {vehicle && (
        <div className="information-placeholder">
          {/* Display vehicle information */}
          <img src={vehicle.photos && vehicle.photos[0] ? vehicle.photos[0] : 'path/to/default/image.jpg'} alt={`${vehicle.make} ${vehicle.model}`} />
          <h3>{`${vehicle.yearOfManufacture} ${vehicle.make} ${vehicle.model}`}</h3>
          <p>Price: ${vehicle.price} per day</p>
          <ul className="vehicle-details">
            <li>Location: {vehicle.location}</li>
            <li>Color: {vehicle.color}</li>
            <li>Mileage: {vehicle.mileage}</li>
            <li>Transmission: {vehicle.transmissionType}</li>
            <li>Seating Capacity: {vehicle.seatingCapacity}</li>
            <li>Fuel Type: {vehicle.fuelType}</li>
            <li>Car Type: {vehicle.carType}</li>
            <li>Features: {vehicle.featuresAndAmenities.join(', ')}</li>
            <li>Total Price: {formData.rentalPrice}</li>
          </ul>

          {/* Add more vehicle details as needed */}
        </div>
      )}
      <form onSubmit={handleSubmit} className="booking-form">
        <h2>Booking Form</h2>
        {user.user.userType === 'system_administrator' ? 
        <div>
          <label htmlFor="userID">User ID:</label>
          <input type="text" id="userID" name="userID" value={formData.userID} onChange={handleChange} required />
        </div> : null
        }
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="email">Email:</label>{emailFormatError && <span style={{ color: 'red' }}>Please enter a valid email address.</span>}
          <input type="email" id="email" name="email" value={formData.email} onChange={handleEmailAddressChange} required />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>{phoneNumberFormatError && <span style={{ color: 'red' }}>Please enter a phone number in the correct format.</span>}
          <input type="tel" id="phone" name="phone" placeholder="XXX-XXX-XXXX" value={formData.phone} onChange={handlePhoneNumberChange} required />
        </div>
        <div>
          <label>Pickup Date:</label>{!validDates && <span style={{ color: 'red' }}>Please enter valid dates.</span>}
          <DatePicker
            selected={formData.pickupDate}
            onChange={(date) => handleDateChange(date, 'pickupDate')}
            filterDate={date => isDateDisabled(date, unavailableDates)}
            dateFormat="MM/dd/yyyy"
            minDate={new Date(new Date().setHours(0, 0, 0, 0))}
            
          />
        </div>
        <div>
          <label>Return Date:</label>
          <DatePicker
            selected={formData.returnDate}
            onChange={(date) => handleDateChange(date, 'returnDate')}
            filterDate={date => isDateDisabled(date, unavailableDates)}
            dateFormat="MM/dd/yyyy"
            minDate={new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </div>
        <div>
          <label htmlFor="driversLicenseNumber">Driving License Number:</label>{validLicense ? null : (<p style={{ color: 'red' }}>A valid Driver's License is 8 Alphanumeric Characters</p>)}
          <input type="text" id="driversLicenseNumber" name="driversLicenseNumber" value={formData.driversLicenseNumber} onChange={handleLicenseChange} required />
        </div>
        <div>
          <label htmlFor="creditCard">Credit Card Number:</label>{(!creditCardFormatError) ? null : (<p style={{ color: 'red' }}>Enter a valid credit card number</p>)}
          <input type="text" id="creditCard" name="creditCard" value={formData.creditCard} onChange={handleCreditCardChange} required />
        </div>
        <div className="terms-checkbox">
          <input
            type="checkbox"
            id="agreedToTerms"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            required // Makes checking this box obligatory
          />
          <label htmlFor="agreedToTerms">
            I agree to the <a href="/TermsAndConditions">Terms and Conditions</a>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BookingForm; 