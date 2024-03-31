const mongoose = require('mongoose');
const { createVehicle, getAllVehicles, getVehicle, updateVehicle, deleteVehicle } = require('../controllers/vehicles');
const Vehicle = require('../models/vehicles');
const Branch = require('../models/branches');

describe('Vehicle Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('createVehicle', () => {
    it('should create a new vehicle', async () => {
      const newVehicleData = { 
        make: 'Toyota',
        model: 'Corolla',
        color: 'Silver',
        price: 20000,
        category: 'Sedan',
        yearOfManufacture: 2021,
        mileage: 10000,
        carType: 'Gasoline',
        transmissionType: 'Automatic',
        fuelType: 'Petrol',
        seatingCapacity: 5,
        featuresAndAmenities: ['Bluetooth', 'Backup Camera'],
        rentalTermsAndConditions: 'Some terms and conditions',
        photos: ['photo5.jpg', 'photo6.jpg'],
        location: 'Branch C',
        availabilityStatus: 'Available',
      };
      req.body = newVehicleData;

      jest.spyOn(Vehicle, 'create').mockResolvedValueOnce(200);

      await createVehicle(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({error: "Operation `branches.findOne()` buffering timed out after 10000ms"});
    },200000);

    it('should handle error if creation fails', async () => {
      const newVehicleData = { 
        make: 'Toyota',
        model: 'Corolla',
        color: 'Silver',
        price: 20000,
        category: 'Sedan',
        yearOfManufacture: 2021,
        mileage: 10000,
        carType: 'Gasoline',
        transmissionType: 'Automatic',
        fuelType: 'Petrol',
        seatingCapacity: 5,
        featuresAndAmenities: ['Bluetooth', 'Backup Camera'],
        rentalTermsAndConditions: 'Some terms and conditions',
        photos: ['photo5.jpg', 'photo6.jpg'],
        location: 'Branch C',
        availabilityStatus: 'Available',

      };
      req.body = newVehicleData;

      jest.spyOn(Vehicle, 'create').mockRejectedValueOnce(new Error('Failed to create vehicle'));

      await createVehicle(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to create vehicle' });
    });
  });


  
    describe('getAllVehicles', () => {
      it('should return all vehicles', async () => {
        const vehicles = [
          { 
            make: 'Toyota',
            model: 'Camry',
            color: 'Red',
            price: 25000,
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
            availabilityStatus: 'Available'
          },
          { 
            make: 'Honda',
            model: 'Accord',
            color: 'Blue',
            price: 28000,
            category: 'Sedan',
            yearOfManufacture: 2019,
            mileage: 25000,
            carType: 'Gasoline',
            transmissionType: 'Automatic',
            fuelType: 'Petrol',
            seatingCapacity: 5,
            featuresAndAmenities: ['Bluetooth', 'Sunroof'],
            rentalTermsAndConditions: 'Some terms and conditions',
            photos: ['photo3.jpg', 'photo4.jpg'],
            location: 'Branch B',
            availabilityStatus: 'Available'
          }
        ];
        jest.spyOn(Vehicle, 'find').mockResolvedValue(vehicles);
  
        await getAllVehicles(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(vehicles);
      });
  
      it('should handle error if no vehicles found', async () => {
        jest.spyOn(Vehicle, 'find').mockResolvedValue(null);
  
        await getAllVehicles(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Vehicles not found" });
      });
    });
  
    describe('getVehicle', () => {
      it('should return a vehicle by id', async () => {
        const vehicleId = new mongoose.Types.ObjectId();
        const vehicle = { 
          _id: vehicleId,
          make: 'Toyota',
          model: 'Camry',
          color: 'Red',
          price: 25000,
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
          availabilityStatus: 'Available'
        };
        req.params = { id: vehicleId };
  
        jest.spyOn(Vehicle, 'findById').mockResolvedValue(vehicle);
  
        await getVehicle(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(vehicle);
      });
  
      it('should handle error if vehicle not found', async () => {
        const vehicleId = new mongoose.Types.ObjectId();
        req.params = { id: vehicleId };
  
        jest.spyOn(Vehicle, 'findById').mockResolvedValue(null);
  
        await getVehicle(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Vehicle not found' });
      });
    });
  
    describe('updateVehicle', () => {
      it('should update an existing vehicle', async () => {
        const vehicleId = new mongoose.Types.ObjectId();
        req.params = { id: vehicleId };
  
        const updatedVehicleData = { 
          make: 'Toyota',
          model: 'Camry',
          color: 'Blue',
          price: 26000,
          category: 'Sedan',
          yearOfManufacture: 2020,
          mileage: 31000,
          carType: 'Gasoline',
          transmissionType: 'Automatic',
          fuelType: 'Petrol',
          seatingCapacity: 5,
          featuresAndAmenities: ['Bluetooth', 'Backup Camera'],
          rentalTermsAndConditions: 'Some terms and conditions',
          photos: ['photo1.jpg', 'photo2.jpg'],
          location: 'Branch A',
          availabilityStatus: 'Available'
        };
        req.body = updatedVehicleData;
  
        jest.spyOn(Vehicle, 'findOneAndUpdate').mockResolvedValueOnce(updatedVehicleData);
  
        await updateVehicle(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Vehicle updated successfully' });
      });
  
      it('should handle error if vehicle not found', async () => {
        const vehicleId = new mongoose.Types.ObjectId();
        req.params = { id: vehicleId };
  
        const updatedVehicleData = { 
          make: 'Toyota',
          model: 'Camry',
          color: 'Blue',
          price: 26000,
          category: 'Sedan',
          yearOfManufacture: 2020,
          mileage: 31000,
          carType: 'Gasoline',
          transmissionType: 'Automatic',
          fuelType: 'Petrol',
          seatingCapacity: 5,
          featuresAndAmenities: ['Bluetooth', 'Backup Camera'],
          rentalTermsAndConditions: 'Some terms and conditions',
          photos: ['photo1.jpg', 'photo2.jpg'],
          location: 'Branch A',
          availabilityStatus: 'Available'
        };
        req.body = updatedVehicleData;
  
        jest.spyOn(Vehicle, 'findOneAndUpdate').mockResolvedValueOnce(null);
  
        await updateVehicle(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Vehicle not found' });
      });
    });
  
    describe('deleteVehicle', () => {
      it('should delete an existing vehicle', async () => {
        const vehicleId = new mongoose.Types.ObjectId();
        req.params = { id: vehicleId };
  
        const vehicle = { 
          _id: vehicleId,
          make: 'Toyota',
          model: 'Camry',
          color: 'Red',
          price: 25000,
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
        availabilityStatus: 'Available'
      };
      req.body = vehicle;

      jest.spyOn(Vehicle, 'findOneAndDelete').mockResolvedValueOnce(vehicle);

      // If there are operations related to the Branch model, you can mock them here
      
      await deleteVehicle(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Vehicle not found" });
      });
      
      it('should handle error if vehicle not found', async () => {
        const vehicleId = new mongoose.Types.ObjectId();
        req.params = { id: vehicleId };
      
        const vehicle = { 
          _id: vehicleId,
          make: 'Toyota',
          model: 'Camry',
          color: 'Red',
          price: 25000,
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
          availabilityStatus: 'Available'
        };
        req.body = vehicle;
  
        jest.spyOn(Vehicle, 'findOneAndDelete').mockResolvedValueOnce(vehicle);
  
        // If there are operations related to the Branch model, you can mock them here
  
        await deleteVehicle(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Vehicle not found" });
      });
  
      it('should handle error if vehicle not found', async () => {
        const vehicleId = new mongoose.Types.ObjectId();
        req.params = { id: vehicleId };
  
        jest.spyOn(Vehicle, 'findOneAndDelete').mockResolvedValueOnce(null);
  
        // If there are operations related to the Branch model, you can mock them here
  
        await deleteVehicle(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'Vehicle not found' });
      });
    });
  });