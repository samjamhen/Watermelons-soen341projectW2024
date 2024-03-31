// ReservationCard.js
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS
import "../../styles/SystemAdministrator/ClientManagement.css";
import { isDateDisabledModify } from "../utils/utils";
import { fetch } from "whatwg-fetch"; // Import fetch function

const ReservationCard = ({ reservation, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [emailFormatError, setEmailFormatError] = useState(false);
  const [phoneNumberFormatError, setPhoneNumberFormatError] = useState(false);
  const [editedData, setEditedData] = useState({
    ...reservation,
    pickupDate: new Date(reservation.pickupDate),
    returnDate: new Date(reservation.returnDate),
    rentalPrice: reservation.rentalPrice
  });
  const [validDates, setValidDates] = useState(true)
  const pricePerDay = (reservation.rentalPrice) / (
    (reservation.pickupDate && reservation.returnDate) ? 
    Math.ceil(((new Date(reservation.returnDate)) - (new Date(reservation.pickupDate))) / (1000 * 60 * 60 * 24) + 1) :
    1
  );
  
  const [validLicense, setValidLicense] = useState(true);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [reservationDates, setReservationDates] = useState([]);
  const [creditCardFormatError, setCreditCardFormatError] = useState(false)
  const [checkoutSessionId, setCheckoutSessionId] = useState("");

  useEffect(() => {
    // Construct an array containing all dates within the reservation range
    const dates = [];
    let currentDate = new Date(editedData.pickupDate);
    while (currentDate <= editedData.returnDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setReservationDates(dates);
  }, [editedData]);

  const handleDeleteClick = () => {
    onDelete(editedData._id);
  };

  // Handle date picker changes
  const handleDateChange = (date, name) => {
    setEditedData({ ...editedData, [name]: date || new Date() });
  };

  const formattedReturnDate = `${editedData.returnDate.getFullYear()}/${editedData.returnDate.getMonth() + 1}/${editedData.returnDate.getDate()}`;
  const formattedPickupDate = `${editedData.pickupDate.getFullYear()}/${editedData.pickupDate.getMonth() + 1}/${editedData.pickupDate.getDate()}`;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `/api/reservations/vehicle/${reservation.vehicle}`
        );
        if (response.ok) {
          const reservations = await response.json();
          const dates = reservations.map((reservation) => ({
            startDate: new Date(reservation.pickupDate),
            endDate: new Date(reservation.returnDate),
          }));
          setUnavailableDates(dates);
        } else {
          console.error("Failed to fetch reservations");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    fetchReservations();
  }, [editedData]);

  useEffect(() => {
    if (editedData.pickupDate && editedData.returnDate) {

      const differenceInMilliseconds = editedData.returnDate - editedData.pickupDate;
      // Convert the difference to days and round up using Math.ceil()
      const differenceInDays = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
      // Calculate the rentalPrice
      const rentalPrice = pricePerDay * (differenceInDays + 1);
      // Update the formData with the new rentalPrice
      const totalPrice = rentalPrice + (editedData.additionalFeaturesPrice || 0);
      setEditedData(prevData => ({
      ...prevData,
      rentalPrice: rentalPrice,
      totalPrice : totalPrice
      }));

    }
  }, [editedData.pickupDate, editedData.returnDate]);
  
  
  // Handler for creating a checkout session
  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/stripepayment/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reservationId: editedData._id }),
        }
      );
      if (response.ok) {
        const json = await response.json();
        setCheckoutSessionId(json.sessionId);
        window.location.href = json.url;
        console.log("Checkout session created successfully");
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const handleSaveClick = async (e) => {
    e.preventDefault();

    if (editedData.returnDate < editedData.pickupDate) {
      setValidDates(false);
      return;
    }

      if(!validLicense || phoneNumberFormatError || emailFormatError || creditCardFormatError){
        return
      }
    try {
      // POST request to update reservation
      const response = await fetch(`/api/reservations/${editedData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update reservation");
      }
      
      setValidLicense(true);
      setIsEditing(false);
      setValidDates(true);
      setPhoneNumberFormatError(false)
      setEmailFormatError(false)
      setCreditCardFormatError(false)
      alert('Reservation updated successfully');
      console.log('Reservation updated successfully');
    } catch (error) {
      console.error("Error updating reservation:", error.message);
    }
  };

  const handleCancelClick = () => {
    // Convert pickupDate and returnDate to Date objects before resetting editedData
    const resetData = {
      ...reservation,
      pickupDate: new Date(reservation.pickupDate),
      returnDate: new Date(reservation.returnDate),
    };

    // Reset editedData to original values
    setValidLicense(true);
    setEditedData(resetData);
    setIsEditing(false);
    setValidDates(true);
    setPhoneNumberFormatError(false)
    setEmailFormatError(false)
    setCreditCardFormatError(false)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreditCardChange = (e) => {
    const { name, value } = e.target;
    // Regular expression to validate credit card numbers
    const creditCardRegex = /^(?:3[47]\d{13}|(?:4\d|5[1-5]|65)\d{14}|6011\d{12}|(?:2131|1800)\d{11})$/;
    if (creditCardRegex.test(value)) {
      setCreditCardFormatError(false); 
    } else {
      setCreditCardFormatError(true);
    }
    setEditedData((prevData) => ({
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

    setEditedData((prevData) => ({
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

    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLicenseChange = (e) => {
    const { name, value } = e.target;
    if (/^[A-Za-z0-9]{8}$/.test(value)) {
      setValidLicense(true);
    } else {
      setValidLicense(false);
    }

    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="client-etiquette">
      <div className="client-info">
        <p>
          <strong>Reservation ID:</strong> {reservation._id}
        </p>
        <p>
          <strong>Vehicle ID:</strong> {reservation.vehicle}
        </p>
        <p>
          <strong>User ID:</strong> {reservation.userID}
        </p>
        {isEditing ? (
          <>
            <p>
              <strong>Name:</strong>{" "}
              <input
                type="text"
                name="fullName"
                value={editedData.fullName}
                onChange={handleChange}
              />
            </p>

            <p>
              <strong>Email Address:</strong>{" "}
              <input
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleEmailAddressChange}
              />
            </p>
            {emailFormatError && (
              <span style={{ color: "red" }}>
                Please enter a valid email address.
              </span>
            )}

            <p>
              <strong>Phone Number: (xxx-xxx-xxxx)</strong>{" "}
              <input
                type="tel"
                name="phone"
                value={editedData.phone}
                onChange={handlePhoneNumberChange}
              />
            </p>
            {phoneNumberFormatError && (
              <span style={{ color: "red" }}>
                Please enter a phone number in the correct format.
              </span>
            )}

            <p>
              <strong>Pickup Address:</strong>{reservation.pickupAddress}
            </p>

            <p>
              <strong>Pickup Date:</strong>
              {validDates ? null : (
                <p style={{ color: "red" }}>
                  Pickup Date must be before return Date.
                </p>
              )}
              <DatePicker
                selected={new Date(editedData.pickupDate)}
                onChange={(date) => handleDateChange(date, "pickupDate")}
                minDate={new Date()}
                filterDate={(date) =>
                  isDateDisabledModify(date, unavailableDates, reservationDates)
                }
                dateFormat="YYYY-MM-dd"
                required
              />
            </p>

            <p>
              <strong>Return Date:</strong>
              <DatePicker
                selected={new Date(editedData.returnDate)}
                onChange={(date) => handleDateChange(date, "returnDate")}
                minDate={new Date()}
                filterDate={(date) =>
                  isDateDisabledModify(date, unavailableDates, reservationDates)
                }
                dateFormat="YYYY-MM-dd"
                required
              />
            </p>

            <p>
              <strong>Driver's License:</strong>
              {validLicense ? null : (
                <p style={{ color: "red" }}>
                  A valid Driver's License is 8 Alphanumeric Characters
                </p>
              )}
              <input
                type="text"
                name="driversLicenseNumber"
                value={editedData.driversLicenseNumber}
                onChange={handleLicenseChange}
              />
            </p>

            <p>
              <strong>Credit Card Number:</strong>{(!creditCardFormatError) ? null : (<p style={{ color: 'red' }}>Enter a valid credit card number</p>)}
              <input type="text" name="creditCard" value={editedData.creditCard} onChange={handleCreditCardChange}/>
            </p>

          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {editedData.fullName}
            </p>

            <p>
              <strong>Email Address:</strong> {editedData.email}
            </p>

            <p>
              <strong>Phone Number:</strong> {editedData.phone}
            </p>

            <p>
              <strong>Pickup Address:</strong> {editedData.pickupAddress}
            </p>

            <p>
              <strong>Pickup Date:</strong> {formattedPickupDate}
            </p>

            <p>
              <strong>Return Date:</strong> {formattedReturnDate}
            </p>

            <p>
              <strong>Driver's License:</strong>{" "}
              {editedData.driversLicenseNumber}
            </p>

            <p>
              <strong>Credit Card Number:</strong> {editedData.creditCard}
            </p>

          </>
        )}
        <p>
          <strong>Rental Price:</strong> {editedData.rentalPrice}
        </p>
        <p>
          <strong>Additional Price: </strong> {editedData.additionalFeaturesPrice}
        </p>
        <p>
          <strong> Total Price:</strong> {(editedData.rentalPrice + editedData.additionalFeaturesPrice)}
        </p>
      </div>
      <div className="client-actions">
        {isEditing ? (
          <>
            <button className="info-button" onClick={handleSaveClick}>
              Save
            </button>
            <button className="delete-button" onClick={handleCancelClick}>
              Cancel
            </button>
          </>
        ) : (
          <button className="info-button" onClick={() => setIsEditing(true)}>
            Modify
          </button>
        )}
        <button className="delete-button" onClick={handleDeleteClick}>
          Delete Reservation
        </button>
        <button onClick={handleCheckout}>Process Payment</button>
      </div>
    </div>
  );
};

export default ReservationCard;
