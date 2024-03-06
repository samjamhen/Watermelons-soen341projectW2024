import React, { useState } from "react";
import "../../styles/VehicleCard.css";
// import { onDeleteVehicleButtonClick } from "./AdminCatalog";
import { useVehicleContext } from "../../hooks/useVehicleContext";
import { onModifyVehicleButtonClick } from "./AdminCatalog";

function AdminVehicleCard({ vehicle }) {
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
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedVehicle, setEditedVehicle] = useState(vehicle);

  const handleModifyClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Perform saving logic here, such as updating the data in the backend
    // using editedVehicle to call onModifyVehicleButtonClick funtion to savse new vehicle data in database
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Reset editedVehicle to original values
    setEditedVehicle(vehicle);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedVehicle((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // return (

  //   if (response.ok) {
  //     dispatch({ type: "UPDATE_VEHICLE", payload: vehicle._id });
  //     <ModifyVehicleForm vehicleId={vehicle._id} />;
  //   }
  // };

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
          {isEditing ? (
            <h2>
              <input
                type="text"
                name="make"
                value={editedVehicle.make}
                onChange={handleChange}
              />{" "}
              <input
                type="text"
                name="model"
                value={editedVehicle.model}
                onChange={handleChange}
              />
            </h2>
          ) : (
            <>
              {editedVehicle.make} {editedVehicle.model}
            </>
          )}
        </h2>
        <p
          className={`availability-status ${
            editedVehicle.availabilityStatus === "available"
              ? "available"
              : "unavailable"
          }`}
        >
          {isEditing ? (
            <input
              type="text"
              name="availabilityStatus"
              value={editedVehicle.availabilityStatus}
              onChange={handleChange}
            />
          ) : (
            editedVehicle.availabilityStatus
          )}
        </p>
        <p className="vehicle-year">
          {isEditing ? (
            <input
              type="number"
              name="yearOfManufacture"
              value={editedVehicle.yearOfManufacture}
              onChange={handleChange}
            />
          ) : (
            <>{editedVehicle.yearOfManufacture}</>
          )}
        </p>
        <p className="vehicle-price">
          {" "}
          Daily rental cost:{" "}
          {isEditing ? (
            <input
              type="number"
              name="price"
              value={editedVehicle.price}
              onChange={handleChange}
            />
          ) : (
            <>{editedVehicle.price}$ per day</>
          )}
        </p>
        <p className="vehicle-mileage">
          {" "}
          Mileage:{" "}
          {isEditing ? (
            <input
              type="number"
              name="mileage"
              value={editedVehicle.mileage}
              onChange={handleChange}
            />
          ) : (
            <>{editedVehicle.mileage}Km</>
          )}
        </p>
        <p className="vehicle-color">Color: {vehicle.color}</p>
        <p className="vehicle-transmission">
          Transmission: {vehicle.transmissionType}
        </p>

        <p className="vehicle-color">
          Color:{" "}
          {isEditing ? (
            <input
              type="text"
              name="color"
              value={editedVehicle.color}
              onChange={handleChange}
            />
          ) : (
            editedVehicle.color
          )}
        </p>
        <p className="vehicle-transmission">
          Transmission:{" "}
          {isEditing ? (
            <input
              type="text"
              name="transmissionType"
              value={editedVehicle.transmissionType}
              onChange={handleChange}
            />
          ) : (
            editedVehicle.transmissionType
          )}
        </p>
        <p>
          Seating Capacity{" "}
          {isEditing ? (
            <input
              type="number"
              name="seatingCapacity"
              value={editedVehicle.seatingCapacity}
              onChange={handleChange}
            />
          ) : (
            editedVehicle.seatingCapacity
          )}
        </p>
        <p>
          Fuel Type:{" "}
          {isEditing ? (
            <input
              type="text"
              name="fuelType"
              value={editedVehicle.fuelType}
              onChange={handleChange}
            />
          ) : (
            editedVehicle.fuelType
          )}
        </p>
        <p>
          Car Type:{" "}
          {isEditing ? (
            <input
              type="text"
              name="carType"
              value={editedVehicle.carType}
              onChange={handleChange}
            />
          ) : (
            editedVehicle.carType
          )}
        </p>
        <p>
          {" "}
          Features:{" "}
          {isEditing ? (
            <input
              type="text"
              name="featuresAndAmenities"
              value={editedVehicle.featuresAndAmenities.join(", ")}
              onChange={(e) => {
                const value = e.target.value;
                const features = value.split(",");
                setEditedVehicle((prevData) => ({
                  ...prevData,
                  featuresAndAmenities: features,
                }));
              }}
            />
          ) : (
            vehicle.featuresAndAmenities.join(", ")
          )}
        </p>
        <p> {vehicle.rentalTermsAndConditions} </p>

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
          onClick={handleModifyClick}
        >
          Modify Vehicle Details
        </button>
        {isEditing && (
          <button
            className="select-button"
            id="save-vehicle-button"
            onClick={handleSaveClick}
          >
            Save
          </button>
        )}
        {isEditing && (
          <button
            className="select-button"
            id="cancel-vehicle-button"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminVehicleCard;
