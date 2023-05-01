let products = [];

class ProductDaoMemory {
  constructor() {}

  get({ limit = 10, page = 1, category = "", sort = 1 }) {
    try {
      const filteredProducts = category
        ? products.filter((product) => product.category === category)
        : products;

      const sortedProducts = filteredProducts.sort((a, b) => {
        return sort === 1 ? a.price - b.price : b.price - a.price;
      });

      const start = (page - 1) * limit;
      const end = start + limit;

      const paginatedProducts = sortedProducts.slice(start, end);

      return paginatedProducts;
    } catch (err) {
      return new Error(err);
    }
  }

  getById(pid) {
    try {
      const product = products.find((product) => product.id === pid);
      return product;
    } catch (err) {
      return new Error(err);
    }
  }

  create(newProduct) {
    try {
      products.push(newProduct);
      return newProduct;
    } catch (err) {
      return new Error(err);
    }
  }

  update(pid, updateProduct) {
    try {
      const productIndex = products.findIndex((product) => product.id === pid);

      if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], ...updateProduct };
        return products[productIndex];
      } else {
        return null;
      }
    } catch (err) {
      return new Error(err);
    }
  }

  remove(pid) {
    try {
      const productIndex = products.findIndex((product) => product.id === pid);

      if (productIndex !== -1) {
        products[productIndex].isActive = false;
        return products[productIndex];
      } else {
        return null;
      }
    } catch (err) {
      return new Error(err);
    }
  }
}

module.exports = ProductDaoMemory;

