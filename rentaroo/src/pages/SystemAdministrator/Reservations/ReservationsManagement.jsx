
import React, {useState} from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

const ReservationsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('referenceNumber');

  const handleSearch = () => {
    // Perform search logic with searchTerm and searchOption
    console.log('Searching for:', searchTerm, 'with option:', searchOption);
    // You can add your search logic here, such as making an API request
  };

  return (
    <div>

      <Header/>


      <main>
      
      <select value={searchOption} onChange={(e) => setSearchOption(e.target.value)}>
        <option value="referenceNumber">Reference Number</option>
        <option value="name">Name</option>
        <option value="name">Phone Number</option>
       
       
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




