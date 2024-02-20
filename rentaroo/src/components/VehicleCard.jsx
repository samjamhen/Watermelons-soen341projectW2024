import React from 'react';
import '../styles/VehicleCard.css';

function VehicleCard({
  vehicle,
  onSelectButtonClick,
  selectedVehicle,
  isPopupVisible,
  handlePopupCloseButtonClick,
  handleBookNowButtonClick,
}) {
  return (
  
    <div className="vehicle-card">
    <img src="" width="40" height="40" alt="Placeholder" className="vehicle-image" />
    <div className="vehicle-details">
      <h2 className="vehicle-title">{vehicle.make} {vehicle.model}</h2>
      <p className="vehicle-year">{vehicle.year}</p>
      <p className="vehicle-price">Only {vehicle.price}$ per day</p>
      <p className="vehicle-mileage">Mileage: {vehicle.mileage}Km</p> 
      <p className="vehicle-color">Color: {vehicle.color}</p> 
      <p className="vehicle-transmission">Transmission: {vehicle.transmission}</p>     
      {selectedVehicle && isPopupVisible && selectedVehicle.id === vehicle.id && (
          <div className="popup">
            <button onClick={handlePopupCloseButtonClick}>Close</button>
            <h2>{`${vehicle.year} ${vehicle.make} ${vehicle.model}`}</h2>
            <p>Color: {vehicle.color}</p>
            <p>Mileage: {vehicle.mileage}</p>
            <p>Price: ${vehicle.price}</p>
            <p>Transmission: {vehicle.transmission}</p>
            <button onClick={handleBookNowButtonClick}>Book Now</button>
          </div>
        )}
        <button className="select-button" onClick={onSelectButtonClick}>Select</button>
    </div>
  </div>  
);
      }
export default VehicleCard;
