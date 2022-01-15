const User = require('../models/Users.model').User

exports.createUser = async (newUser) => {
  try {
    const user = new User(newUser);
    return await user.save();

  } catch (error) {
    console.log(error);
  }
}

exports.updateUser = async (id, body) => {
  return await User.findOneAndUpdate({
    _id: id
  }, body)
}

exports.deleteUser = async (id) => {
  return await User.findOneAndRemove({
    _id:id
  })
}

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email: email })
}

exports.getAll = async () => {
  return await User.find().sort({
    'email': 1
  })
}

