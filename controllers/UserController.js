// controllers/UserController.js
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


async function registerUser(username, password) {
  try {
    return await User.create({ username, password });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error; // Rejeita o erro para que possa ser capturado no controlador
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await userService.loginUser(username, password);
    const token = jwt.sign({ userId: user.id }, 'secretpassphrase', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(401).json({ error: 'Credenciais inválidas' });
  }
}

module.exports = {
  registerUser,
  loginUser,
};