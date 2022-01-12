const User = require('../models/Users').User

exports.createUser = async (newUser) => {
  try {
    const user = new User(newUser);
    return await user.save();

  } catch (error) {
    console.log(error);
  }
}

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email: email })
}