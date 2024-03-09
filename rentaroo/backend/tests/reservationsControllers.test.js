const mongoose = require('mongoose');
const { bookReservation, getReservations, getReservationByID, getReservationByUserID, updateReservation, deleteReservationByID } = require('../controllers/reservations');
const Reservation = require('../models/reservations');

describe('Reservation Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('bookReservation', () => {
    it('should create a new reservation', async () => {
        const newReservation = {
            fullName: 'Test reservation',
            email: 'test@example.com',
            phone: '5141231234',
            vehicle: 'car',
            pickupAddress: 'Montreal',
            pickupDate: '2024-02-26T18:20:13.122Z',
            returnDate: '2024-02-26T18:20:13.122Z',
            driversLicenseNumber: '1234'
          };
      req.body = newReservation;

      jest.spyOn(Reservation, 'create').mockResolvedValue(newReservation);

      await bookReservation(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining(newReservation));
    });

    it('should handle error if reservation not created', async () => {
      const newReservation = {
        // User data missing, should trigger error
      };
      req.body = newReservation;

      jest.spyOn(Reservation, 'create').mockResolvedValue(null);

      await bookReservation(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Reservation not created' });
    });
  });
});
