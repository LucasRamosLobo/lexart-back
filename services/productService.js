const { Product, ProductDetail, ProductData } = require('../models');

async function getAllProducts() {
  return Product.findAll();
}

async function getProductById(id) {
  return Product.findByPk(id);
}

async function createProduct(name, brand, model, price, color, details, data) {
  if (Array.isArray(data)) {
    // Estrutura 3: Array de produtos
    const createdProducts = await Promise.all(data.map(dataItem => createProductFromArray(name, dataItem)));
    return createdProducts;
  } else if (details) {
    // Estrutura 2: Detalhes incluídos
    return createProductWithDetails(name, details, price);
  } else {
    // Estrutura 1: Formato padrão
    return createProductFromArray(name, { brand, model, color, price });
  }
}

async function createProductFromArray(name, dataItem) {
  const { brand, model, color, price } = dataItem;
  const createdProduct = await Product.create({ name, brand, model });
  await createProductData(createdProduct.id, { price, color });
  return createdProduct;
}

async function createProductWithDetails(name, details, price) {
  const { brand, model, color } = details;
  const createdProduct = await Product.create({ name, brand, model });
  await ProductDetail.create({ productId: createdProduct.id, color });
  await createProductData(createdProduct.id, { price, color });
  return createdProduct;
}

async function createProductData(productId, dataItem) {
  const { price, color } = dataItem;
  return ProductData.create({ productId, price, color });
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
  updateProduct,
  deleteProduct,
};
