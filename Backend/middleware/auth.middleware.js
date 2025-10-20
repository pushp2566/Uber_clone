const userModel=require('../models/user_model');
const captainModel=require('../models/captain.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistModel=require('../models/blacklistToken');
const dotenv = require('dotenv');
dotenv.config();

// Example controller function to create a new user

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const blacklistedToken = await blacklistModel.findOne({ token });
    if (blacklistedToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

// Auth middleware for captains
// captainModel is already required above

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized1' });
    }

    const blacklistedToken = await blacklistModel.findOne({ token });
    if (blacklistedToken) {
        return res.status(401).json({ message: 'Unauthorized2' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('decoded token:', decoded);
        console.log('Looking for captain with _id:', decoded._id);
        console.log('_id type:', typeof decoded._id);
        console.log('_id value:', decoded._id);
        
        console.log('About to query database...');
        const captain = await captainModel.findById(decoded._id);
       // console.log('Database query completed');
        //console.log('Found captain:', captain ? 'YES' : 'NO');
        //console.log('Captain object:', captain);

        if (!captain) {
           // console.log('Captain not found in database with _id:', decoded._id);
            return res.status(401).json({ message: 'Unauthorized3' });
        }

        req.captain = captain;
        req.captainId = decoded._id;

        return next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};