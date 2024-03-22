import React, {useState, useEffect} from 'react';
import Header from '../../components/HeaderAdmin';
import Footer from '../../components/Footer';
import '../../styles/Home.css'
import { Link } from 'react-router-dom';
import { Autocomplete } from '@react-google-maps/api'

const Home = () => {

  const [autocomplete, setAutocomplete] = useState(null);
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = () =>{

  }

  const onLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };
  
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setSearchInput(place.formatted_address);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <div>
      <Header/>
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
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Autocomplete>
      <button type="submit">Browse Vehicles</button>
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