import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import vehicles from  './api/vehicles.jsx';
import VehicleCard from './VehicleCard.jsx';
import '../styles/Catalog.css'
function Catalog() {
  const [sortedVehicles, setSortedVehicles] = useState(vehicles);
  const [selectedSortOption, setSelectedSortOption] = useState('year');


  //Code to fetch vehicules data from api. Commented out until database is set
  /*const [sortedVehicles, setSortedVehicles] = useState([]);
  useEffect(() => {
  fetch('/api/vehicles')
    .then(response => response.json())
    .then((vehicles) => {
      // Check if vehicles is an array
      if (Array.isArray(vehicles)){
          // Convert vehicles to an array if it's not already one
          const sortedVehicles = Array.from(vehicles);

          // Now you can safely pass sortedVehicles to setSortedVehicles
          setSortedVehicles(sortedVehicles);
      } else{
          // Handle the case where vehicles is not an array
          console.error('Response data is not an array', vehicles)
      }
})
}, []);*/
useEffect(() => {
  handleSortChange();
}, [selectedSortOption]);

function handleSortChange() {
  const newSortedVehicles = sortVehiclesBy(sortedVehicles, selectedSortOption);
  setSortedVehicles(newSortedVehicles);
}
function sortVehiclesBy(vehicles, sortBy) {
  return [...vehicles].sort((a, b) => {
    if (sortBy === 'color') {
      return compareColors(a, b);
    } else if (sortBy === 'year') {
      return compareYears(a, b);
    } else if (sortBy === 'make') {
      return compareMakes(a, b);
    } else if (sortBy === 'mileage') {
      return compareMileages(a, b);
    } else if (sortBy === 'price') {
      return comparePrices(a, b);
    }
  });
}

function compareColors(a, b) {
  const aColor = a.color.toLowerCase();
  const bColor = b.color.toLowerCase();
  return aColor > bColor ? 1 : -1;
}

function compareYears(a, b) {
  return a.year - b.year;
}

function compareMakes(a, b) {
  const aMake = a.make.toLowerCase();
  const bMake = b.make.toLowerCase();
  return aMake > bMake ? 1 : -1;
}

function compareMileages(a, b) {
  return a.mileage - b.mileage;
}

function comparePrices(a, b) {
  return a.price - b.price;
}

function renderVehicles() {
  return sortedVehicles.map(vehicle => (
    <VehicleCard key={vehicle.id} vehicle={vehicle} />
  ));
}

function handleSortOptionClick(event) {
  const sortOption = event.target.value;
  setSelectedSortOption(sortOption);
}

return (
  <div className="catalog-page">
    <h1>FIND THE RIGHT CAR FOR YOU WITH RENTAROO</h1>
    <table>
      <tr>
        <td id="sorting-menu">
          <div className="sorting-section">
            <label htmlFor="sort-by">Sort results by: </label>
            <button value="year" onClick={handleSortOptionClick}>Year</button>
            <button value="make" onClick={handleSortOptionClick}>Make</button>
            <button value="mileage" onClick={handleSortOptionClick}>Mileage</button>
            <button value="color" onClick={handleSortOptionClick}>Color</button>
            <button value="price" onClick={handleSortOptionClick}>Price</button>
          </div>
        </td>
      </tr>
      <tr>
        <td id="vehicle-list">
          <ul className="vehicle-list">{renderVehicles()}</ul>
        </td>
      </tr>
    </table>
  </div>
);
}

export default Catalog;