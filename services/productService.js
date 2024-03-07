const { Product } = require('../models');

async function getAllProducts() {
  return Product.findAll();
}

async function getProductById(id) {
  return Product.findByPk(id);
}

async function createProduct(name, brand, model, price, color, details, data) {
  if (details) {
    // Estrutura 2
    const { brand: detailBrand, model: detailModel, color: detailColor } = details;
    return createSingleProduct(name, detailBrand, detailModel, price, detailColor, data);
  } else if (Array.isArray(data)) {
    // Estrutura 3
    return createMultipleProducts(name, data);
  } else if (typeof brand === 'string' && typeof model === 'string' && typeof price === 'number' && typeof color === 'string') {
    // Estrutura 1
    return createSingleProduct(name, brand, model, price, color, null);
  } else {
    throw new Error('Estrutura de dados inválida');
  }
}

async function createSingleProduct(name, brand, model, price, color, data) {
  const createdProduct = await Product.create({
    name,
    brand: brand || null,
    model: model || null,
    price,
    color: color || null,
  });

  if (data) {
    await createProductData(createdProduct.id, name, data);
  }

  return createdProduct;
}

async function createMultipleProducts(name, dataArray) {
  const createdProducts = await Promise.all(
    dataArray.map(async (dataItem) => {
      const { brand, model, data } = dataItem;
      return createSingleProduct(name, brand, model, null, null, data);
    })
  );

  return createdProducts;
}

async function createProductData(productId, name, dataItem) {
  const { price, color } = dataItem;
  return ProductData.create({ productId, name, price, color });
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
  deleteProduct
};
