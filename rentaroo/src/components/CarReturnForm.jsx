import React, { useState, useEffect } from 'react';
import '../styles/CarReturnForm.css';
import { useLocation, useNavigate } from 'react-router-dom';

const CarReturnForm = () => {
  const [showHomeButton, setShowHomeButton] = useState(false);
  const [damages, setDamages] = useState({
    left: false,
    right: false,
    front: false,
    back: false,
  });
  const [damagesDescription, setDamagesDescription] = useState('');
  const [previousDamages, setPreviousDamages] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const fetchedReservation = location.state.fetchedReservation; // Access fetchedReservation from location.state
  const navigate = useNavigate(); // Create a navigate function

  useEffect(() => {
    // Fetch previous damages from backend
    fetchPreviousDamages();
  }, []);

  const fetchPreviousDamages = async () => {
    try {
      // Perform fetch request to fetch previous damages
      // Replace the URL with your actual backend API endpoint
      const response = await fetch('/api/previous-damages');
      if (!response.ok) {
        throw new Error('Failed to fetch previous damages');
      }
      const data = await response.json();
      setPreviousDamages(data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleDamageChange = (part) => (e) => {
    setDamages({ ...damages, [part]: e.target.checked });
  };

  const handleDamagesDescriptionChange = (e) => {
    setDamagesDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isAnyDamageChecked = Object.values(damages).some((isDamage) => isDamage);

    if (!isAnyDamageChecked && !damagesDescription) {
      setError('At least one part must be checked or a description must be added.');
      return;
    }

    setError('');
    // Submit the form data here
    // You can include logic to send the damages and description to the backend
    // and handle the return process

    // Placeholder function call to send email
    sendEmail();

    // Navigate back to the checkout page
    navigate("/PaymentCheckout", { state: { fetchedReservation } });
  };

  const sendEmail = () => {
    // Placeholder function to send email
    console.log("Sending email...");
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h3>Inspection of a Customer's Rental Car Upon Return</h3>
        <div>
          <h3>Reservation Details:</h3>
          <p><strong>Full Name:</strong> {fetchedReservation.fullName}</p>
          <p><strong>Email:</strong> {fetchedReservation.email}</p>
          <p><strong>Return Date:</strong> {fetchedReservation.returnDate}</p>
        </div>
        <div className="label-checkbox">
          <label htmlFor="left">Left side of the vehicle:</label>
          <input
            type="checkbox"
            id="left"
            checked={damages.left}
            onChange={handleDamageChange('left')}
            required
          />
          <label className="acknowledge" htmlFor="left">I acknowledge inspecting this part of the car</label>
        </div>
        <div className="label-checkbox">
          <label htmlFor="right">Right side of the vehicle:</label>
          <input
            type="checkbox"
            id="right"
            checked={damages.right}
            onChange={handleDamageChange('right')}
            required
          />
          <label className="acknowledge" htmlFor="right">I acknowledge inspecting this part of the car</label>
        </div>
        <div className="label-checkbox">
          <label htmlFor="front">Front side of the vehicle:</label>
          <input
            type="checkbox"
            id="front"
            checked={damages.front}
            onChange={handleDamageChange('front')}
            required
          />
          <label className="acknowledge" htmlFor="front">I acknowledge inspecting this part of the car</label>
        </div>
        <div className="label-checkbox">
          <label htmlFor="back">Back side of the vehicle:</label>
          <input
            type="checkbox"
            id="back"
            checked={damages.back}
            onChange={handleDamageChange('back')}
            required
          />
          <label className="acknowledge" htmlFor="back">I acknowledge inspecting this part of the car</label>
        </div>
        {previousDamages ? (
          <div className="previous-damages">
            <h4>Previous Damages:</h4>
            <p>{previousDamages}</p>
          </div>
        ) : (
          <p>Previous Damages: None</p>
        )}
        <div>
          <label htmlFor="damages-description">Damages Description: (write none if the car is in a perfect state)</label>
          <textarea
            id="damages-description"
            value={damagesDescription}
            onChange={handleDamagesDescriptionChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CarReturnForm;

