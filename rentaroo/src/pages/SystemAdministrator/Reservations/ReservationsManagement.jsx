
import React, {useEffect, useState} from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const ReservationsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('referenceNumber');
  const [reservation, setReservation] = useState([]);

  const handleSearch = async () => {
    // Clear the previous reservation data
    setReservation([]);
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

  useEffect(() => {
    handleSearch();
  }, [searchTerm, searchOption])

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
      
      <button onClick={handleSearch}>Search</button>
      {reservation && (
      <div>
        <p>{reservation.id} {reservation.fullName} {reservation.email} {reservation.phone} {reservation.vehicle} {reservation.pickupAddress} {reservation.pickupDate} {reservation.returnDate}</p>
      </div>
      )}
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




