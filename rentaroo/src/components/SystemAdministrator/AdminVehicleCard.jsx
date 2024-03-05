import React from 'react';
import '../../styles/VehicleCard.css';
import { onDeleteVehicleButtonClick } from './AdminCatalog';
import { onModifyVehicleButtonClick } from './AdminCatalog';

function AdminVehicleCard({
  vehicle,
}) {
  return (

    <div className="vehicle-card">
    <img src="" width="40" height="40" alt="Placeholder" className="vehicle-image" />
    <div className="vehicle-details">
      <h2 className="vehicle-title">{vehicle.make} {vehicle.model}</h2>
      <p className={`availability-status ${vehicle.availabilityStatus === 'available' ? 'available' : 'unavailable'}`}>
            {vehicle.availabilityStatus}
          </p>
          <p className="vehicle-year">{vehicle.yearOfManufacture}</p>
            <p className="vehicle-price">Daily rental cost: {vehicle.price}$ per day</p>
            <p className="vehicle-mileage">Mileage: {vehicle.mileage}Km</p> 
            <p className="vehicle-color">Color: {vehicle.color}</p> 
            <p className="vehicle-transmission">Transmission: {vehicle.transmissionType}</p>     
                
          <p>Seating Capacity {vehicle.seatingCapacity}</p>
          <p>Fuel Type: {vehicle.fuelType}</p>
          <p>Car Type: {vehicle.carType}</p>
          <p>Fuel Type: {vehicle.fuelType}</p>
          <p>Features: {vehicle.featuresAndAmenities.join(', ')}</p>

          <p>{vehicle.rentalTermsAndConditions}</p>



          <button className="select-button" id='delete-vehicle-button'onClick={() => onDeleteVehicleButtonClick(vehicle._id)}>Delete vehicle</button>        
          <button className="select-button" id='modify-vehicle-button'onClick={onModifyVehicleButtonClick()}>Modify Vehicle Details</button>    
    </div>
  </div>  
  
);
      }
export default AdminVehicleCard;
