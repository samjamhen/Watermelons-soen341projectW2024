import React from "react";
import "../../styles/VehicleCard.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function addInfoStyles(additionalInfoVisible) {
  return additionalInfoVisible ? { display: "block" } : { display: "none" };
}

function RequestCard({ vehicle, onSelectButtonClick }) {
  const [additionalInfoVisible, setAdditionalInfoVisible] =
    React.useState(false);
  const navigate = useNavigate(); // Create a navigate function

  const handleSelectButtonClick = () => {
    setAdditionalInfoVisible(true);
    onSelectButtonClick();
  };

  const handleDeleteRequest = () => {

};
  function handleAcceptRequest() {

}

  return (
    <div className="request-card">
      <img
        src={vehicle.photos[0] || "https://via.placeholder.com/150"}
        width="300"
        height="100"
        alt="Placeholder"
        className="vehicle-image"
      />
      <div className="vehicle-details">
        <h2 className="vehicle-title">
          {vehicle.make} {vehicle.model}
        </h2>
        <h3>status: {vehicle.status}</h3>
        <p className="vehicle-year">{vehicle.yearOfManufacture}</p>
        <p className="vehicle-price">Only {vehicle.price}$ per day</p>
        
        <p className="vehicle-mileage">Mileage: {vehicle.mileage}Km</p>
        <p className="vehicle-color">Color: {vehicle.color}</p>
        <p className="vehicle-transmission">
          Transmission: {vehicle.transmissionType}
        </p>
        <p>Location: {vehicle.location}</p>

            <p>Seating Capacity {vehicle.seatingCapacity}</p>
            <p>Fuel Type: {vehicle.fuelType}</p>
            <p>Car Type: {vehicle.carType}</p>
            <p>Car category: {vehicle.category}</p>
            <p>Features: {vehicle.featuresAndAmenities.join(", ")}</p>
            <br/>
            <p>{vehicle.rentalTermsAndConditions}</p> 
            <br/>
            <p>Special Requests from customer (if any): {vehicle.description}</p>

        {additionalInfoVisible && (
          <>
            <p className="vehicle-additional-info"> {vehicle.additionalInfo}</p>
            
            <button 
              className="select-button" 
              id="deny-request"
              onClick={handleDeleteRequest}>
              Deny Request
            </button>

            <button
              className="select-button"
              id="accept-request"
              onClick={handleAcceptRequest}
            >
              Accept Request
            </button>
          </>
        )}
        {!additionalInfoVisible && (
          <button className="select-button" onClick={handleSelectButtonClick}>
            Manage Customer Request
          </button>
        )}
      </div>
    </div>
  );
}

export default RequestCard;
