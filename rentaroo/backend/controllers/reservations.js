const Reservation = require('../models/reservations.js')
const Vehicle = require('../models/vehicles.js')

//get all reservations
const getReservations = async (req, res) => {
    try {
      const reservations = await Reservation.find({}).sort({ createAt: -1 });
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };  

//get a single reservation by its id
const getReservationByID = async (req, res) => {
    const { _id } = req.params

    try{
        const reservation = await Reservation.findOne({ _id: _id})
        if (!reservation) {
            return res.status(404).json({error: 'No such reservation'})
        }
        res.status(200).json(reservation)
    }
    catch (error){
        console.error('Error finding reservation: ', error)
        res.status(500).json({message: 'Server error'})
    }
}

//get a single reservation by fullName
const getReservationByName = async (req, res) => {
    const { fullName } = req.params

    try{
        const reservation = await Reservation.findOne({ fullName: fullName})
        if (!reservation) {
            return res.status(404).json({error: 'No such reservation'})
        }
        res.status(200).json(reservation)
    }
    catch (error){
        console.error('Error finding reservation: ', error)
        res.status(500).json({message: 'Server error'})
    }
}

//get a single reservation by phoneNumber
const getReservationByPhone = async (req, res) => {
    const { phone } = req.params

    try{
        const reservation = await Reservation.findOne({ phone: phone})
        if (!reservation) {
            return res.status(404).json({error: 'No such reservation'})
        }
        res.status(200).json(reservation)
    }
    catch (error){
        console.error('Error finding reservation: ', error)
        res.status(500).json({message: 'Server error'})
    }
}

//get a single reservation by userID 
const getReservationByUserID = async (req, res) => {
    const { userID } = req.params

    try{
        const reservation = await Reservation.findOne({ userID: userID})
        if (!reservation) {
            return res.status(404).json({error: 'No such reservation'})
        }
        res.status(200).json(reservation)
    }
    catch (error){
        console.error('Error finding reservation: ', error)
        res.status(500).json({message: 'Server error'})
    }
}

//get a single reservation by vehicle
const getReservationByVehicleID = async (req, res) => {
    const { vehicle } = req.params

    try{
        const reservation = await Reservation.find({ vehicle: vehicle})
        if (!reservation) {
            return res.status(404).json({error: 'No such reservation'})
        }
        res.status(200).json(reservation)
    }
    catch (error){
        console.error('Error finding reservation: ', error)
        res.status(500).json({message: 'Server error'})
    }
}

//create a reservation
const bookReservation = async (req, res) => {
    const { userID, fullName, vehicle, email, phone, pickupAddress, pickupDate, returnDate, driversLicenseNumber } = req.body;
    try {
        // Check if the vehicle is available for the selected pickup and return dates
        const overlappingReservations = await Reservation.find({
            vehicle,
            $or: [
                { pickupDate: { $lt: returnDate }, returnDate: { $gt: pickupDate } }, // Check if pickupDate is between existing reservation dates
                { pickupDate: { $lte: pickupDate }, returnDate: { $gte: returnDate } }, // Check if returnDate is between existing reservation dates
                { pickupDate: { $gte: pickupDate }, returnDate: { $lte: returnDate } } // Check if existing reservation dates are between pickupDate and returnDate
            ],
        });

        if (overlappingReservations.length > 0) {
            return res.status(400).json({ error: 'Vehicle is not available for the selected dates' });
        }

        // Create reservation
        const reservation = await Reservation.create({ userID, fullName, vehicle, email, phone, pickupAddress, pickupDate, returnDate, driversLicenseNumber });

        // Mark the vehicle as unavailable for the reservation dates
        await Vehicle.updateOne({ _id: vehicle }, { available: false });

        // Return status
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// update a reservation by id
const updateReservation = async (req, res) => {
    const { _id } = req.params;

    try {
        const updatedReservation = req.body;
        const existingReservation = await Reservation.findById(_id);

        if (!existingReservation) {
            return res.status(400).json({ error: 'No such reservation' });
        }

        // Check if the updated reservation overlaps with existing reservations
        const overlappingReservations = await Reservation.find({
            vehicle: existingReservation.vehicle,
            _id: { $ne: _id }, // Exclude the current reservation from the check
            $or: [
                { pickupDate: { $lt: updatedReservation.returnDate }, returnDate: { $gt: updatedReservation.pickupDate } }, // Check if pickupDate is between existing reservation dates
                { pickupDate: { $lte: updatedReservation.pickupDate }, returnDate: { $gte: updatedReservation.returnDate } }, // Check if returnDate is between existing reservation dates
                { pickupDate: { $gte: updatedReservation.pickupDate }, returnDate: { $lte: updatedReservation.returnDate } } // Check if existing reservation dates are between pickupDate and returnDate
            ],
        });

        if (overlappingReservations.length > 0) {
            return res.status(400).json({ error: 'Updated reservation overlaps with existing reservations' });
        }

        // Update reservation
        const updated = await Reservation.findByIdAndUpdate(_id, updatedReservation, { new: true });

        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//delete a reservation by id 
const deleteReservationByID = async (req, res) => {
    const { _id } = req.params;

    try {
        // Find the reservation
        const reservation = await Reservation.findById(_id);
        if (!reservation) {
            return res.status(404).json({error: 'Reservation not found'});
        }

        // Mark the vehicle as available for the reservation dates
        await Vehicle.updateOne({ _id: reservation.vehicle }, { available: true });

        // Delete the reservation
        await Reservation.findByIdAndDelete(_id);

        // Return success message
        res.status(200).json({ message: 'Reservation canceled successfully' });
    } catch(error) {
        res.status(400).json({ error: error.message });
    }
}

//delete a reservation by name
const deleteReservationByName = async (req, res) => {
    const { fullName } = req.params

    const reservation = await Reservation.findOneAndDelete({ fullName: fullName })

    if(!reservation){
        return res.status(400).json({error: "No such reservation"})
    }

    res.status(200).json(reservation)
}

//delete a reservation by phone
const deleteReservationByPhone = async (req, res) => {
    const { phone } = req.params

    const reservation = await Reservation.findOneAndDelete({ phone: phone })

    if(!reservation){
        return res.status(400).json({error: "No such reservation"})
    }

    res.status(200).json(reservation)
}


module.exports = { bookReservation, getReservations, getReservationByID, getReservationByName, getReservationByPhone, getReservationByUserID, getReservationByVehicleID, updateReservation, deleteReservationByID, deleteReservationByName, deleteReservationByPhone }
