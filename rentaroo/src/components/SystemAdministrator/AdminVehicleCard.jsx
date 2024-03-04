import React from "react";
import "../../styles/VehicleCard.css";
import { onDeleteVehicleButtonClick } from "./AdminCatalog";
import { useVehicleContext } from "../../hooks/useVehicleContext";
import ModifyVehicleForm from "./ModifyVehicleForm";

function AdminVehicleCard({
  vehicle,
  //onDeleteVehicleButtonClick,
  onModifyVehicleButtonClick,
}) {
  const { dispatch } = useVehicleContext();
  const handleClick = async () => {
    const response = await fetch("/api/vehicles/" + vehicle._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_VEHICLE", payload: vehicle._id });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/vehicles/" + vehicle._id, {
      method: "PATCH",
      body: JSON.stringify(vehicle), // Assuming vehicle is the updated vehicle object
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_VEHICLE", payload: vehicle._id });
      <ModifyVehicleForm vehicleId={vehicle._id} />;
    }
  };

  return (
    <div className="vehicle-card">
      <img
        src=""
        width="40"
        height="40"
        alt="Placeholder"
        className="vehicle-image"
      />
      <div className="vehicle-details">
        <h2 className="vehicle-title">
          {vehicle.make} {vehicle.model}
        </h2>
        <p
          className={`availability-status ${
            vehicle.availabilityStatus === "available"
              ? "available"
              : "unavailable"
          }`}
        >
          {vehicle.availabilityStatus}
        </p>
        <p className="vehicle-year">{vehicle.yearOfManufacture}</p>
        <p className="vehicle-price">
          Daily rental cost: {vehicle.price}$ per day
        </p>
        <p className="vehicle-mileage">Mileage: {vehicle.mileage}Km</p>
        <p className="vehicle-color">Color: {vehicle.color}</p>
        <p className="vehicle-transmission">
          Transmission: {vehicle.transmissionType}
        </p>

        <p>Seating Capacity {vehicle.seatingCapacity}</p>
        <p>Fuel Type: {vehicle.fuelType}</p>
        <p>Car Type: {vehicle.carType}</p>
        <p>Fuel Type: {vehicle.fuelType}</p>
        <p>Features: {vehicle.featuresAndAmenities.join(", ")}</p>
        <p>{vehicle.rentalTermsAndConditions}</p>

        <button
          className="select-button"
          id="delete-vehicle-button"
          onClick={handleClick}
        >
          Delete vehicle
        </button>
        <button
          className="select-button"
          id="modify-vehicle-button"
          onClick={handleSubmit}
        >
          Modify Vehicle Details
        </button>
      </div>
    </div>
  );
}

export default AdminVehicleCard;
