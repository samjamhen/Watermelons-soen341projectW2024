import React from 'react';
import '../../styles/SystemAdministrator/ClientManagement.css';




/* Fetch client data form data base and and extract 
firstName, lastName, email, and phoneNumber from it*/

/*
const ClientCard = ({ clientId }) => {
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    // Fetch client data from database using clientId
    fetch(`your-api-endpoint/clients/${clientId}`)
      .then(response => response.json())
      .then(data => setClientData(data))
      .catch(error => console.error('Error fetching client data:', error));
  }, [clientId]);

  if (!clientData) {
    return <div>Loading...</div>;
  }

  const { firstName, lastName, email, phoneNumber } = clientData;
*/



const ClientCard = ({ firstName, lastName, email, phoneNumber }) => {

  
    return (
        <div className="client-etiquette">
        <div className="client-info">
          <p>
            <strong>First Name:</strong> {firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {lastName}
          </p>
          <p>
            <strong>Email Address:</strong> {email}
          </p>
          <p>
            <strong>Phone Number:</strong> {phoneNumber}
          </p>
        </div>
        <div className="client-actions">
          <button className="info-button">Show More Info</button>
          <button className="delete-button">Delete Client</button>
        </div>
      </div>
  );
};

export default ClientCard;
