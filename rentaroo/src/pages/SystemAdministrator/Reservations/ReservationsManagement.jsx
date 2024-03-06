
import React, {useEffect, useState} from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ModifyBookingForm from '../../../components/ModifyBookingForm';

const ReservationsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('referenceNumber');
  const [reservation, setReservation] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);


  const handleSearch = async () => {
    // Clear the previous reservation data
    setReservation(null);
    // Perform search logic with searchTerm and searchOption
    console.log('Searching for:', searchTerm, 'with option:', searchOption);
    // You can add your search logic here, such as making an API request
    try{
      const response = await fetch(`/api/reservations/${searchOption}/${searchTerm}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
    }
      const json = await response.json();
      if(response.ok){
        setReservation(json)
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async () => {
    try{
      const response = await fetch(`/api/reservations/${searchOption}/${searchTerm}`, {
        method: 'DELETE'
      });

      setReservation(null);

      if(!response.ok){
        throw new Error('Network response was not ok');
      }
    } catch (error){
      console.log('Error deleting reservation:', error);
    }
  }

  const handleUpdateClick = () => {
    setIsUpdating(true);
  };

  const handleFormSubmit = () => {
    setIsUpdating(false);
    // Optionally, you can perform any other actions upon form submission
  };
  //useEffect(() => {
    //handleSearch();
  //}, [searchTerm, searchOption])


  const handleFormSubmitComplete = () => {
    setReservation(null);
    setSearchTerm("");
  }

  return (
    <div>

      <Header/>


      <main>
      
      <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
        <option value="referenceNumber">Reference Number</option>
        <option value="name">Name</option>
        <option value="phone">Phone Number</option>
       
       
      </select>
    
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter reservation reference number"
      />
      {/* <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
        <option value="referenceNumber">Reference Number</option>
        <option value="name">Name</option>
       
      </select> */}
      <button onClick={handleSearch}>Search</button>

      {reservation && <button onClick={handleDelete}>Delete</button>}
      {reservation && (
        <ModifyBookingForm reservation = {reservation} onSubmit={handleFormSubmit} onFormSubmitComplete={handleFormSubmitComplete} searchTerm = {searchTerm} searchOption = {searchOption}/>
        )}
      {reservation === null && <p>No reservation found</p>}
      </main>

      <Footer/>
    </div>
  );
};

export default ReservationsManagement;







// import React from 'react';
// import Header from '../../../components/Header';
// import Footer from '../../../components/Footer';
// // import '../styles/Home.css'

// const ReservationsManagement = () => {
//   return (
//     <div>
//       <Header />
//       <main>
//         <h2>Welcome to Administrator Page</h2>
//         <h3>Reservations</h3>
//                 {/* Add more components as needed */}
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default ReservationsManagement;




