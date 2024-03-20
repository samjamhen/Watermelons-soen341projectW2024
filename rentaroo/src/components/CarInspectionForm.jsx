import React, { useState } from 'react';
import styles from '../styles/CarInspectionForm.module.css';
import { Link } from 'react-router-dom';

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

  const handleDamageChange = (part) => (e) => {
    setDamages({ ...damages, [part]: e.target.checked });
  };

  const handleDamagesDescriptionChange = (e) => {
    setDamagesDescription(e.target.value);
  };

  const handleSubmit = (e) => {
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

    setError('');
    // Submit the form data here
    // add a field to the reservation card to store the damages
    // will be needed at checkout
    
    
    setShowHomeButton(true); // Show the home button link

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
      </form>
      {showHomeButton && (
          <Link to="/">
            <button>Proceed to Rental Agreement</button>
          </Link>
)}
    </div>
  );
};

export default CarInspectionForm;