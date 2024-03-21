import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const RentalAgreement = () => {
  const location = useLocation();
  const fetchedReservation = location.state;

 console.log(fetchedReservation);
  return (
    <div className="rental-agreement">
      <h1>Car Rental Agreement</h1>
      <p>
        Rental Agreement Number: <span>{fetchedReservation._id}</span>
      </p>
      <p>
        This Rental Agreement ("Agreement") is entered into between <span>{/* Insert car rental agency name here */}</span>, located at <span>{/* Insert car rental agency address here */}</span>, hereinafter referred to as the "Rental Company," and the individual or entity identified below, hereinafter referred to as the "Renter":
      </p>
      <h2>Renter's Information:</h2>
      <p>Name: <span>{fetchedReservation.fullName}</span></p>
      <p>Address: <span>{/* Insert renter's address here */}</span></p>
      <p>Contact Number: <span>{fetchedReservation.phone}</span></p>
      <p>Email Address: <span>{fetchedReservation.email}</span></p>
      <p>Driver's License Number: <span>{fetchedReservation.driversLicenseNumber}</span></p>
      <h2>Vehicle Information:</h2>
      <p>Make: <span>{/* Insert vehicle make here */}</span></p>
      <p>Model: <span>{/* Insert vehicle model here */}</span></p>
      <p>Year: <span>{/* Insert vehicle year here */}</span></p>
      <p>License Plate Number: <span>{/* Insert vehicle license plate number here */}</span></p>
      <p>Vehicle Identification Number (VIN): <span>{/* Insert vehicle VIN here */}</span></p>
      <p>Color: <span>{/* Insert vehicle color here */}</span></p>
      <h2>Rental Details:</h2>
      <p>Rental Start Date: <span>{fetchedReservation.pickupDate}</span></p>
      <p>Rental End Date: <span>{fetchedReservation.returnDate}</span></p>
      <p>Pick-up Location: <span>{fetchedReservation.pickupAddress}</span></p>
      <p>Drop-off Location: <span>{/* Insert drop-off location here */}</span></p>
      <p>Rental Period: <span>{/* Insert rental period here */}</span></p>
      <p>Mileage Limit (if applicable): <span>{/* Insert mileage limit here */}</span></p>
      <p>Rental Rate: <span>{/* Insert rental rate here */}</span></p>
      <p>Additional Services (if any): <span>{/* Insert additional services here */}</span></p>
      <h2>Rental Terms and Conditions:</h2>
      <p>
        [You can customize this section based on your specific requirements]
      </p>
      <h2>Indemnification:</h2>
      <p>
        [You can customize this section based on your specific requirements]
      </p>
      <h2>Governing Law:</h2>
      <p>
        [You can customize this section based on your specific requirements]
      </p>
      <h2>Entire Agreement:</h2>
      <p>
        [You can customize this section based on your specific requirements]
      </p>
      <h2>Signatures:</h2>
      <p>
        The parties hereto have executed this Agreement as of the date first written above.
      </p>
      <p>
        Rental Company:
        <br />
        Signature: <span>{/* Insert rental company signature here */}</span>
        <br />
        Print Name: <span>{/* Insert rental company print name here */}</span>
        <br />
        Date: <span>{/* Insert rental company date here */}</span>
      </p>
      <p>
        Renter:
        <br />
        Signature: <span>{/* Insert renter's signature here */}</span> <br /> Print Name: <span>{fetchedReservation.fullName}</span> <br /> Date: <span>{/* Insert renter's date here */}</span>
      </p>
    </div>
  );
};

export default RentalAgreement;