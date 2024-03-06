import React, { useState } from 'react';
import '../../styles/SystemAdministrator/VehicleForm.css';

const AddVehicleForm = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [availabilityStatus, setAvailabilityStatus] = useState('available');
  const [yearOfManufacture, setYearOfManufacture] = useState('');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [color, setColor] = useState('');
  const [transmissionType, setTransmissionType] = useState('automatic');
  const [seatingCapacity, setSeatingCapacity] = useState('');
  const [fuelType, setFuelType] = useState('gasoline');
  const [carType, setCarType] = useState('sedan');
  const [featuresAndAmenities, setFeaturesAndAmenities] = useState('');
  const [rentalTermsAndConditions, setRentalTermsAndConditions] = useState('');
  const [vehicleImage, setVehicleImage] = useState('');
  const [imageError, setImageError] = useState(false);
  const [formError, setFormError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // POST request to add vehicle
      const formData = new FormData();
      formData.append('make', make);
      formData.append('model', model);
      formData.append('availabilityStatus', availabilityStatus);
      formData.append('yearOfManufacture', yearOfManufacture);
      formData.append('price', price);
      formData.append('mileage', mileage);
      formData.append('color', color);
      formData.append('transmissionType', transmissionType);
      formData.append('seatingCapacity', seatingCapacity);
      formData.append('fuelType', fuelType);
      formData.append('carType', carType);
      formData.append('featuresAndAmenities', featuresAndAmenities);
      formData.append('rentalTermsAndConditions', rentalTermsAndConditions);
      formData.append('vehicleImage', vehicleImage);

      const response = await fetch('/api/vehicles', {
        method: 'POST',
        body: formData,
      });

      console.log('Response:', response); // Log the response received from the API

      if (!response.ok) {
        const errorResponse = await response.json();

        if (response.status === 400) {
          console.log('Error Response:', errorResponse); // Log the error response from the API
          if (errorResponse.error && errorResponse.error.includes('duplicate key error')) {
            setFormError(true);
          }
        }
        else {
          throw new Error('Failed to add vehicle');
        }
      }

      else {
        console.log('Vehicle added successfully');
        // Reset form after successful submission
        setMake('');
        setModel('');
        setAvailabilityStatus('available');
        setYearOfManufacture('');
        setPrice('');
        setMileage('');
        setColor('');
        setTransmissionType('automatic');
        setSeatingCapacity('');
        setFuelType('gasoline');
        setCarType('sedan');
        setFeaturesAndAmenities('');
        setRentalTermsAndConditions('');
        setVehicleImage('');
        setFormError(false);
      }
    }
    catch (error) {
      console.error('Error adding vehicle:', error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setVehicleImage(file);
      setImageError(false);
    }
    else {
      setVehicleImage('');
      setImageError(true);
      <span style={{ color: 'red' }}>Please upload a JPEG or PNG image.</span>
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
        <select value={availabilityStatus} onChange={(e) => setAvailabilityStatus(e.target.value)}>
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

      <label>
        Transmission Type:
        <select value={transmissionType} onChange={(e) => setTransmissionType(e.target.value)}>
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

      <label>
        Vehicle Image (JPEG or PNG):
        <input type="file" onChange={handleImageChange} />
        {imageError && <span style={{ color: 'red' }}>Please upload a JPEG or      PNG image.</span>
    }
    {imageError && <span style={{ color: 'red' }}>Please upload a JPEG or PNG image.</span>}
  </label>

  {formError && <span style={{ color: 'red' }}>This vehicle already exists. Please add a different vehicle.</span>}

  <button type="submit">Add Vehicle</button>
</form>
); };

export default AddVehicleForm;