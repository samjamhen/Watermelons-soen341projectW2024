const CreditCard = require("../models/creditCards");

//create a credit Card
const createCreditCard = async(req, res) => {
    const {number, CVV, balance, expiry } = req.body
    try {
        const creditCard = await CreditCard.create({number, CVV, balance, expiry})
        if (!creditCard) {
            return res.status(404).json({error: 'Credit Card not created'})
        }
        res.status(200).json(creditCard)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
} 

//get all credit cards
const getCreditCards = async (req, res) => {
    try{
        const creditCards = await CreditCard.find({}).sort({ createAt: -1 });
        if(!creditCards){
            return res.status(404).json({error: "No Credit Cards"})
        }
        res.status(200).json(creditCards);
    } catch (error){
        res.status(500).json({ error: error.message })
    }
}

//get a single credit card
const getCreditCard = async (req, res) => {
    try{
        const creditCard = await CreditCard.findById(req.params._id)
        if(!creditCard){
            return res.status(404).json({error: "Credit Card Not Found"})
        }
        res.status(200).json(creditCard)
    } catch (error){
        res.status(500).json({error: error.message})
    }
}

//update a credit card
const updateCreditCard = async (req, res) => {
    const {number, CVV, balance, expiry} = req.body
    const {_id} = req.params
    try {
        const updatedCreditCard = await CreditCard.findByIdAndUpdate(_id, {number, CVV, balance, expiry}, { new: true })
        if (!updatedCreditCard) {
            return res.status(404).json({ error: 'Credit Card not found' })
        }
        res.status(200).json(updatedCreditCard)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a credit card
const deleteCreditCard = async (req, res) => {
    const {_id} = req.params;
    try {
        const deletedCreditCard = await CreditCard.findByIdAndDelete(_id)
        if (!deletedCreditCard) {
            return res.status(404).json({error: 'Credit Card not found'})
        }
        res.status(200).json({ message: 'Credit Card deleted successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {createCreditCard, getCreditCards, getCreditCard, updateCreditCard, deleteCreditCard}