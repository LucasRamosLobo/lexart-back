const { Product, ProductDetail, ProductData } = require('../models');

async function createProduct(productData) {
 
  if (Array.isArray(productData)) {
   
    const createdProducts = await Promise.all(productData.map(createProductFromArray));
    return createdProducts;
  } else if (productData.details) {
    
    return createProductWithDetails(productData);
  } else {
  
    return createProductFromArray(productData);
  }
}

async function createProductFromArray(productData) {
  const { name, brand, model, data, price, color } = productData;
  
  
  const createdProduct = await Product.create({ name, brand, model });

  if (data) {

    await Promise.all(data.map(dataItem => createProductData(createdProduct.id, dataItem)));
  } else {
 
    await createProductData(createdProduct.id, { price, color });
  }

  return createdProduct;
}

async function createProductWithDetails(productData) {
  const { name, details, price } = productData;
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

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
