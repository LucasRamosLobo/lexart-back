const { Product, ProductDetail, ProductData } = require('../models');

async function getAllProducts() {
  return Product.findAll();
}

async function getProductById(id) {
  return Product.findByPk(id);
}

async function createProduct(name, brand, model, price, color) {
  let createdProduct;

  if (brand && model && color) {
    // Estrutura 2
    createdProduct = await Product.create({
      name,
      brand,
      model,
      price,
      color,
    });
  } else if (Array.isArray(price) && Array.isArray(color)) {
    // Estrutura 3
    createdProduct = await Product.create({
      name,
      brand,
      model,
    });

    const productDataArray = price.map((p, index) => ({
      productId: createdProduct.id,
      price: p,
      color: color[index],
    }));

    await ProductData.bulkCreate(productDataArray);
  } else {
    // Estrutura 1
    createdProduct = await Product.create({
      name,
      brand: brand || null,
      model: model || null,
      price,
      color: color || null,
    });
  }

  return createdProduct;
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
