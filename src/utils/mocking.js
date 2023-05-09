
const faker = require('faker');

function generateMockProducts(numeroProductos = 100) {
  const productos = [];

  for (let i = 0; i < numProductos; i++) {
    productos.push({
      _id: faker.datatype.uuid(),
      title: faker.commerce.productName(),
      code: faker.random.alphaNumeric(10),
      category: faker.commerce.department(),
      imageUrl: faker.image.imageUrl(),
      isActive: faker.random.boolean(),
      stock: faker.datatype.number({ min: 0, max: 100 }),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      atCreate: faker.date.past(),
    });
  }

  return productos;
}

module.exports = {
  generateMockProducts,
};