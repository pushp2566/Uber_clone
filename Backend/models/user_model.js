const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: { type: String, required: true, minlength: [3, 'Firstname must be at least 3 characters long'] },
        lastname: { type: String, required: true, minlength: [3, 'Lastname must be at least 3 characters long'] },
    },
    email: { type: String, required: true, unique: true, minlength: [5, 'Email must be at least 5 characters long'] },
    password: { type: String, required: true, select: false },
    socketId: { type: String, default: null },
});

userSchema.methods.generateAuthToken = function () {
    const secret = process.env.JWT_SECRET || null;
    if (!secret) {
        console.warn('JWT_SECRET is not set. Generating token with null secret will fail in production.');
    }
    const token = jwt.sign(
        { _id: this._id },
        secret,
        { expiresIn: '1h' }
    );
    return token;
};

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const User = mongoose.model('User', userSchema);
module.exports = User;



