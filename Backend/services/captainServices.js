const captainModel = require('../models/captain.model');

exports.createCaptain = async ({ fullname, email, password, vehicle }) => {
	const { color, plate, capacity, vehicleType } = vehicle || {};
	if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
		throw new Error('All fields are required');
	}
	const hashedPassword = await captainModel.hashPassword(password);
	// create a document instance and save it
	const newCaptain = new captainModel({
		fullname: {
			firstname: fullname.firstname,
			lastname: fullname.lastname
		},
		email,
		password: hashedPassword,
		vehicle: {
			color,
			plate,
			capacity,
			vehicleType
		}
	});
	await newCaptain.save();
	return newCaptain;
};

// exports.findByEmail = async (email) => {
// 	return await captainModel.findOne({ email }).select('+password');
// };

exports.findById = async (id) => {
	return await captainModel.findById(id).select('-password');
};

// // exports.authCaptain = async (email, password) => {
// // 	const captain = await captainModel.findOne({ email }).select('+password');
// // 	if (!captain) throw new Error('Captain not found');
// // 	const isMatch = await captain.comparePassword(password);
// // 	if (!isMatch) throw new Error('Invalid credentials');
// // 	// remove password when returning
// // 	const safeCaptain = await captainModel.findById(captain._id).select('-password');
// // 	const token = captain.generateAuthToken();
// // 	return { captain: safeCaptain, token };
// // };
