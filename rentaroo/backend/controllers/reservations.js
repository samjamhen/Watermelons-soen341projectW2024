const Reservation = require('../models/reservations.js')

//get all reservations
const getReservations = async (req, res) => {
    const reservations = await Reservation.find({}).sort({createAt: -1})

    res.status(200).json(reservations)
}

//get a single reservation by its reference Number
const getReservationByID = async (req, res) => {
    const { id } = req.params

    try{
        const reservation = await Reservation.findOne({ id: id})
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

//create a reservation
const bookReservation = async (req, res) =>{
    const {id, userID, fullName, vehicle, email, phone, pickupAddress, pickupDate, returnDate} = req.body
    try{
        const reservation = await Reservation.create({id, userID, fullName, vehicle, email, phone, pickupAddress, pickupDate, returnDate})
        //return status
        res.status(200).json(reservation)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

// update a reservation by name
const updateReservation = async (req, res) => {
    const { _id } = req.params

    const reservation = await Reservation.findOneAndUpdate({ _id: _id}, {
        ...req.body
    })

    if(!reservation){
        return res.status(400).json({error: 'No such reservation'})
    }
    res.status(200).json(reservation)
}

//delete a reservation by reference number 
const deleteReservationByID = async (req, res) => {
    const { _id } = req.params

    const reservation = await Reservation.findOneAndDelete({ _id: _id })

    if(!reservation){
        return res.status(400).json({error: "No such reservation"})
    }

    res.status(200).json(reservation)
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

//delete a reservation by name
const deleteReservationByPhone = async (req, res) => {
    const { phone } = req.params

    const reservation = await Reservation.findOneAndDelete({ phone: phone })

    if(!reservation){
        return res.status(400).json({error: "No such reservation"})
    }

    res.status(200).json(reservation)
}


module.exports = { bookReservation, getReservations, getReservationByID, getReservationByName, getReservationByPhone, updateReservation, deleteReservationByID, deleteReservationByName, deleteReservationByPhone }
