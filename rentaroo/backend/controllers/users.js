const User = require('../models/users')

//CREATE
const createUser = async(req, res) => {
    const {username, email, password, userType} = req.body
    try {
        const user = await User.create({username, email, password, userType})
        res.status(200).json(user)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
} 

//READ ALL
const getUsers = async(req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

//READ ONE
const getUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}











//UPDATE


//DELETE


module.exports = {createUser, getUsers, getUser}