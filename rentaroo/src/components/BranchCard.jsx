import React, {useState, useEffect} from 'react';
import "../styles/BranchCard.css";
import { Link } from "react-router-dom";



const BranchCard = () => {

const [isPopupOpen, setIsPopupOpen] = useState(false);

const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleStartReservation = () =>{

  }

  const branchInfo = {
    city: ' City',
    address: '123 5th Avenue, Montreal, Qc, A1A 1A1',
    phone: '123-456-7890',
    openingHours: {
      Monday: { open: '09:00 AM', close: '05:00 PM' },
      Tuesday: { open: '09:00 AM', close: '05:00 PM' },
      Wednesday: { open: '09:00 AM', close: '05:00 PM' },
      Thursday: { open: '09:00 AM', close: '05:00 PM' },
      Friday:{ open: '09:00 AM', close: '05:00 PM' },
      Saturday:{ open: '09:00 AM', close: '05:00 PM' },
      Sunday:{ open: '09:00 AM', close: '05:00 PM' },
    },

};
const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch('/api/branches'); 
        if (!response.ok) {
          throw new Error("Failed to fetch branches");
        }
        const json = await response.json();
        setBranches(json);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };    
    fetchBranches();
  }, []);

return (
    <div className='branch-card'>
    
      <p className='city'>{branches.location}</p>
    
      <p className='address'>Address</p>
      <a href="#" className="hoursServices" onClick={handleOpenPopup}>
          Opening Hours
        </a>
        <button className='start-reservation-button' onClick={handleStartReservation}>Start a Reservation</button>
     

      
{isPopupOpen && (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>{branchInfo.city}</h2>
        <p>{branchInfo.address}</p>
        <p>{branchInfo.phone}</p>
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