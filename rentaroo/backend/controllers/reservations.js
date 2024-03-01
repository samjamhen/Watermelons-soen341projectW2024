const Reservation = require('../models/reservations.js')

//get all reservations
const getReservations = async (req, res) => {
    const reservations = await Reservation.find({}).sort({createAt: -1})

    res.status(200).json(reservations)
}

//get a single reservation
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

//create a reservation
const bookReservation = async (req, res) =>{
    const {fullName, vehicle, email, phone, pickupAddress, pickupDate, returnDate} = req.body
    try{
        const reservation = await Reservation.create({fullName, vehicle, email, phone, pickupAddress, pickupDate, returnDate})
        //return status
        res.status(200).json(reservation)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// update a reservation 
const updateReservation = async (req, res) => {
    const { fullName } = req.params

    const reservation = await Reservation.findOneAndUpdate({ fullName: fullName}, {
        ...req.body
    })

    if(!reservation){
        return res.status(400).json({error: 'No such reservation'})
    }
    res.status(200).json(reservation)
}

//delete a reservation
const deleteReservation = async (req, res) => {
    const { fullName } = req.params

    const reservation = await Reservation.findOneAndDelete({ fullName: fullName })

    if(!reservation){
        return res.status(400).json({error: "No such reservation"})
    }

    res.status(200).json(reservation)
}


module.exports = { bookReservation, getReservations, getReservationByName, updateReservation, deleteReservation }
