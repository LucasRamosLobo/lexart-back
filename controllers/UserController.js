// controllers/UserController.js
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


async function registerUser(req, res) {
  try {
    const { username, password } = req.body;

    // Certifique-se de que a função `registerUser` do serviço está funcionando corretamente
    await userService.registerUser(username, password);

    // Consulta novamente o usuário recém-criado
    const createdUser = await User.findOne({ where: { username } });

    if (!createdUser) {
      throw new Error('Erro ao criar o usuário');
    }

    res.status(201).json({ message: 'Usuário registrado com sucesso!', user: createdUser });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro interno no servidor', details: error.message });
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