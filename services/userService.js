// services/userService.js
const { User } = require('../models');

async function registerUser(username, password) {
  return User.create({ username, password });
}

async function loginUser(username, password) {
  try {
    console.log('Login attempt with username:', username);

    const user = await User.findOne({ where: { username } });

    if (!user) {
      console.log('User not found');
      throw new Error('Credenciais inválidas');
    }

    console.log('Login successful');
    return user;
  } catch (error) {
    console.error('Erro no loginUser:', error);
    throw error; 
  }
}

module.exports = {
  registerUser,
  loginUser,
};