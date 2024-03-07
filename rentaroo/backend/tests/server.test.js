// Import required modules and routes
const express = require("express");
const mongoose = require("mongoose");
const reservationRoutes = require("./routes/reservations");
const usersRoutes = require("./routes/users");
const vehicleRoutes = require("./routes/vehicles");

// Mock express() to intercept method calls
jest.mock('express', () => ({
  use: jest.fn(),
  listen: jest.fn(),
  json: jest.fn(),
}));

// Mock mongoose.connect() to resolve immediately
mongoose.connect = jest.fn(() => Promise.resolve());

// Require the application file to be tested
const app = require('./app');

describe('Rentaroo App', () => {
  it('should connect to MongoDB and start the server', async () => {
    // Check that express middleware is set up
    expect(express.json).toHaveBeenCalled();

    // Check that routes are defined correctly
    expect(app.use).toHaveBeenCalledWith('/api/reservations', reservationRoutes);
    expect(app.use).toHaveBeenCalledWith('/api/users', usersRoutes);
    expect(app.use).toHaveBeenCalledWith('/api/vehicles', vehicleRoutes);

    // Check that mongoose.connect is called with the correct MongoDB URL
    expect(mongoose.connect).toHaveBeenCalledWith(
      'mongodb+srv://admin:Rentaroo1@rentaroodb.dchkjpr.mongodb.net/Rentaroo?retryWrites=true&w=majority'
    );

    // Check that the server is started on the specified port
    expect(express.listen).toHaveBeenCalledWith(8000, expect.any(Function));
  });
});