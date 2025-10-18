const userModel=require('../models/user_model');

// Example controller function to create a new user
exports.createUser = async ({ fullname, email, password }) => {
  if(!fullname.firstname || !email || !password) {
    throw new Error('All fields are required');
  }
  const hashedPassword = await userModel.hashPassword(password);
  const newUser = new userModel({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname
    },
    email,
    password: hashedPassword
  });
  await newUser.save();
    return newUser;
};
