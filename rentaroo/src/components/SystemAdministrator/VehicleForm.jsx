import { useState } from "react";

const VehicleForm = () => {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [carType, setCarType] = useState("");
  const [transmissionType, setTransmissionType] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [featuresAndAmenities, setFeaturesAndAmenities] = useState("");
  const [rentalTermsAndConditions, setRentalTermsAndConditions] = useState("");
  const [location, setLocation] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [yearOfManufacture, setYearOfManufacture] = useState("");
  const [mileage, setMileage] = useState("");
  const [price, setPrice] = useState("");
  const [photos, setPhotos] = useState([""]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vehicle = {
      make,
      model,
      color,
      carType,
      transmissionType,
      fuelType,
      seatingCapacity,
      featuresAndAmenities,
      rentalTermsAndConditions,
      location,
      availabilityStatus,
      yearOfManufacture,
      mileage,
      price,
      photos,
    };

    const response = await fetch("/api/vehicles", {
      method: "POST",
      body: JSON.stringify(vehicle),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setMake("");
      setModel("");
      setColor("");
      setCarType("");
      setTransmissionType("");
      setFuelType("");
      setSeatingCapacity("");
      setFeaturesAndAmenities("");
      setRentalTermsAndConditions("");
      setLocation("");
      setAvailabilityStatus("");
      setYearOfManufacture("");
      setMileage("");
      setPrice("");
      setPhotos([""]);

      setError(null);
      console.log("Vehicle created successfully", json);
    }
  };
  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h3>Create a new Vehicle</h3>

      <label>Make:</label>
      <input
        type="text"
        value={make}
        onChange={(e) => setMake(e.target.value)}
      />
      <label>Model:</label>
      <input
        type="text"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <label>Color:</label>
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <label>Car Type:</label>
      <input
        type="text"
        value={carType}
        onChange={(e) => setCarType(e.target.value)}
      />
      <label>Transmission Type:</label>
      <input
        type="text"
        value={transmissionType}
        onChange={(e) => setTransmissionType(e.target.value)}
      />
      <label>Fuel Type:</label>
      <input
        type="text"
        value={fuelType}
        onChange={(e) => setFuelType(e.target.value)}
      />
      <label>Seating Capacity:</label>
      <input
        type="number"
        value={seatingCapacity}
        onChange={(e) => setSeatingCapacity(e.target.value)}
      />
      <label>Features and Amenities:</label>
      <input
        type="text"
        value={featuresAndAmenities}
        onChange={(e) => setFeaturesAndAmenities(e.target.value)}
      />
      <label>Rental Terms and Conditions:</label>
      <input
        type="text"
        value={rentalTermsAndConditions}
        onChange={(e) => setRentalTermsAndConditions(e.target.value)}
      />
      <label>Location:</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <label>Availability Status:</label>
      <input
        type="text"
        value={availabilityStatus}
        onChange={(e) => setAvailabilityStatus(e.target.value)}
      />
      <label>Year of Manufacture:</label>
      <input
        type="number"
        value={yearOfManufacture}
        onChange={(e) => setYearOfManufacture(e.target.value)}
      />
      <label>Mileage:</label>
      <input
        type="number"
        value={mileage}
        onChange={(e) => setMileage(e.target.value)}
      />
      <label>Price:</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label>Photos:</label>
      <input
        type="text"
        value={photos.join(",")}
        onChange={(e) => setPhotos(e.target.value.split(","))}
      />
      <button type="submit">Create Vehicle</button>
      {error && <div className="alert alert-danger">{error}</div>}
    </form>
  );
};

export default VehicleForm;
