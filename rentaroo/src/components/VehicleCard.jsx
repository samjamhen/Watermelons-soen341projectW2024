import React from "react";
import "../styles/VehicleCard.css";

function VehicleCard({ vehicle }) {
  return (
    <div className="vehicle-card">
      <h3>
        {vehicle.make} {vehicle.model}
      </h3>
      <p>ID: {vehicle._id}</p>
      <p>
        <strong>Vehicle Make:</strong> {vehicle.make}
      </p>
      <p>
        <strong>Vehicle Model:</strong> {vehicle.model}
      </p>
      <p>
        <strong>Vehicle YOM:</strong> {vehicle.yearOfManufacture}
      </p>
      <p>
        <strong>Vehicle Mileage:</strong> {vehicle.mileage}
      </p>
      <p>
        <strong>Vehicle Type:</strong> {vehicle.carType}
      </p>
      <p>
        <strong>Transmission Type:</strong> {vehicle.transmissionType}
      </p>
      <p>
        <strong>Fuel Type:</strong> {vehicle.fuelType}
      </p>
      <p>
        <strong>Seating Capacity:</strong> {vehicle.seatingCapacity}
      </p>
      <p>
        <strong>Features and Amenities:</strong> {vehicle.featuresAndAmenities}
      </p>
      <p>
        <strong>Rental Terms and Conditions:</strong>{" "}
        {vehicle.rentalTermsAndConditions}
      </p>
      <p>
        <strong>Photos:</strong> {vehicle.photos}
      </p>
      <p>
        <strong>Location:</strong> {vehicle.location}
      </p>
      <p>
        <strong>Availability Status:</strong> {vehicle.availabilityStatus}
      </p>
      {/* Add more vehicle details as needed, and picture */}
    </div>
  );
}

export default VehicleCard;
