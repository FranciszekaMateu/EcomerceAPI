// cartRepository.js
class CartRepository {
    constructor(cartDAO) {
      this.cartDAO = cartDAO;
    }
  
    async getCarts() {
      return await this.cartDAO.getCarts();
    }
  
    async getCart(id) {
      return await this.cartDAO.getCart(id);
    }
  
    async createCart() {
      return await this.cartDAO.createCart();
    }
  
    async addProductInCart(cid, product) {
      return await this.cartDAO.addProductInCart(cid, product);
    }
  
    async deleteProductInCart(cid, pid) {
      return await this.cartDAO.deleteProductInCart(cid, pid);
    }
  
    async deleteCart(cid) {
      return await this.cartDAO.deleteCart(cid);
    }
}
  
  module.exports = {
    CartRepository,
  };
  