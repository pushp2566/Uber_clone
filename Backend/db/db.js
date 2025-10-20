const mongoose = require('mongoose');

function connectDB() {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
}
module.exports = connectDB;
