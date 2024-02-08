import React, { useState, useEffect } from 'react';
import { getAvailableVehicles } from '../components/api/vehicles'; // Import API function to fetch available vehicles

function BrowseVehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch available vehicles when component mounts
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
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>{vehicle.make} {vehicle.model}</li>
        ))}
      </ul>
    </div>
  );
}

export default BrowseVehicles;
