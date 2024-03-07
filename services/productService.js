const { Product } = require('../models');

async function getAllProducts() {
  return Product.findAll();
}

async function getProductById(id) {
  return Product.findByPk(id);
}

async function createProduct(name, brand, model, price, color, details, data) {
  let createdProduct;

  if (details) {
    // Estrutura 2
    const { brand: detailBrand, model: detailModel, color: detailColor } = details;
    createdProduct = await Product.create({
      name,
      brand: detailBrand || null,
      model: detailModel || null,
      price,
      color: detailColor || null,
    });

    if (data) {
      await createProductData(createdProduct.id, data);
    }
  } else if (Array.isArray(data)) {
    // Estrutura 3
    const createdProducts = await createProductsFromArray(name, data);
    return createdProducts;
  } else if (typeof brand === 'string' && typeof model === 'string' && typeof price === 'number' && typeof color === 'string') {
    // Estrutura 1
    createdProduct = await Product.create({
      name,
      brand,
      model,
      price,
      color,
    });
  } else {
    throw new Error('Estrutura de dados inválida');
  }

  return createdProduct;
}

async function createProductsFromArray(name, dataArray) {
  const createdProducts = await Promise.all(
    dataArray.map(async (dataItem) => {
      const { brand, model, color, price } = dataItem;
      const createdProduct = await Product.create({
        name,
        brand: brand || null,
        model: model || null,
        price,
        color: color || null,
      });

      if (price && color) {
        await createProductData(createdProduct.id, { price, color });
      }

      return createdProduct;
    })
  );

  return createdProducts;
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
  createProductsFromArray
};
