// services/productService.js
const { Product } = require('../models');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

async function searchProducts(query) {
  return Product.findAll({
    where: {
      name: {
        [Op.iLike]: `%${query}%`
      }
    }
  });
}

async function getAllProducts() {
  return Product.findAll();
}

async function getProductById(id) {
  return Product.findByPk(id);
}

async function createProduct(name, brand, model, price, color) {
  return Product.create({ name, brand, model, price, color });
}

async function createProductFromDetails(name, details, price) {
  const { brand, model, color } = details;
  return Product.create({ name, brand, model, price, color });
}

async function createProductsFromArray(productsArray) {
  const createdProducts = await Promise.all(
    productsArray.map(async (productData) => {
      const { name, brand, model, data } = productData;
      const createdProduct = await createProduct(name, brand, model, null, null);

      if (data && Array.isArray(data)) {
        await Promise.all(
          data.map(async (dataItem) => {
            const { price, color } = dataItem;
            await createProductData(createdProduct.id, name, { price, color });
          })
        );
      }

      return createdProduct;
    })
  );

  return createdProducts;
}

async function createProductData(productId, name, dataItem) {
  const { price, color } = dataItem;
  return Product.update(
    { price, color },
    { where: { id: productId, name: name } }
  );
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
  return { message: 'Produto apagado com sucesso', status: 200 };
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  createProductFromDetails,
  createProductsFromArray,
  updateProduct,
  deleteProduct,
  searchProducts,
};
