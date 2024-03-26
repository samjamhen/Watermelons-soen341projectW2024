const mongoose = require('mongoose');
const Vehicle = require('../models/vehicles');

describe('Vehicle Model', () => {
  let connection;
  let db;

  beforeAll(async () => {
    try {
      connection = await mongoose.connect('mongodb+srv://admin:Rentaroo1@rentaroodb.dchkjpr.mongodb.net/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.connection.db;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      if (connection) {
        await connection.disconnect();
      }
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
      throw error;
    }
  });

  beforeEach(async () => {
    await db.collection('vehicles').deleteMany({});
  });

  it('should create a new vehicle successfully', async () => {
    const vehicleData = {
      make: 'Toyota',
      color: 'Red',
      price: 25000,
      model: 'Camry',
      category: 'Sedan',
      yearOfManufacture: 2020,
      mileage: 30000,
      carType: 'Gasoline',
      transmissionType: 'Automatic',
      fuelType: 'Petrol',
      seatingCapacity: 5,
      featuresAndAmenities: ['Bluetooth', 'Backup Camera'],
      rentalTermsAndConditions: 'Some terms and conditions',
      photos: ['photo1.jpg', 'photo2.jpg'],
      location: 'Branch A',
      availabilityStatus: 'Available',
    };

    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();

    const savedVehicle = await db.collection('vehicles').findOne({ make: 'Toyota' });

    expect(savedVehicle).toBeDefined();
    expect(savedVehicle.make).toBe(vehicleData.make);
    expect(savedVehicle.color).toBe(vehicleData.color);
    expect(savedVehicle.price).toBe(vehicleData.price);
    expect(savedVehicle.model).toBe(vehicleData.model);
    expect(savedVehicle.category).toBe(vehicleData.category);
    expect(savedVehicle.yearOfManufacture).toBe(vehicleData.yearOfManufacture);
    expect(savedVehicle.mileage).toBe(vehicleData.mileage);
    expect(savedVehicle.carType).toBe(vehicleData.carType);
    expect(savedVehicle.transmissionType).toBe(vehicleData.transmissionType);
    expect(savedVehicle.fuelType).toBe(vehicleData.fuelType);
    expect(savedVehicle.seatingCapacity).toBe(vehicleData.seatingCapacity);
    expect(savedVehicle.featuresAndAmenities).toEqual(vehicleData.featuresAndAmenities);
    expect(savedVehicle.rentalTermsAndConditions).toBe(vehicleData.rentalTermsAndConditions);
    expect(savedVehicle.photos).toEqual(vehicleData.photos);
    expect(savedVehicle.location).toBe(vehicleData.location);
    expect(savedVehicle.availabilityStatus).toBe(vehicleData.availabilityStatus);
});
});
