import React, { useState } from "react";
import { useVehicleContext } from "../../hooks/useVehicleContext";

const ModifyVehicleForm = ({ vehicleId }) => {
  const { dispatch } = useVehicleContext();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [carType, setCarType] = useState("");
  const [transmissionType, setTransmissionType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [featuresAndAmenities, setFeaturesAndAmenities] = useState("");
  const [rentalTermsAndConditions, setRentalTermsAndConditions] = useState("");
  const [location, setLocation] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [yearOfManufacture, setYearOfManufacture] = useState("");
  const [mileage, setMileage] = useState("");
  const [price, setPrice] = useState("");
  const [photos, setPhotos] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updatedVehicle = {
      make,
      model,
      color,
      carType,
      transmissionType,
      fuelType,
      seatingCapacity,
      featuresAndAmenities,
      rentalTermsAndConditions,
      location,
      availabilityStatus,
      yearOfManufacture,
      mileage,
      price,
      photos: photos.split(",").map((photo) => photo.trim()), // Convert string to array
    };

    try {
      const response = await fetch(`/api/vehicles/${vehicleId}`, {
        method: "PATCH",
        body: JSON.stringify(updatedVehicle),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      // Handle success response
    } catch (error) {
      setError("An error occurred while updating the vehicle.");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Input fields for vehicle properties */}
      <button type="submit">Update Vehicle</button>
      {error && <div className="alert alert-danger">{error}</div>}
    </form>
  );
};

export default ModifyVehicleForm;
