const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        //Fields needed for all users
        username: {
            type: String,
            required: [true, 'Please enter a username'],
            unique: [true, 'Username is taken. Please select another one']
        },

        email: {
            type: String,
            required: [true, 'Please enter an email'],
            unique: [true, 'This email is already in use. Please select another one']
        },  

        password: {
            type: String,
            required: true
        },

        userType: {
            type: String,
            enum: ['client', 'customer_representative' , 'system_administrator'],
            required: true
        },

        //Add fields specific to each user type
    }, 
    {timestamps: true}
);

const Users = mongoose.model('Users', userSchema)

module.exports = Users