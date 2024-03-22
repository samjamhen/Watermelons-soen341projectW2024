const jwt = require('jsonwebtoken');
const User = require('../models/users');

const requireAdmin = async (req, res, next) => {
    // Verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        // Verify JWT token
        const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Find user by _id
        const user = await User.findOne({ _id });

        // Check if user exists and has userType "system_administrator"
        if (!user || user.userType !== 'system_administrator') {
            return res.status(403).json({ error: 'Access denied. Only System Administrators can access this resource.' });
        }

        // Attach user object to request
        req.user = user;
        next(); 
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAdmin;
