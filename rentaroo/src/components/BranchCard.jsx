import React, {useState, useEffect} from 'react';
import "../styles/BranchCard.css";
import { Link } from "react-router-dom";
import {haversineDistance} from "../pages/Branch"



const BranchCard = ({branches, latitude, longitude}) => {

const [isPopupOpen, setIsPopupOpen] = useState(false);

const handleOpenPopup = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleStartReservation = () => {
      localStorage.setItem('selectedBranchLocation', branches.location);
      window.location.href = '/StartReservation'; 
  };
  
  const branchInfo = {
    city: ' City',
    address: '123 5th Avenue, Montreal, Qc, A1A 1A1',
    phone: '123-456-7890',
    openingHours: {
      Monday: { open: '09:00 AM', close: '07:00 PM' },
      Tuesday: { open: '09:00 AM', close: '07:00 PM' },
      Wednesday: { open: '09:00 AM', close: '08:00 PM' },
      Thursday: { open: '09:00 AM', close: '08:00 PM' },
      Friday:{ open: '09:00 AM', close: '08:00 PM' },
      Saturday:{ open: '09:00 AM', close: '05:00 PM' },
      Sunday:{ open: 'closed', close: 'closed' },
    },

  
};

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function haversineDistance(lat1, lon1, lat2, lon2){
  const R = 6371; // Earth's radius in kilometers
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);
  const latDelta = toRadians(lat2 - lat1);
  const lonDelta = toRadians(lon2 - lon1);

  const a = Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers
  return distance.toFixed(1);
}
const distance = haversineDistance(latitude, longitude, branches.latitude, branches.longitude);



return (
    <div className='branch-card'>
    <p>{distance} km away</p>



      <p className='city'>{branches.location}</p>
    
      <p className='address'>{branches.address}</p>
      <a href="#" className="hoursServices" onClick={handleOpenPopup}>
          Opening Hours
      </a>
        
    
        <button className='start-reservation-button' onClick={handleStartReservation}>Start a Reservation</button>


  {isPopupOpen && (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>{branches.location}</h2>
        <p>{branches.address}</p>
        <p>{branches.phoneNumber}</p>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Opening Time</th>
              <th>Closing Time</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(branchInfo.openingHours).map(([day, { open, close }]) => (
              <tr key={day}>
                <td>{day}</td>
                <td>{open}</td>
                <td>{close}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleClosePopup}>Close</button>
        </div>
      </div>
    )}
    </div> 
  );

}
export default BranchCard;