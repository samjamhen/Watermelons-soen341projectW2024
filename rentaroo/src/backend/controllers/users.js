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

//READ











//UPDATE

//DELETE

module.exports = createUser