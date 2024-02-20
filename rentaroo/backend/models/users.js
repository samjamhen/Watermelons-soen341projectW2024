const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

// Middleware to hash the password before saving
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the number of salt rounds
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const Users = mongoose.model('Users', userSchema)

module.exports = Users