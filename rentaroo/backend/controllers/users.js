const User = require('../models/users')
const jwt = require('jsonwebtoken')

//Create a token
const createToken = (_id) => {
    return jwt.sign({ _id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: '2d' })
}

//CREATE
const createUser = async(req, res) => {
    const {name, email, password, userType, phoneNumber} = req.body
    try {
        const user = await User.create({name, email, password, userType, phoneNumber})
        if (!user) {
            return res.status(404).json({error: 'User not created'})
        }
        res.status(200).json(user)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
} 

//READ ALL
const getUsers = async(req, res) => {
    try {
        const users = await User.find()
        if (!users) {
            return res.status(404).json({error: 'No users found'})
        }
        res.status(200).json(users)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

//READ ONE
const getUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({error: 'User not found'})
        }
        res.status(200).json(user)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

//UPDATE
const updateUser = async (req, res) => {
    const {name, email, password, userType, phoneNumber} = req.body
    const {id} = req.params
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {name, email, password, userType, phoneNumber}, { new: true })
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//DELETE
const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status(404).json({error: 'User not found'})
        }
        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//LOGIN
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)
        if (!user) {
            return res.status(404).json({error: 'User not found'})
        }
        const token = createToken(user._id) //Create token
        res.status(200).json({user, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//SIGNUP
const signupUser = async (req, res) => {
    const {name, email, password, phoneNumber} = req.body

    try {
        const user = await User.signup(name, email, password, phoneNumber)
        if (!user) {
            return res.status(404).json({error: 'User not created'})
        }
        const token = createToken(user._id) //Create token
        res.status(200).json({user, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {createUser, getUsers, getUser, updateUser, deleteUser, loginUser, signupUser}