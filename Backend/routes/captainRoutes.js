const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captainController');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

// Captain registration
router.post('/register', [
	body('email').isEmail().withMessage('Invalid email address'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
	body('fullname.firstname').notEmpty().withMessage('Firstname is required'),
    //body('fullname.lastname').notEmpty().withMessage('Lastname is required'),
	
	body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
	body('vehicle.plate').notEmpty().withMessage('Vehicle plate is required'),
	body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
	body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type')
], captainController.register);

//Captain login
router.post('/login', [
	body('email').isEmail().withMessage('Invalid email address'),
	body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], captainController.login);

// Protected routes can use auth middleware (not added here)
router.get('/profile', authMiddleware.authCaptain, captainController.getProfile);
 router.post('/logout', authMiddleware.authCaptain, captainController.logout);

// Debug route to test captain lookup
// router.get('/debug/:id', async (req, res) => {
// 	try {
// 		const captainModel = require('../models/captain.model');
// 		const captain = await captainModel.findById(req.params.id);
// 		res.json({ 
// 			found: !!captain, 
// 			captain: captain ? { _id: captain._id, email: captain.email } : null 
// 		});
// 	} catch (err) {
// 		res.status(500).json({ error: err.message });
// 	}
// });

module.exports = router;

