import React from 'react';
import '../styles/VehicleCard.css';

function VehicleCard({ vehicle }) {
  return (

    <div className="vehicle-card">
  <img src="" width="40" height="40" alt="Placeholder" className="vehicle-image" />
  <div className="vehicle-details">
    <h2 className="vehicle-title">{vehicle.make} {vehicle.model}</h2>
    <p className="vehicle-year">{vehicle.year}</p>
    <p className="vehicle-price">Only {vehicle.price}$ per day</p>
    <p className="vehicle-mileage">Mileage: {vehicle.mileage}Km</p>   
    <p className="vehicle-color">Color: {vehicle.color}</p>   
    
    <button className="select-button">Select</button>
  </div>
</div>

    //<div className="vehicle-card">
    //  <h3></h3>
    //  <p>ID: </p>
    //  {/* Add more vehicle details as needed, and picture */}
    //</div> 
  );
}

export default VehicleCard;
