import React, {useState} from 'react';
import Header from '../components/Header';
import HeaderAdmin from "../components/HeaderAdmin";
import HeaderCSR from "../components/HeaderCSR";
import HeaderCustomer from "../components/HeaderCustomer";
import Footer from '../components/Footer';
import BranchCard from '../components/BranchCard';
import AdminBranchCard from '../components/SystemAdministrator/AdminBranchCard';
import { Link } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import Map from '../components/Map';
import '../styles/Branch.css'



const Branch = () => {

  const { user } = useAuthContext();
  const [showMap, setShowMap] = useState(false);

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

  return (
    <div>
       {renderHeader()}
       <div className="container">
      <h2>Find a Branch</h2>
      <button type="button" onClick={toggleMap}>
        {showMap ? 'Hide Map' : 'Show Map'}
      </button>
      <div className="flex-container">
      <div className="list-view">
        {renderBranchCard()}
      </div>

      <div className='map-view'>
      {showMap && <Map />} 
      </div>

      </div>
    </div>

      <Footer />
    </div>
  );
};

export default Branch;