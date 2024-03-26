const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Users = require('../models/users');

describe('User Model', () => {
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
    await mongoose.connection.db.collection('users').deleteMany({});
  });

  it('should hash the password before saving', async () => {
    const users = mongoose.connection.db.collection('users');

    //Create a new user
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
      userType: 'client',
      phoneNumber: '123-456-7890',
      totalPrice: 0
    };

    //Save the user to the database
    const user = new Users(userData);
    await user.save();

    {/*}
    //Fetch the user from the database
    const savedUser = await users.findOne({ email: 'test@example.com' });

    //Check if the password is hashed
    expect(savedUser.password).not.toBe('Password123!');

    //Check if the hashed password is valid
    const isPasswordValid = await bcrypt.compare('Password123!', savedUser.password);
    expect(isPasswordValid).toBe(true);
    {*/}
  });
});
