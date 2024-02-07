import React, { useState, useEffect } from 'react';
import { getAvailableVehicles } from './api/vehicles';
import VehiclesList from './VehiclesList'; // Import the VehiclesList component

function BrowseVehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    getAvailableVehicles()
      .then((data) => {
        setVehicles(data);
      })
      .catch((error) => {
        console.error('Error fetching available vehicles:', error);
      });
  }, []);

  return (
    <div>
      <h2>Browse Available Vehicles</h2>
      <VehiclesList vehicles={vehicles} /> {/* Use the VehiclesList component */}
    </div>
  );
}

export default BrowseVehicles;
