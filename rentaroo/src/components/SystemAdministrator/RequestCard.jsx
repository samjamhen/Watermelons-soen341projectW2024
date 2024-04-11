import React, { useState, useEffect } from "react";
import "../../styles/VehicleCard.css";
import { useNavigate } from "react-router-dom";

function addInfoStyles(additionalInfoVisible) {
  return additionalInfoVisible ? { display: "block" } : { display: "none" };
}

function RequestCard({ vehicle, onSelectButtonClick }) {
  const [additionalInfoVisible, setAdditionalInfoVisible] =
    React.useState(false);
  const navigate = useNavigate();
  const [vehicleSelected, setVehicleSelected] = useState(null);
  const [frontChecked, setFrontChecked] = useState(false);
  const [backChecked, setBackChecked] = useState(false);
  const [rightChecked, setRightChecked] = useState(false);
  const [leftChecked, setLeftChecked] = useState(false);

  useEffect(() => {
    if (vehicle) {
      setVehicleSelected(vehicle);
    }
  }, [vehicle]);

  useEffect(() => {
    // Check if all checkboxes are checked
    if (frontChecked && backChecked && rightChecked && leftChecked) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [frontChecked, backChecked, rightChecked, leftChecked]);

  const [allChecked, setAllChecked] = useState(false);

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
        <br />
        <p>{vehicle.rentalTermsAndConditions}</p>
        <br />
        <p>Special Requests from customer (if any): {vehicle.description}</p>

        {additionalInfoVisible && (
          <>
            <p className="vehicle-additional-info"> {vehicle.additionalInfo}</p>
            <div className="request-digital-inspection">
              <h5>Before Accepting or Denying a custumer request, please proceed to the following digital inspection of photos uploaded by the customer.</h5>
              <h6>Digital Inspection is MANDATORY. You will not be able to accept or deny a request before proceeding to check each side of the vehicle.</h6>
              <table>
                <tbody>
                  <tr>
                    <td>
                    <table>
                        <tr>
                          <td>
                            <label htmlFor="frontSideCheckbox">Front side has been digitally inspected: </label>
                          </td>
                          <td>                      
                            <input type="checkbox" id="frontSideCheckbox" onChange={() => setFrontChecked(!frontChecked)} />
                          </td>
                        </tr>
                      </table>
                      <img
                        src={vehicle.frontphoto[0] || "https://via.placeholder.com/150"}
                        width="300"
                        height="100"
                        alt="Placeholder"
                        className="vehicle-image"
                      />
            
      
                    </td>
                    <td>
                    <table>
                        <tr>
                          <td>
                          <label htmlFor="backSideCheckbox">Back side has been digitally inspected: </label>
                          </td>
                          <td>                      
                          <input type="checkbox" id="backSideCheckbox" onChange={() => setBackChecked(!backChecked)} />
                          </td>
                        </tr>
                      </table>
                      <img
                        src={vehicle.backphoto[0] || "https://via.placeholder.com/150"}
                        width="300"
                        height="100"
                        alt="Placeholder"
                        className="vehicle-image"
                      />
                      
                    </td>
                  </tr>
                  <tr>
                    <td>
                    <table>
                        <tr>
                          <td>
                            <label htmlFor="rightSideCheckbox">Right side has been digitally inspected: </label>
                          </td>
                          <td>                      
                          <input type="checkbox" id="rightSideCheckbox" onChange={() => setRightChecked(!rightChecked)} />
                          </td>
                        </tr>
                      </table>                      <img
                        src={vehicle.rightphoto[0] || "https://via.placeholder.com/150"}
                        width="300"
                        height="100"
                        alt="Placeholder"
                        className="vehicle-image"
                      />
                   
                    </td>
                    <td>
                    <table>
                        <tr>
                          <td>
                            <label htmlFor="leftSideCheckbox">Left side has been digitally inspected: </label>
                          </td>
                          <td>                      
                          <input type="checkbox" id="leftSideCheckbox" onChange={() => setLeftChecked(!leftChecked)} />
                          </td>
                        </tr>
                      </table>                               <img
                        src={vehicle.leftphoto[0] || "https://via.placeholder.com/150"}
                        width="300"
                        height="100"
                        alt="Placeholder"
                        className="vehicle-image"
                      />
                  
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              className="select-button"
              id="deny-request"
              onClick={handleDeleteRequest}
              disabled={!allChecked} // Disable button if not all checkboxes are checked
            >
              Deny Request
            </button>

            <button
              className="select-button"
              id="accept-request"
              onClick={handleAcceptRequest}
              disabled={!allChecked} // Disable button if not all checkboxes are checked
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
