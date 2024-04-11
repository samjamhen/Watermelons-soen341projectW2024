import React, { useState, useEffect } from "react";
import "../../styles/VehicleCard.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function addInfoStyles(additionalInfoVisible) {
  return additionalInfoVisible ? { display: "block" } : { display: "none" };
}

function RequestCard({ vehicle, onSelectButtonClick }) {
  const [additionalInfoVisible, setAdditionalInfoVisible] =
    React.useState(false);
  const navigate = useNavigate(); // Create a navigate function
  const [vehicleSelected, setVehicleSelected] = useState(null);

  useEffect(() => {
    if (vehicle) {
      setVehicleSelected(vehicle);
    }
  }, [vehicle]);


  const handleSelectButtonClick = () => {
    setAdditionalInfoVisible(true);
    onSelectButtonClick();
  };

  const handleDeleteRequest = async () => {
    //send email to customer, then delete the whole created vehicle from database
    try {
      if (window.confirm("Are you sure you want to delete this vehicle?")) {
        const response = await fetch(`/api/vehicles/${vehicle._id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error("Failed to delete reservation");
        }
        alert("Vehicle refused succesfully");
      }
    } catch (error) {
      console.error("Error deleting reservation:", error.message);
    }
  };
  
  const handleAcceptRequest = async () => {
    // send an email to customer and change vehicle status to "available in database"
    // POST request to update the reservation's final price
    const response = await fetch(`/api/vehicles/${vehicle._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: "approved" }),
    });

    if (!response.ok) {
      throw new Error('Failed to update vehicle status');
    }
    alert("Adding vehicle to catalog")
    console.log('Vehicle status updated successfully');

    alert("Vehicle succesfully added");
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
            <div className="request-digital-inspection">
              <table>
                <tr>
                  <td>
                    Front Side: {vehicle.frontphoto}
                  </td>
                  <td>
                    Back Side: 
                  </td>
                  <td>
                    Right Side: 
                  </td>
                  <td>
                    Left Side: 
                  </td>
                 
                </tr>
              </table>
            </div>
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
