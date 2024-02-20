const express = require('express')
const User = require('../models/users')
const createUser = require('../controllers/users')

const router = express.Router()

//CREATE
router.post('/', createUser)

//READ


//UPDATE


//DELETE


module.exports = router