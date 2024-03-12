const mongoose = require("mongoose");
const {
  getAllVehicles,
  getVehicle,
  createVehicle,
  deleteVehicle,
  updateVehicle,
} = require("../controllers/vehicles");
const Vehicle = require("../models/vehicles");

jest.mock("../models/vehicles");

describe("Vehicle Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("createVehicle", () => {
    it("should create a new vehicle", async () => {
      const newVehicle = {
        make: "Toyota",
        color: "Blue",
        price: 25000,
        model: "Camry",
        category: "Sedan",
        yearOfManufacture: 2020,
        mileage: 5000,
        carType: "Gasoline",
        transmissionType: "Automatic",
        fuelType: "Regular",
        seatingCapacity: 5,
        featuresAndAmenities: ["Bluetooth", "Backup Camera"],
        rentalTermsAndConditions: "Return with full tank",
        photos: [
          "https://example.com/photo1.jpg",
          "https://example.com/photo2.jpg",
        ],
        location: "New York",
        availabilityStatus: "available",
      };
      req.body = newVehicle;

      Vehicle.create.mockResolvedValue(newVehicle);

      await createVehicle(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(newVehicle);
    });

    it("should handle error if vehicle not created", async () => {
      const newVehicle = {}; // Vehicle data missing, should trigger error
      req.body = newVehicle;

      Vehicle.create.mockResolvedValue(null);

      await createVehicle(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Vehicle not created" });
    });
  });

  describe("getAllVehicles", () => {
    it("should return all vehicles", async () => {
      const vehicles = [
        { _id: "1", make: "Toyota", model: "Camry" },
        { _id: "2", make: "Honda", model: "Accord" },
      ];
      Vehicle.find.mockResolvedValue(vehicles);

      await getAllVehicles(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(vehicles);
    });

    it("should handle error if no vehicles found", async () => {
      Vehicle.find.mockResolvedValue(null);

      await getAllVehicles(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "No vehicles found" });
    });
  });

  describe("getVehicle", () => {
    it("should return a vehicle by id", async () => {
      req.params = {
        id: "1234",
      };
      const vehicle = {
        _id: "1234",
        make: "Toyota",
        model: "Camry",
      };
      Vehicle.findById.mockResolvedValue(vehicle);

      await getVehicle(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(vehicle);
    });

    it("should handle error if vehicle not found", async () => {
      req.params = {
        id: "123",
      };
      Vehicle.findById.mockResolvedValue(null);

      await getVehicle(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Vehicle not found" });
    });
  });

  describe("updateVehicle", () => {
    it("should update an existing vehicle", async () => {
      req.params = {
        id: "1234",
      };
      const updatedVehicleData = {
        make: "Toyota",
        color: "Red",
        price: 30000,
        model: "Camry",
      };
      req.body = updatedVehicleData;

      Vehicle.findOneAndUpdate.mockResolvedValueOnce(updatedVehicleData);

      await updateVehicle(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(updatedVehicleData);
    });

    it("should handle error if vehicle not found", async () => {
      req.params = {
        id: "does_not_exist",
      };
      const updatedVehicleData = {
        make: "Toyota",
        color: "Red",
        price: 30000,
        model: "Camry",
      };
      req.body = updatedVehicleData;

      Vehicle.findOneAndUpdate.mockResolvedValueOnce(null);

      await updateVehicle(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Vehicle not found" });
    });
  });

  describe("deleteVehicle", () => {
    it("should delete an existing vehicle", async () => {
      req.params = {
        id: "1234",
      };
      const vehicle = {
        _id: "1234",
        make: "Toyota",
        model: "Camry",
      };
      req.body = vehicle;

      Vehicle.findOneAndDelete.mockResolvedValueOnce(vehicle);

      await deleteVehicle(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Vehicle deleted successfully",
      });
    });

    it("should handle error if vehicle not found", async () => {
      req.params = {
        id: "does_not_exist",
      };
      const vehicle = {
        make: "Toyota",
        model: "Camry",
      };
      req.body = vehicle;

      Vehicle.findOneAndDelete.mockResolvedValueOnce(null);

      await deleteVehicle(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Vehicle not found" });
    });
  });
});
