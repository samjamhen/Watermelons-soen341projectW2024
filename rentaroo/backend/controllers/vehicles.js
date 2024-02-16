const User = require("../models/users");
const Vehicle = require("../models/vehicles");

//CREATE
const createVehicle = async (req, res) => {
  const {
    make,
    model,
    yearOfManufacture,
    mileage,
    carType,
    transmissionType,
    fuelType,
    seatingCapacity,
    featuresAndAmenities,
    rentalTermsAndConditions,
    photos,
    location,
    availabilityStatus,
  } = req.body;
  try {
    const user = await User.create({
      make,
      model,
      yearOfManufacture,
      mileage,
      carType,
      transmissionType,
      fuelType,
      seatingCapacity,
      featuresAndAmenities,
      rentalTermsAndConditions,
      photos,
      location,
      availabilityStatus,
    });
    res.status(200).json(Vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//READ

//UPDATE

//DELETE

module.exports = createVehicle;
