import React, { useState, useEffect } from 'react';
import styles from '../styles/CarInspectionForm.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const CarInspectionForm = () => {
  const [showHomeButton, setShowHomeButton] = useState(false);
  const [damages, setDamages] = useState({
    left: false,
    right: false,
    front: false,
    back: false,
  });
  const [damagesDescription, setDamagesDescription] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const fetchedReservation = location.state;
  console.log(fetchedReservation.fetchedReservation._id)
  const navigate = useNavigate(); // Create a navigate function
 
  const handleDamageChange = (part) => (e) => {
    setDamages({ ...damages, [part]: e.target.checked });
  };

  const handleDamagesDescriptionChange = (e) => {
    setDamagesDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isAnyDamageChecked = Object.values(damages).some((isDamage) => isDamage);

    if (!isAnyDamageChecked) {
      setError('At least one part must be checked.');
      return;
    }

    if (!damagesDescription) {
      setError('Damages description is required.');
      return;
    }

    try{
      console.log(fetchedReservation.fetchedReservation._id)
      const response = await fetch(`api/reservations/${fetchedReservation.fetchedReservation._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({previousDamages : damagesDescription})
      });

      if(!response.ok){
        throw new Error('Failed to update reservation');
      }
      console.log('Reservation updated succesfully');
    } catch (error){
      console.error('Error updating reservation: ', error.message)
    }

    setError('');
    // Submit the form data here
    // add a field to the reservation card to store the damages
    // will be needed at checkout
    
    
    setShowHomeButton(true); // Show the home button link

  };
  const handleSelectButtonClick = () => {
    navigate("/RentalAgreement", { state: { fetchedReservation } });

  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>Inspection of a Customers Rental Car</h3>
        <h5>Please present this form to the client and ask him to proceed to the inspection of the car. Closely supervise and assist the customers inspection.</h5>
        <div className={styles.box}>
          <label htmlFor="left">Left side of the vehicle:</label>
          <input className={styles.checkbox}
            type="checkbox"
            id="left"
            checked={damages.left}
            onChange={handleDamageChange('left')}
            required
          />
          <label className = "acknowledge" htmlFor="left">I acknowledge inspecting this part of the car</label>
        </div>
        <div className={styles.box}>
          <label htmlFor="right">Right side of the vehicle:</label>
          <input className={styles.checkbox}
            type="checkbox"
            id="right"
            checked={damages.right}
            onChange={handleDamageChange('right')}
            required
          />
          <label className = "acknowledge" htmlFor="right">I acknowledge inspecting this part of the car</label>
        </div>
        <div className={styles.box}>
          <label htmlFor="front">Front side of the vehicle:</label>
          <input className={styles.checkbox}
            type="checkbox"
            id="front"
            checked={damages.front}
            onChange={handleDamageChange('front')}
            required
          />
          <label  className = "acknowledge" htmlFor="front">I acknowledge inspecting this part of the car</label>
        </div>
        <div className={styles.box}>
          <label htmlFor="back">Back side of the vehicle:</label>
          <input className={styles.checkbox}
            type="checkbox"
            id="back"
            checked={damages.back}
            onChange={handleDamageChange('back')}
            required
          />
          <label  className = "acknowledge" htmlFor="back">I acknowledge inspecting this part of the car</label>
        </div>
        <div>
          <label htmlFor="damages-description">Damages Description: (write none if the car is in a perfect state)</label>
          <h6></h6>
          <textarea
            id="damages-description"
            value={damagesDescription}
            onChange={handleDamagesDescriptionChange}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Submit</button>
        {showHomeButton && (
          <button className={styles.rental} onClick={handleSelectButtonClick}>
          Proceed to Rental Agreement</button>
      )}
      </form>
    </div>
  );
};

export default CarInspectionForm;