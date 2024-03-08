const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    yearOfManufacture: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    carType: {
      type: String,
      required: true,
    },
    transmissionType: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
    },
    featuresAndAmenities: {
      type: [String],
      required: true,
    },
    rentalTermsAndConditions: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    availabilityStatus: {
      type: String,
      required: true,
    },
  },
  { Timestamp: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
