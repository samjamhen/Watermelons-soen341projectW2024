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
      <p className="vehicle-year">{vehicle.yearOfManufacture}</p>
      <p className="vehicle-price">Only {vehicle.price}$ per day</p>
      <p className="vehicle-mileage">Mileage: {vehicle.mileage}Km</p> 
      <p className="vehicle-color">Color: {vehicle.color}</p> 
      <p className="vehicle-transmission">Transmission: {vehicle.transmissionType}</p>     
      
        <button className="select-button" onClick={onSelectButtonClick}>View Additional Information</button>
    </div>
  </div>  
  
);
      }
export default VehicleCard;
