import React from 'react';
import VehicleCard from './VehicleCard';
import '../styles/VehiclesList.css';

function VehiclesList({ vehicles }) {
  return (
    <div className="vehicles-list">
      {vehicles.map(vehicle => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}

export default VehiclesList;
