import React from 'react';
import Home from './pages/Home'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppRoutes from './Routes';
import BrowseVehicles from './components/BrowseVehicles'; // Import the BrowseVehicles component

//import './App.css';

// Import BrowseVehicles component
import Nav from './js/Nav';

function App() {
  return (
    <Router>
      <div className="App">
        
        <header className="App-header">
         <Nav></Nav> 
         <Home></Home>
        </header>

        <Routes>
          <Route exact path="/" component={Home} />
          <Route path="/vehicles" component={BrowseVehicles} /> //Add route for BrowseVehicles page
        </Routes>
      </div>
    </Router>
  );
}

export default App;
