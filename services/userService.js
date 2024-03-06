// services/userService.js
const { User } = require('../models');

async function registerUser(username, password) {
  return User.create({ username, password });
}

async function loginUser(username, password) {
  const user = await User.findOne({ where: { username } });

  if (!user || !user.comparePassword(password)) {
    throw new Error('Credenciais inválidas');
  }

  return user;
}

module.exports = {
  registerUser,
  loginUser,
};
