const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const UserController = require('../controllers/UserController');
const ProductController = require('../controllers/ProductController');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.use(authMiddleware);
router.get('/products', ProductController.getAllProducts);
router.get('/products/:id', ProductController.getProductById);
router.post('/products', ProductController.createProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);
router.post('/products/search', ProductController.searchProducts);

module.exports = router;