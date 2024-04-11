import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VehicleCard from "./VehicleCard.jsx";
import "../styles/Catalog.css";
import "../styles/StartReservationCatalog.css";
import FilterForm from "./FilterForm";

function StartReservationCatalog() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("Montreal");
  const [filterOptions, setFilterOptions] = useState({
    minPrice: 0,
    maxPrice: 100,
    carType: ["car", "suv", "Van", "Truck"],
    categories: ["compact", "standard", "intermediate", "large"],
    location: ["Montreal - YUL", "Montreal - Downtown", "Laval"],
  });
  const [selectedCarTypes, setSelectedCarTypes] = useState([]);




  
  function handleFilterChange(event) {
    const { name, value, checked, type } = event.target;

    if (type === "checkbox" && name === "carType") {
      const updatedCarTypes = checked
        ? [...selectedCarTypes, value]
        : selectedCarTypes.filter((type) => type !== value);

      setSelectedCarTypes(updatedCarTypes);
    } else if (name === "minPrice" || name === "maxPrice") {
      setFilterOptions({
        ...filterOptions,
        [name]: parseInt(value, 10),
      });
    } else if (name === "location") {
      setSelectedLocation(value);
    }
  }

  function handleLocationChange(location) {
    setSelectedLocation(location);
  }
  function handleSearchFilteredVehicles() {
    const { minPrice, maxPrice } = filterOptions;

    const filteredVehicles = vehicles.filter((vehicle) => {
      const isPriceInRange =
        vehicle.price >= minPrice && vehicle.price <= maxPrice;
      const isCarTypeMatch = selectedCarTypes.includes(vehicle.carType);
      const isCategoryMatch = filterOptions.categories.includes(
        vehicle.category
      );
      const isLocationMatch =
        selectedLocation === "Montreal - YUL"
          ? vehicle.location === "Montreal - YUL"
          : selectedLocation === "Montreal - Downtown"
          ? vehicle.location === "Montreal - Downtown"
          : vehicle.location === "Laval";


      return (
        isPriceInRange && isCategoryMatch && isCarTypeMatch && isLocationMatch
      );
    });

    setFilteredVehicles(filteredVehicles);
  }

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicles");
        if (!response.ok) {
          throw new Error("Failed to fetch vehicles");
        }
        const json = await response.json();
  
        // Filter vehicles based on application status (e.g., "approved")
        const pendingVehicles = json.filter(vehicle => !vehicle.status || vehicle.status === "approved");
  
        // Set the filtered vehicles in your state (e.g., setPendingVehicles)
        setVehicles(pendingVehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
  
    fetchVehicles();
  }, []);

  function handleSelectButtonClick(vehicle) {
    setSelectedVehicle(vehicle);
  }

  function renderVehicles() {
    console.log("Selected Car Types:", selectedCarTypes);
  
    if (filteredVehicles.length === 0) {
      return (
        <div className="no-vehicles-message">
          <p>No corresponding vehicles found. Change or select all search filters and try again.</p>
        </div>
      );
    }
  
    return filteredVehicles.map((vehicle) => (
      <VehicleCard
        key={vehicle._id}
        vehicle={vehicle}
        onSelectButtonClick={() => handleSelectButtonClick(vehicle)}
        selectedVehicle={selectedVehicle}
      />
    ));
  }

  return (
    <div className="catalog-page">
      <h1>Start a Reservation</h1>
      <FilterForm
        onApplyFilters={handleSearchFilteredVehicles} // Corrected prop name
        minPrice={filterOptions.minPrice}
        maxPrice={filterOptions.maxPrice}
        onMinPriceChange={(e) =>
          handleFilterChange({
            target: { name: "minPrice", value: e.target.value },
          })
        }
        onMaxPriceChange={(e) =>
          handleFilterChange({
            target: { name: "maxPrice", value: e.target.value },
          })
        }
        onTypesChange={handleFilterChange}
        onCategoriesChange={handleFilterChange}
        onLocationChange={handleLocationChange}
        filterOptions={filterOptions}
        selectedLocation={selectedLocation}
        onSearchFilteredVehicles={handleSearchFilteredVehicles}
      />
      <ul className="vehicle-list">{renderVehicles()}</ul>
    </div>
  );
}

export default StartReservationCatalog;
