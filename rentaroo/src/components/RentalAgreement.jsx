import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const RentalAgreement = () => {
  const location = useLocation();
  const fetchedReservation = location.state;
  const [user, setUser] = useState(null);

  console.log(fetchedReservation);
  console.log("...");
  console.log(fetchedReservation.fetchedReservation.fetchedReservation._id);
  const reservation = fetchedReservation.fetchedReservation.fetchedReservation;
  
  useEffect(() => {
    if (fetchedReservation && fetchedReservation.userID) {
      fetch(`/api/users/${fetchedReservation.userID}`)
        .then(response => response.json())
        .then(data => setUser(data));
    }
  }, [fetchedReservation]);

  console.log('user');
  console.log(user);
  if (!fetchedReservation) {
    return <div>Loading...</div>;
  }
  const handleSubmit = () =>{

  }
  
  
  if (!fetchedReservation) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="rental-agreement">
      <h1>Car Rental Agreement</h1>
      <p>
        Rental Agreement Number: <span>{reservation._id}</span>
      </p>
      <p>
        This Rental Agreement ("Agreement") is entered into between <span>{/* Insert car rental agency name here */}</span>, located at <span>{/* Insert car rental agency address here */}</span>, hereinafter referred to as the "Rental Company," and the individual or entity identified below, hereinafter referred to as the "Renter":
      </p>
      <h2>Renter's Information:</h2>
      <p>Name: <span>{reservation.fullName}</span></p>
      <p>Address: <span>{/* Insert renter's address here */}</span></p>
      <p>Contact Number: <span>{reservation.phone}</span></p>
      <p>Email Address: <span>{reservation.email}</span></p>
      <p>Driver's License Number: <span>{reservation.driversLicenseNumber}</span></p>
      <h2>Vehicle Information:</h2>
      <p>Make: <span>{/* Insert vehicle make here */}</span></p>
      <p>Model: <span>{/* Insert vehicle model here */}</span></p>
      <p>Year: <span>{/* Insert vehicle year here */}</span></p>
      <p>License Plate Number: <span>{/* Insert vehicle license plate number here */}</span></p>
      <p>Vehicle Identification Number (VIN): <span>{/* Insert vehicle VIN here */}</span></p>
      <p>Color: <span>{/* Insert vehicle color here */}</span></p>
      <h2>Rental Details:</h2>
      <p>Rental Start Date: <span>{reservation.pickupDate}</span></p>
      <p>Rental End Date: <span>{reservation.returnDate}</span></p>
      <p>Pick-up Location: <span>{reservation.pickupAddress}</span></p>
      <p>Drop-off Location: <span>{/* Insert drop-off location here */}</span></p>
      <p>Rental Period: <span>{/* Insert rental period here */}</span></p>
      <p>Mileage Limit (if applicable): <span>{/* Insert mileage limit here */}</span></p>
      <p>Rental Rate: <span>{/* Insert rental rate here */}</span></p>
      <p>Additional Services (if any): <span>{/* Insert additional services here */}</span></p>
      <h2>Rental Terms and Conditions:</h2>
      <p>
        The Renter acknowledges receiving the vehicle described above in good condition and agrees to return it to the Rental Company in the same condition, subject to normal wear and tear.
        <br></br>The Renter agrees to use the vehicle solely for personal or business purposes and not for any illegal activities.
        <br></br>The Renter agrees to pay the Rental Company the agreed-upon rental rate for the specified rental period. Additional charges may apply for exceeding the mileage limit, late returns, fuel refueling, or other damages.
        <br></br>The Renter agrees to bear all costs associated with traffic violations, tolls, and parking fines incurred during the rental period.
        <br></br>The Renter acknowledges that they are responsible for any loss or damage to the vehicle, including theft, vandalism, accidents, or negligence, and agrees to reimburse the Rental Company for all repair or replacement costs.
        <br></br>The Renter agrees to return the vehicle to the designated drop-off location at the agreed-upon date and time. Failure to do so may result in additional charges.
        <br></br>The Rental Company reserves the right to terminate this agreement and repossess the vehicle without prior notice if the Renter breaches any terms or conditions of this agreement.
        <br></br>The Renter acknowledges receiving and reviewing a copy of the vehicle's insurance coverage and agrees to comply with all insurance requirements during the rental period.
    </p>
      <h2>Indemnification:</h2>
      <p>The Renter agrees to indemnify and hold harmless the Rental Company, its employees, agents, and affiliates from any claims, liabilities, damages, or expenses arising out of or related to the Renter's use of the vehicle.
      </p>
      <h2>Governing Law:</h2>
      <p>
      This Agreement shall be governed by and construed in accordance with the laws of Canada. Any disputes arising under or related to this Agreement shall be resolved exclusively by the courts of Canada.      </p>
      <h2>Entire Agreement:</h2>
      <p>
      This Agreement constitutes the entire understanding between the parties concerning the subject matter hereof and supersedes all prior agreements and understandings, whether written or oral.
      </p>
      <h2>Signatures:</h2>
      <p>
        The parties hereto have executed this Agreement as of the date first written above.
      </p>
      <form onSubmit={handleSubmit}>

        <h4>Rental Company</h4>
        <label htmlFor="rentalCompanySignature"> Signature:</label>
        <input type="text" id="rentalCompanySignature" />
        <br />
        <label htmlFor="renterSignature">Name:</label>
        <input type="text" id="renterSignature"  />
        <br />
        <label htmlFor="renterDate">Date:</label>
        <input type="date" id="renterDate"   />
        <br />

        <h4>Renter </h4>
        <label htmlFor="rentalCompanySignature">Signature:</label>
        <input type="text" id="rentalCompanySignature"  />
        <br />
        <label htmlFor="renterSignature">Name:</label>
        <input type="text" id="renterSignature"/>
        <br />
        <label htmlFor="renterDate">Date:</label>
        <input type="date" id="renterDate" />
        <br />
        <button type="submit">Submit</button>
      </form>
     
      <div className="button-container">
        <button onClick={() => window.print()}>Print Rental Agreement</button>
        <button onClick={() => alert('Rental agreement has been printed and signed on paper')}>Rental Agreement Has Been Printed and Signed on Paper</button>
        <button onClick={() => alert('Rental Agreement Has Been Signed Online')}>Rental Agreement Has Been Filled and Signed Online</button>
</div>
    </div>
  );
};

export default RentalAgreement;