const captainServices = require('../services/captainServices');
const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/blacklistToken');
const captainModel = require('../models/captain.model');

module.exports.register = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	try {
		const { fullname, email, password,  vehicle} = req.body;

        const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exist' });
    }
        const { color, plate, capacity, vehicleType } = vehicle;
	const newCaptain = await captainServices.createCaptain({ fullname, email, password, vehicle: { color, plate, capacity, vehicleType } });
		const token = newCaptain.generateAuthToken();
		res.cookie('token', token, { httpOnly: true });
		res.status(201).json({ token, captain: newCaptain });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message || 'Internal server error' });
	}

};

module.exports.login = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

	try {
		const { email, password } = req.body;
		const captain = await captainModel.findOne({ email }).select('+password');
		if (!captain) return res.status(404).json({ error: 'Captain not found' });
		const isMatch = await captain.comparePassword(password);
		if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });
		//console.log('Login successful for captain:', captain._id);
		const token = captain.generateAuthToken();
		//console.log('Generated token for captain:', captain._id);
		res.cookie('token', token, { httpOnly: true });
		res.status(200).json({ token, captain });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports.logout = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await BlacklistToken.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });
};

module.exports.getProfile = async (req, res) => {
	try {
		// expecting auth middleware to set req.captainId or similar; fallback: return placeholder
		if (!req.captainId) return res.status(401).json({ error: 'Not authenticated' });
		const captain = await captainServices.findById(req.captainId);
		if (!captain) return res.status(404).json({ error: 'Captain not found' });
		res.status(200).json({ captain });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
};

// module.exports.logout = async (req, res) => {
// 	try {
// 		// Expect Authorization: Bearer <token>
// 		const authHeader = req.headers.authorization || '';
// 		const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
// 		if (!token) return res.status(400).json({ error: 'No token provided' });
// 		// Add to blacklist - optional: calculate expiry and pass as expiresAt
// 		await BlacklistToken.add(token);
// 		res.status(200).json({ message: 'Logged out' });
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json({ error: 'Internal server error' });
// 	}
// };
