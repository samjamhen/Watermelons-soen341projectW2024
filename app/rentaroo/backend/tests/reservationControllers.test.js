const { mockRequest, mockResponse } = require('jest-mock-req-res');
const { mock } = require('jest-mock-extended');
const Reservation = require('../models/reservations');
//const Vehicle = require('../models/vehicles');
const { bookReservation, getReservations } = require('../controllers/reservations');
const mongoose = require('mongoose')

jest.mock('../models/reservations');
jest.mock('../models/vehicles');

describe('getReservations', () => {
    it('should return all reservations', async () => {
        const reservations = [
            {userID: '1234567', fullName: 'Sam', email: 'testuser1@gmail.com', phone: '123-456-7890', vehicle: '123456789', pickupAddress: 'Montreal', pickupDate: new Date(), returnDate: new Date(), totalPrice: 1000},
            {userID: '1234567', fullName: 'Sam2', email: 'testuser2@gmail.com', phone: '123-456-7890', vehicle: '123456788', pickupAddress: 'Montreal', pickupDate: new Date(), returnDate: new Date(), totalPrice: 1000}
        ];
        jest.spyOn(Reservation, 'find').mockResolvedValue(reservations);

        await getReservations(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(reservations);
    });

    it('should handle error if no users found', async () => {
        jest.spyOn(Reservation, 'find').mockResolvedValue(null);
  
        await getReservations(req, res);
  
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: 'No users found' });
      });
  });
