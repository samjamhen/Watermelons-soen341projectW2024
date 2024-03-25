import React, {useState, useEffect} from 'react';
import Header from '../../components/HeaderCustomer';
import HeaderCustomer from '../../components/HeaderCustomer';
import HeaderCSR from '../../components/HeaderCSR';
import HeaderAdmin from '../../components/HeaderAdmin';
import Footer from '../../components/Footer';
import '../../styles/Home.css'
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Autocomplete } from '@react-google-maps/api'

const Home = () => {

  const { user } = useAuthContext();
  const [autocomplete, setAutocomplete] = useState(null);
  const [isAutocompleteSelected, setIsAutoCompleteSelected] = useState(false);
  const [searchInput, setSearchInput] = useState('');


  const renderHeader = () => {
    if (!user || !user.user || !user.user.userType) {
      return <Header />;
    }
    
    let userType = user.user.userType;
    switch (userType) {
      case "client":
        return <HeaderCustomer />;
      case "customer_representative":
        return <HeaderCSR />;
      case "system_administrator":
        return <HeaderAdmin />;
      default:
        return <Header />;
    }
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const place = autocomplete.getPlace();
    localStorage.setItem('searchInput', place.formatted_address);
    window.location.href = '/Branch'; 
  }

  const handleAutocompleteInputChange = (e) => {
    setSearchInput(e.target.value);
    setIsAutoCompleteSelected(false);
  };

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };
  
  const onPlaceChanged = () => {
    if (autocomplete !== null && searchInput.trim() !== '') {
      const place = autocomplete.getPlace();
      setSearchInput(place.formatted_address);
      setIsAutoCompleteSelected(true);
    } else {
      console.log('Autocomplete is not loaded yet!');
      setIsAutoCompleteSelected(false);
    }
  };

  return (
    <div>
      {renderHeader()}
      <main>
      <div className="home-container">
      <h1 className="home-title">Welcome to Our Vehicle Rental System</h1>
      <p className="home-description">
        Discover the joy of driving with our carefully selected fleet of vehicles. From compact cars to spacious SUVs, we have the perfect vehicle for your next adventure.
      </p>
      <div className="search-bar">
        <p>Provide a location</p>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            options={{
              types: ['geocode'],
              strictBounds: true,
              bounds: { south: 44.99991, west: -79.7668, north: 62.0057, east: -57.1185 },
              fields: ['address_components', 'geometry'],
            }}
          >
            <input
              type="text"
              placeholder="Postal Code, City or Airport"
              value={searchInput}
              onChange={handleAutocompleteInputChange}
            />
          </Autocomplete>
          <button type="submit" disabled = {!isAutocompleteSelected}>Browse Vehicles</button>
        </form>
      </div>
      <Link to="/Catalog" className="home-button">
        View Our Vehicle Selection
      </Link>
      </div>
      </main>
      <Footer />
    </div>
  );
};


export default Home;