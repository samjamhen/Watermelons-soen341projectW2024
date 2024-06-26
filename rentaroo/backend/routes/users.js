const express = require('express')
const User = require('../models/users')
const {createUser, getUsers, getUser, updateUser, deleteUser, loginUser, signupUser} = require('../controllers/users')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// CREATE
router.post('/', createUser)

// READ ALL
router.get('/', getUsers)

// READ ONE
router.get('/:id', getUser)

// UPDATE
router.put('/:id', updateUser)

// DELETE
router.delete('/:id', deleteUser)

// LOGIN
router.post('/login', loginUser)

// SIGNUP
router.post('/signup', signupUser)

module.exports = router