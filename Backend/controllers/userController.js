const userServices=require('../services/userServices');
const userModel=require('../models/user_model');

const {validationResult}=require('express-validator');
const blacklistModel=require('../models/blacklistToken');


module.exports.register=async (req,res )=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { fullname, email, password } = req.body;
        const alreadyExists = await userModel.findOne({ email });
        if (alreadyExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = await userServices.createUser({ fullname,email, password });
        const token = newUser.generateAuthToken();
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.login=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user= await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = user.generateAuthToken();
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.getProfile=async (req,res)=>{
    try {
        const user = req.user;
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

};

module.exports.logout=async (req,res)=>{
    try {
        res.clearCookie('token');

        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }
        const blacklistedToken = new blacklistModel({ token });
        await blacklistedToken.save();
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};  
