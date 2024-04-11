const Reservation = require('../models/reservations.js')
const Vehicle = require('../models/vehicles.js')
const User = require("../models/users");
const { sendConfirmationEmail, sendDeleteConfirmation, sendUpdatedConfirmation, sendDepositConfirmation, sendVehicleReturnConfirmation, sendDepositReturnConfirmation, sendPaymentEmailConfirmation, sendSpecimenChequeRequest } = require('../middleware/emails.js')

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

//get a single reservation by its id
const getReservationByConfirmationNumber = async (req, res) => {
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

//get a single reservation by drivers license number
const getReservationByLicense = async (req, res) => {
    const { driversLicenseNumber } = req.params

    try{
        const reservation = await Reservation.findOne({ driversLicenseNumber: driversLicenseNumber})
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

const getReservationByCard = async (req, res) => {
    const { creditCard } = req.params

    try{
        const reservation = await Reservation.findOne({ creditCard: creditCard})
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
    const { userID, fullName, vehicle, email, phone, pickupAddress, pickupDate, returnDate, driversLicenseNumber, totalPrice, creditCard, status, depositStatus, previousDamages, newDamages, finalPrice, rentalPrice, additionalFeaturesPrice, additionalFeatures } = req.body;
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
        const reservation = await Reservation.create({ userID, fullName, vehicle, email, phone, pickupAddress, pickupDate, returnDate, driversLicenseNumber, totalPrice, creditCard, status, depositStatus, previousDamages, newDamages, finalPrice, rentalPrice, additionalFeaturesPrice, additionalFeatures });

        // Mark the vehicle as unavailable for the reservation dates
        await Vehicle.updateOne({ _id: vehicle }, { available: false });

        console.log(reservation.email)
        await sendConfirmationEmail(reservation);

        // Check if the vehicle booked is owned by a client
        const bookedVehicle = await Vehicle.findById(reservation.vehicle);
        if (bookedVehicle?.submittedBy) {
            //Check if the owner of the vehicle has already submitted a specimen cheque
            const owner = await User.findById(bookedVehicle.submittedBy);
            if (owner.specimenChequeSubmitted == "no") {
                // Send an email requesting the specimen cheque
                await sendSpecimenChequeRequest(owner);
            }  
        }

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
        const old = await Reservation.findById(_id);

        const updated = await Reservation.findByIdAndUpdate(_id, updatedReservation, { new: true });

        if (updated.depositStatus == "payed" && old.depositStatus == "notPayed"){
            await sendDepositConfirmation(updated)
        }
        else if(updated.status == "checked-out" && old.status == "checked-in"){
            await sendVehicleReturnConfirmation(updated)
            
        }
        else if(updated.depositStatus == "returned" && old.depositStatus == "payed"){
            await sendDepositReturnConfirmation(updated)
            const vehicle = await Vehicle.findById(updated.vehicle);
      
            if (!vehicle) {
                throw new Error("Vehicle not found");
            }

            if(vehicle.submittedBy){
                const owner = await User.findById(vehicle.submittedBy);
                sendPaymentEmailConfirmation(updated, owner);
            }
        }
        else{
            await sendUpdatedConfirmation(updated);
        }

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

        await sendDeleteConfirmation(reservation);

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


module.exports = { bookReservation, getReservations, getReservationByID, getReservationByConfirmationNumber, getReservationByLicense, getReservationByCard, getReservationByName, getReservationByPhone, getReservationByUserID, getReservationByVehicleID, updateReservation, deleteReservationByID, deleteReservationByName, deleteReservationByPhone }
