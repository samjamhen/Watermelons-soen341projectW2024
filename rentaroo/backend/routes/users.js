const express = require('express')
const User = require('../models/users')
const {createUser, getUsers, getUser, updateUser, deleteUser} = require('../controllers/users')

const router = express.Router()

//CREATE
router.post('/', createUser)

//READ ALL
router.get('/', getUsers)

//READ ONE
router.get('/:id', getUser)

//UPDATE
router.put('/:id', updateUser)

//DELETE
router.delete('/:id', deleteUser)

module.exports = router