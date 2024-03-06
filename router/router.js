// routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Você precisará criar esse middleware

const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');

// Rotas de Usuário
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);

// Rotas de Produto (protegidas por autenticação)
router.use(authMiddleware); // Todas as rotas abaixo exigem autenticação

router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;