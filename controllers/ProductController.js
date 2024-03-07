// controllers/ProductController.js
const productService = require('../services/productService');

async function getAllProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Erro ao obter produto por ID:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

async function createProduct(req, res) {
  try {
    const { name, brand, model, price, color, details, data } = req.body;

    if (Array.isArray(req.body.data)) {
 
      const createdProducts = await productService.createProductsFromArray(name, data);
      res.status(201).json(createdProducts);
    } else {

      const product = await productService.createProduct(name, brand, model, price, color, details, data);
      res.status(201).json(product);
    }
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const product = await productService.updateProduct(id, updatedData);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(product);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await productService.deleteProduct(id);

    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json({ message: 'Produto excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};