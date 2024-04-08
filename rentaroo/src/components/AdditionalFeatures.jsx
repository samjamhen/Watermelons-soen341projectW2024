import React, { useState } from 'react';
import '../styles/AdditionalFeatures.css'; // Import the CSS file for styling

const AdditionalFeatures = ({ reservationDetails, onSubmit }) => {
  const [features, setFeatures] = useState({
    GPSNavigation: false,
    AdditionalDriver: false,
    PortableWiFiHotspot: false,
    SkiSnowboardRack: false,
    BikeRack: false,
    ChildSafetySeat: false,
  });

  const handleCheckboxChange = (feature) => {
    setFeatures({ ...features, [feature]: !features[feature] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Calculate the number of days
    const pickupDate = new Date(reservationDetails.pickupDate);
    const returnDate = new Date(reservationDetails.returnDate);
    const numberOfDays = Math.ceil((returnDate - pickupDate) / (1000 * 3600 * 24));
    const rentalPrice = reservationDetails.rentalPrice;

    // Calculate the total price of additional features
    let additionalFeaturesPrice = 0;
    if (features.GPSNavigation) additionalFeaturesPrice += 5 * numberOfDays;
    if (features.AdditionalDriver) additionalFeaturesPrice += 10 * numberOfDays;
    if (features.PortableWiFiHotspot) additionalFeaturesPrice += 10 * numberOfDays;
    if (features.SkiSnowboardRack) additionalFeaturesPrice += 15 * numberOfDays;
    if (features.BikeRack) additionalFeaturesPrice += 15 * numberOfDays;
    if (features.ChildSafetySeat) additionalFeaturesPrice += 15 * numberOfDays;

    const additionalFeaturesAsString = Object.keys(features).filter(key => features[key]).join(', ');
    const totalPrice = additionalFeaturesPrice + reservationDetails.rentalPrice

    console.log(additionalFeaturesAsString)
    console.log(additionalFeaturesPrice)

    // Here submit additional features and additionalfeatures price to backend
    try {
        // POST request to update reservation
        const response = await fetch(`/api/reservations/${reservationDetails._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({additionalFeaturesPrice : additionalFeaturesPrice, totalPrice : rentalPrice + additionalFeaturesPrice, additionalFeatures : additionalFeaturesAsString, totalPrice : totalPrice}),
        });    
        if (!response.ok) {
          throw new Error("Failed to update reservation");
        }
        
        alert('Reservation updated successfully');
        console.log('Reservation updated successfully');
    //  here add stuff to backend

    onSubmit();
      } catch (error) {
        console.error('Error updating additional features:', error.message);
    }
  };

  return (
    <div className="additional-features-container"> {/* Apply container class */}
      <h2>Additional Features</h2>
      <form onSubmit={handleSubmit}>
        {/* Use unordered list for better styling */}
        <ul className="features-list">
          <li>
            <label>
              <input
                type="checkbox"
                checked={features.GPSNavigation}
                onChange={() => handleCheckboxChange('GPSNavigation')}
              />
              GPS Navigation - $5/day
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={features.AdditionalDriver}
                onChange={() => handleCheckboxChange('AdditionalDriver')}
              />
              Additional Driver - $10/day
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={features.PortableWiFiHotspot}
                onChange={() => handleCheckboxChange('PortableWiFiHotspot')}
              />
              Portable Wi-Fi Hotspot - $10/day
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={features.SkiSnowboardRack}
                onChange={() => handleCheckboxChange('SkiSnowboardRack')}
              />
              Ski/Snowboard Rack - $15/day
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={features.BikeRack}
                onChange={() => handleCheckboxChange('BikeRack')}
              />
              Bike Rack - $15/day
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={features.ChildSafetySeat}
                onChange={() => handleCheckboxChange('ChildSafetySeat')}
              />
              Child Safety Seat - $15/day each
            </label>
          </li>
        </ul>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdditionalFeatures;
