import React, { Component, useState} from 'react';

import { getAvailableVehicles } from './api/vehicles';
import  VehicleCard from './VehicleCard';
import VehiclesList from './VehiclesList';
import '../styles/Catalog.css';

const vehicles = [
  {
    id: 1,
    make: 'Toyota',
    model: 'Corolla',
    year: 2020,
    color: 'Blue',
    odometer: 15000,
    description: 'A reliable and fuel-efficient sedan.',
  },
  {
    id: 2,
    make: 'Honda',
    model: 'Civic',
    year: 2019,
    color: 'Red',
    odometer: 25000,
    description: 'A sporty and stylish compact car.',
  },
  {
    id: 3,
    make: 'Ford',
    model: 'F-150',
    year: 2021,
    color: 'Silver',
    odometer: 5000,
    description: 'A powerful and capable pickup truck.',
  },
];

const VehiculeCard = ({ vehicle, onSelect }) => {
  return (
    <div className="vehicle-card">
      <div className="vehicle-image-placeholder">
        <div className="vehicle-image-placeholder-text">Image</div>
      </div>
      <div className="vehicle-info">
        <h2>{vehicle.make} {vehicle.model}</h2>
        <p>Year: {vehicle.year}</p>
        <p>Color: {vehicle.color}</p>
        <p>Odometer: {vehicle.odometer} km</p>
        <p>{vehicle.description}</p>
        <button onClick={() => onSelect(vehicle)} className="select-button">
          Select
        </button>
      </div>
    </div>
  );
};

const Catalog = ({ onSelect }) => {
  return (
    <div className="catalog">
      {vehicles.map((vehicle) => (
        <VehiculeCard key={vehicle.id} vehicle={vehicle} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default Catalog;