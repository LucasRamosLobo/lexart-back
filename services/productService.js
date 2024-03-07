// services/productService.js
const { Product } = require('../models/Product');

async function getAllProducts() {
  return Product.findAll();
}

async function getProductById(id) {
  return Product.findByPk(id);
}

async function createProduct(data) {
  return Product.create(data);
}

async function updateProduct(id, updatedData) {
  const product = await getProductById(id);

  if (!product) {
    throw new Error('Produto não encontrado');
  }

  return product.update(updatedData);
}

async function deleteProduct(id) {
  const product = await getProductById(id);

  if (!product) {
    throw new Error('Produto não encontrado');
  }

  await product.destroy();
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
