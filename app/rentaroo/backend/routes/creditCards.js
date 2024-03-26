const express = require('express')
const CreditCard = require("../models/creditCards.js")
const { createCreditCard, getCreditCards, getCreditCard, getCreditCardByNumber, updateCreditCard, deleteCreditCard } = require("../controllers/creditCards.js")

const router = express.Router()

//get all credit cards
router.get("/", getCreditCards);

//get a credit card
router.get("/:_id", getCreditCard);

//get a credit card by number
router.get("/cardNumber/:number", getCreditCardByNumber);

//create a credit card
router.post("/", createCreditCard);

//update a credit card
router.patch("/:_id", updateCreditCard);

//delete a credit card
router.delete("/:_id", deleteCreditCard);

module.exports = router;