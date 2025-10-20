const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const captainSchema=new mongoose.Schema({

    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be at least 3 characters long'],
        },
        lastname:{
            type:String,
            required:true,
            minlength:[3,'Last name must be at least 3 characters long'],
        }
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address']
    },

    password:{
        type:String,
        required:true,
        select :false

    },

    socketId:{
        type:String,
        default:null
    },

    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },

    vehicle:{
      color:{
        type:String,
        required:true
        },

        plate :{
            type:String,
            required:true
        },

        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity must be at least 1'],
        },

        vehicleType:{
            type:String,
            enum:['car','motorcycle','auto'],
            required:true
        }

    },

   location :{
    lat :{
        type:Number,
        default:0
   },

   lng :{
       type:Number,
       default:0
   }


   }


});



// model will be compiled after methods are attached to the schema

// Instance method to generate JWT
captainSchema.methods.generateAuthToken = function () {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not set. Set JWT_SECRET in your environment to generate tokens.');
    }
    return jwt.sign({ _id: this._id }, secret, { expiresIn: '24h' });
};

// Compare given password with stored hashed password
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Static helper to hash password before saving
captainSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};

const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel;