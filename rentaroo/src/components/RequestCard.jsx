import React from "react";
import "../styles/RequestCard.css"

const RequestCard = ( ) =>{

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

return(

    <div className="card">
    <div className="card-header">
      <h3>Request Status: {carData.status}</h3>
    </div>
    <div className="card-body">
      <h4> {carData.makeModel}</h4>
      <p><strong>Category:</strong> {carData.category}</p>
      <p><strong>Year:</strong> {carData.year}</p>
      <p><strong>Mileage:</strong> {carData.mileage} miles</p>
      <p><strong>Color:</strong> {carData.color}</p>
      <p><strong>Price per Day:</strong> ${carData.pricePerDay}</p>
    </div>
    <div className="card-footer">
      <button>Cancel Request</button>
    </div>
  </div>
);

} 
export default RequestCard;