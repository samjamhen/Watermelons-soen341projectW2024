import React, {useState, useEffect, useRef} from 'react';
import Header from '../components/Header';
import HeaderAdmin from "../components/HeaderAdmin";
import HeaderCSR from "../components/HeaderCSR";
import HeaderCustomer from "../components/HeaderCustomer";
import Footer from '../components/Footer';
import BranchCard from '../components/BranchCard';
import AdminBranchCard from '../components/SystemAdministrator/AdminBranchCard';
import { Link } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import BranchMap from '../components/BranchMap';
import '../styles/Branch.css'
import { Autocomplete } from '@react-google-maps/api'




const Branch = () => {

  const { user } = useAuthContext();
  const [showMap, setShowMap] = useState(false);
  const [showList, setShowList] = useState(false);
  const [branches, setBranches] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);





  

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        console.log("Fetching...");
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
    console.log("Finish fetching...");   
    fetchBranches();
  }, []);

  const toggleMap = () => {
    setShowMap(!showMap);
  };

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
};

const handleSubmit = (e) =>{
  e.preventDefault();
  console.log(searchInput);
  setShowList(true); 
}

const renderBranchCard = () => {
  if (!user || !user.user || !user.user.userType) {
    return <BranchCard />;
  }

  const userType = user.user.userType;

  switch (userType) {
    case 'system_administrator':
      return <AdminBranchCard />;
    default:
      return <BranchCard />;
  }
};

const onLoad = (autocomplete) => {
  console.log("onLoad...");
  setAutocomplete(autocomplete);
};

const [lat, setLat]= useState();
const [lon, setLon] = useState();
const onPlaceChanged = () => {
  
  if (autocomplete !== null) {

    const place = autocomplete.getPlace();
    setSearchInput(place.formatted_address);
    setLat(place.geometry.location.lat());
    setLon(place.geometry.location.lng());
    
  
  } else {
    console.log('Autocomplete is not loaded yet!');
  }
  
};


  const [sortedBranches, setSortedBranches] = useState([]);

  useEffect(() => {
    if (branches.length > 0) {
      console.log('Original Branches:', branches);
      console.log(branches.distance);
      
      const sorted = branches.sort((a, b) => a.distance - b.distance);
      console.log('Sorted Branches:', sorted);
      setSortedBranches(sorted);
    }
  }, [branches]);


  return (
    <div>
       {renderHeader()}
       <div className="container">
      <h2>Find a Branch</h2>

      <p>Explore nearest locations from you</p>

      <div className="search-bar-branch">
        <div className="search-container">
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
              className = "input-location"
            />
          </Autocomplete>
          <button type="submit" className = "find-branch-button">Find Branch</button>
        </form>
        </div>
      </div>

      <div className="branches">
      <div className="flex-container">
      <div className="list-view" style={{ display: showList ? 'block' : 'none' }}>
      <button type="button" onClick={toggleMap}>
        {showMap ? 'Hide Map' : 'Show Map'}
      </button>
        
        
        <div>
        {sortedBranches.length > 0 ? (
        sortedBranches.map((branch) => (
              <BranchCard key={branch._id} branches={branch} latitude={lat} longitude={lon} />
              
            ))
          ) 
        
          
          : (
            <p>No branches found.</p>
          )}
        </div>
      </div>

      <div className='map-view'>
      {showMap && <BranchMap />} 
      </div>

      </div>
      </div>
    </div>

      <Footer />
    </div>
  );
};

export default Branch;