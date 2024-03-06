// controllers/UserController.js
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
  try {
    const { username, password } = req.body;
    await userService.registerUser(username, password);
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
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