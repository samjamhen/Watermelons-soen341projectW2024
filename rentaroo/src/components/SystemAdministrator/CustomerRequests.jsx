import React, { useState, useEffect } from 'react';
import RequestCard from "./RequestCard.jsx";

const CustomerRequest = () => {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    useEffect(() => {
        const fetchVehicles = async () => {
          try {
            const response = await fetch("/api/vehicles");
            if (!response.ok) {
              throw new Error("Failed to fetch vehicles");
            }
            const json = await response.json();

            const pendingVehicles = json.filter( vehicle =>vehicle.status === "pending");
            setVehicles(pendingVehicles);
          } catch (error) {
            console.error("Error fetching vehicles:", error);
          }
        };

        fetchVehicles();
      }, []);
      function handleSelectButtonClick(vehicle) {
        setSelectedVehicle(vehicle);
      }


    return (
        <div>
            <h2>Customer Requests</h2>
            {vehicles.filter(vehicle => vehicle.status).map((vehicle) => (
      <RequestCard
        key={vehicle._id}
        vehicle={vehicle}
        onSelectButtonClick={() => handleSelectButtonClick(vehicle)}
        selectedVehicle={selectedVehicle}
      />
            ))}
        </div>
    );
};

export default CustomerRequest;