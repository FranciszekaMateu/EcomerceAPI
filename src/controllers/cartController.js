const { InMemoryTicketRepository } = require("../repositories/cart.reposotories");
const { errorDictionary, AppError } = require("../middlewares/manejadorErrores");
const {cartDao} = require("../Dao/factory");
const productRepository = new ProductRepository(productDao);

class ProductController {
  async getProducts(req, res, next) {
    try {
      const { limit, page, category, sort } = req.query;
      const products = await productRepository.getProducts({ limit, page, category, sort });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const productId = req.params.id;
      const product = await productRepository.getProductById(productId);

      if (!product) {
        throw errorDictionary.PRODUCT_NOT_FOUND;
      }

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const newProduct = req.body;
      const createdProduct = await productRepository.createProduct(newProduct);
      res.status(201).json(createdProduct);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const productId = req.params.id;
      const updatedProductData = req.body;
      const updatedProduct = await productRepository.updateProduct(productId, updatedProductData);

      if (!updatedProduct) {
        throw errorDictionary.PRODUCT_NOT_FOUND;
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }

  async removeProduct(req, res, next) {
    try {
      const productId = req.params.id;
      const removedProduct = await productRepository.removeProduct(productId);

      if (!removedProduct) {
        throw errorDictionary.PRODUCT_NOT_FOUND;
      }

      res.status(200).json(removedProduct);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;