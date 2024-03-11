const mongoose = require('mongoose');
const Reservations = require('../models/reservations');

describe('Reservation Model', () => {
  let connection;
  let db;

  beforeAll(async () => {
    try {
      //Set up mongoose connection
      connection = await mongoose.connect('mongodb+srv://admin:Rentaroo1@rentaroodb.dchkjpr.mongodb.net/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = connection.db;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  });

  afterAll(async () => {
    //Disconnect from database
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
    //Delete all users from the users collection in testdb
    await mongoose.connection.db.collection('reservations').deleteMany({});
  });

  it('should create a new reservation in the database', async () => {
    const users = mongoose.connection.db.collection('reservations');

    //Create a new user
    const reservationData = {
      fullName: 'Test reservation',
      userID: "12345678",
      email: 'test@example.com',
      phone: '5141231234',
      vehicle: 'car',
      pickupAddress: 'Montreal',
      pickupDate: '2024-02-26T18:20:13.122Z',
      returnDate: '2024-02-26T18:20:13.122Z',
      driversLicenseNumber: '12345678'
    };

    //Save the user to the database
    const reservation = new Reservations(reservationData);
    await reservation.save();

    //Fetch the user from the database
    const savedReservation = await users.findOne({ email: 'test@example.com' });

  });
});
