import React, {useState} from "react";
import axios from "axios";
import "../styles/RequestCard.css"

const RequestCard = ({vehicle, onCancel} ) =>{

    // Sample car data object
    //Connect with database "Vehicle-requests"
  const carData = {
    status: 'Pending',
    makeModel: 'Tesla Model 3',
    category: 'Sedan',
    year: 2020,
    mileage: 20000,
    color: 'Black',
    pricePerDay: 100,
  };

  const [isCancelled, setIsCancelled] = useState(false); 
  const handleCancelButton = async () => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this request?");

    if (!isConfirmed) {
      return;
    }

    try {
      const response = await axios.delete(`/api/vehicles/${vehicle._id}`);
      if (response.status === 200) {
        alert("Request canceled successfully");
        setIsCancelled(true); 
        onCancel(); 
      } 
      else {
        throw new Error("Failed to cancel request");
      }
    } catch (error) {
      console.error("Error canceling request:", error);
    }
  };

  if (isCancelled) {
    return null; // Return null to remove the card from the UI
  }

return(

    <div className="card">
    <div className="card-header">
      <h3>Request Status: {vehicle.status}</h3>
    </div>
    <div className="card-body">
      <h4> {vehicle.make}</h4>
      <p><strong>Category:</strong> {vehicle.category}</p>
      <p><strong>Year:</strong> {vehicle.year}</p>
      <p><strong>Mileage:</strong> {carData.mileage} miles</p>
      <p><strong>Color:</strong> {vehicle.color}</p>
      <p><strong>Price per Day:</strong> ${vehicle.price}</p>
    </div>
    <div className="card-footer">
    {!isCancelled && (
          <button onClick={handleCancelButton}>Cancel Request</button>
        )}
    </div>
  </div>
);

} 
export default RequestCard;