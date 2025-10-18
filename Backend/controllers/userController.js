const userServices=require('../services/userServices');

const {validationResult}=require('express-validator');

module.exports.register=async (req,res )=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { fullname, email, password } = req.body;
        const newUser = await userServices.createUser({ fullname,email, password });
        const token = newUser.generateAuthToken();
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};



