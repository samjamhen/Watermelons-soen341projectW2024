const Reservation = require('../models/reservations.js')

//get all reservations


//get a single reservation


//create a reservation
const bookReservation = async (req, res) =>{
    const { reservationID, name, vehicle, reservationStartDate, reservationEndDate} = req.body
    try{
        const reservation = await Reservation.create({reservationID, name, vehicle, reservationStartDate, reservationEndDate})
        //return status
        res.status(200).json(reservation)
    } catch(error){
        res.status(400).json({error: error.message})
    }
}



//delete a reservation



module.exports = bookReservation