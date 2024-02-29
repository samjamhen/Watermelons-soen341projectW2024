const express = require('express')
const User = require('../models/users')
const {createUser, getUsers, getUser} = require('../controllers/users')

const router = express.Router()

//CREATE
router.post('/', createUser)

//READ ALL
router.get('/', getUsers)

//READ ONE
router.get('/:id', getUser)

//UPDATE


//DELETE


module.exports = router