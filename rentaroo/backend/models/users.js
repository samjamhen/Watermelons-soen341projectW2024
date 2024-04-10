const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema(
    {
        //Fields needed for all users
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },  

        password: {
            type: String,
            required: true
        },

        userType: {
            type: String,
            enum: ['client', 'customer_representative' , 'system_administrator'],
            default: 'client'
        },

        phoneNumber: {
            type: String,
            required: true,
            unique: true
        },

        specimenChequeSubmitted: {
            type: String,
            enum: ['yes', 'no'],
            default: 'no'
        }

        //Add fields specific to each user type
    }, 
    {timestamps: true}
);

//Static method to signup a user
userSchema.statics.signup = async function(name, email, password, phoneNumber) {

    //Validation
    if (!email || !password || !name || !phoneNumber) {
        throw Error('All fields must be filled');
    }
    if (!/\s/.test(name)) {
        throw Error('Please enter your full name');
    }
    if (!validator.isEmail(email)) {
        throw Error('Please enter a valid email');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Please enter a strong password');
    }
    if (!validator.matches(phoneNumber, /^\d{3}-\d{3}-\d{4}$/)) {
        throw Error('Please enter a valid phone number');
    }

    const emailExists = await this.findOne({email});
    const phoneNumberExists = await this.findOne({phoneNumber});
    if (emailExists) {
        throw Error('Email already in use');
    }
    if (phoneNumberExists) {
        throw Error('Phone number already in use');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.create({name, email, password: hashedPassword, phoneNumber});

    return user
}

//Static method to login a client
userSchema.statics.login = async function(email, password, userType) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({email});

    if (!user) {
        throw Error('Invalid email');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw Error('Incorrect password');
    }

    if (user.userType !== userType) {
        throw Error('Please login as a ' + user.userType);
    }

    return user
}

{/*}
//Middleware to hash the password before saving
userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});
{*/}

const Users = mongoose.model('Users', userSchema)

module.exports = Users