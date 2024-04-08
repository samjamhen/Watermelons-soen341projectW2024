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
            setVehicles(json);
          } catch (error) {
            console.error("Error fetching vehicles:", error);
          }
        };

        fetchVehicles();
      }, []);
      function handleSelectButtonClick(vehicle) {
        setSelectedVehicle(vehicle);
      }

      function handlePopupCloseButtonClick() {
        setSelectedVehicle(null);
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
        handlePopupCloseButtonClick={handlePopupCloseButtonClick}
      />
            ))}
        </div>
    );
};

export default CustomerRequest;