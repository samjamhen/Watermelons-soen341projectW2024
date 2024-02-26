import React from "react";
import { Link } from "react-router-dom";
import vehicles from "./api/vehicles.jsx";
import VehicleCard from "./VehicleCard.jsx";
import "../styles/Catalog.css";

// const Catalog = ({ vehicle }) => {
//   return (
//     <div className="catalog-page">
//       <p>
//         <strong>Vehicle Make:</strong> {vehicle.make}
//       </p>
//       <p>
//         <strong>Vehicle Model:</strong> {vehicle.model}
//       </p>
//       <p>
//         <strong>Vehicle YOM:</strong> {vehicle.yearOfManufacture}
//       </p>
//       <p>
//         <strong>Vehicle Mileage:</strong> {vehicle.mileage}
//       </p>
//       <p>
//         <strong>Vehicle Type:</strong> {vehicle.carType}
//       </p>
//       <p>
//         <strong>Transmission Type:</strong> {vehicle.transmissionType}
//       </p>
//       <p>
//         <strong>Fuel Type:</strong> {vehicle.fuelType}
//       </p>
//       <p>
//         <strong>Seating Capacity:</strong> {vehicle.seatingCapacity}
//       </p>
//       <p>
//         <strong>Features and Amenities:</strong> {vehicle.featuresAndAmenities}
//       </p>
//       <p>
//         <strong>Rental Terms and Conditions:</strong>{" "}
//         {vehicle.rentalTermsAndConditions}
//       </p>
//       <p>
//         <strong>Photos:</strong> {vehicle.photos}
//       </p>
//       <p>
//         <strong>Location:</strong> {vehicle.location}
//       </p>
//       <p>
//         <strong>Availability Status:</strong> {vehicle.availabilityStatus}
//       </p>
//     </div>
//   );
// };
// export default Catalog;

function Catalog() {
  //Code to fetch vehicules data from api. Commented out until database is set
  // const [sortedVehicles, setSortedVehicles] = useState([]);
  useEffect(() => {
    const [vehicles, setVehicles] = useState(null);

    useEffect(() => {
      const fetchVehicles = async () => {
        const response = await fetch("/api/vehicles");
        const json = await response.json();

        if (response.ok) {
          setVehicles(json);
        }
      };

      fetchVehicles();
    }, []);
    return (
      <div className="Catalog">
        <Header />
        <div className="vehicles">
          {vehicles &&
            vehicles.map((vehicle) => (
              <Catalog key={vehicle._id} vehicle={vehicle} />
            ))}
        </div>

        <Footer />
      </div>
    );
  }, []);

  const [sortedVehicles, setSortedVehicles] = useState(vehicle);
  const [selectedSortOption, setSelectedSortOption] = useState("year");

  useEffect(() => {
    handleSortChange();
  }, [selectedSortOption]);

  function handleSortChange() {
    const newSortedVehicles = sortVehiclesBy(
      sortedVehicles,
      selectedSortOption
    );
    setSortedVehicles(newSortedVehicles);
  }
  function sortVehiclesBy(vehicles, sortBy) {
    return [...vehicles].sort((a, b) => {
      if (sortBy === "color") {
        return compareColors(a, b);
      } else if (sortBy === "year") {
        return compareYears(a, b);
      } else if (sortBy === "make") {
        return compareMakes(a, b);
      } else if (sortBy === "mileage") {
        return compareMileages(a, b);
      } else if (sortBy === "price") {
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
    return sortedVehicles.map((vehicle) => (
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
              <button value="year" onClick={handleSortOptionClick}>
                Year
              </button>
              <button value="make" onClick={handleSortOptionClick}>
                Make
              </button>
              <button value="mileage" onClick={handleSortOptionClick}>
                Mileage
              </button>
              <button value="color" onClick={handleSortOptionClick}>
                Color
              </button>
              <button value="price" onClick={handleSortOptionClick}>
                Price
              </button>
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
