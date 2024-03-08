import React, { useState } from "react";
import "../../styles/SystemAdministrator/VehicleForm.css";
import { useVehicleContext } from "../../hooks/useVehicleContext";

const AddVehicleForm = () => {
  const { dispatch } = useVehicleContext();

  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("available");
  const [yearOfManufacture, setYearOfManufacture] = useState("");
  const [price, setPrice] = useState("");
  const [mileage, setMileage] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("");
  const [transmissionType, setTransmissionType] = useState("automatic");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [fuelType, setFuelType] = useState("gasoline");
  const [carType, setCarType] = useState("sedan");
  const [featuresAndAmenities, setFeaturesAndAmenities] = useState("");
  const [rentalTermsAndConditions, setRentalTermsAndConditions] = useState("");
  const [photos, setPhotos] = useState([""]);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  // const [vehicleImage, setVehicleImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
        setSuccessMessage("Vehicle created successfully");
        dispatch({ type: "CREATE_VEHICLE", payload: json });
      }
    } catch (error) {
      console.error("Error adding vehicle:", error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      // setVehicleImage(file);
      setImageError(false);
    } else {
      // setVehicleImage("");
      setImageError(true);
      <span style={{ color: "red" }}>Please upload a JPEG or PNG image.</span>;
    }
  };

  return (
    <form className="vehicle-form" onSubmit={handleSubmit}>
      <h1>Vehicle Form</h1>
      <h4>Add a new Vehicule to the Database</h4>

      <label>
        Make:
        <input
          type="text"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
        />
      </label>

      <label>
        Model:
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
      </label>

      <label>
        Availability Status:
        <select
          value={availabilityStatus}
          onChange={(e) => setAvailabilityStatus(e.target.value)}
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </label>

      <label>
        Year of Manufacture:
        <input
          type="number"
          value={yearOfManufacture}
          onChange={(e) => setYearOfManufacture(e.target.value)}
          required
        />
      </label>

      <label>
        Price per Day ($):
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>

      <label>
        Mileage (Km):
        <input
          type="number"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          required
        />
      </label>

      <label>
        Color:
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          required
        />
      </label>
      <label>Location:</label>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <label>
        Transmission Type:
        <select
          value={transmissionType}
          onChange={(e) => setTransmissionType(e.target.value)}
        >
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
      </label>

      <label>
        Seating Capacity:
        <input
          type="number"
          value={seatingCapacity}
          onChange={(e) => setSeatingCapacity(e.target.value)}
          required
        />
      </label>

      <label>
        Fuel Type:
        <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
          <option value="gasoline">Gasoline</option>
          <option value="diesel">Diesel</option>
          <option value="electric">Electric</option>
        </select>
      </label>

      <label>
        Car Type:
        <select value={carType} onChange={(e) => setCarType(e.target.value)}>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="truck">Truck</option>
        </select>
      </label>

      <label>
        Features and Amenities:
        <input
          type="text"
          value={featuresAndAmenities}
          onChange={(e) => setFeaturesAndAmenities(e.target.value)}
          required
        />
      </label>

      <label>
        Rental Terms and Conditions:
        <textarea
          value={rentalTermsAndConditions}
          onChange={(e) => setRentalTermsAndConditions(e.target.value)}
          required
        />
      </label>
      <label>Photos:</label>
      <input
        type="text"
        value={photos.join(",")}
        onChange={(e) => setPhotos(e.target.value.split(","))}
      />
      <label>
        Vehicle Image (JPEG or PNG):
        <input type="file" onChange={handleImageChange} />
        {imageError && (
          <span style={{ color: "red" }}>
            Please upload a JPEG or PNG image.
          </span>
        )}
        {imageError && (
          <span style={{ color: "red" }}>
            Please upload a JPEG or PNG image.
          </span>
        )}
      </label>

      <button type="submit">Add Vehicle</button>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
    </form>
  );
};

export default AddVehicleForm;
