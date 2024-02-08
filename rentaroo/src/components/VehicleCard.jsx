import React from 'react';
import '../styles/VehicleCard.css';

function VehicleCard({ vehicle }) {
  return (
    <div className="vehicle-card">
      <h3>{vehicle.make} {vehicle.model}</h3>
      <p>ID: {vehicle.id}</p>
      {/* Add more vehicle details as needed, and picture */}
    </div>
  );
}

export default VehicleCard;
