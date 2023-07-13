let carts = [];

class CartDaoMemory {
  constructor() {}

  getCarts() {
    return carts;
  }

  getCart(id) {
    return carts.find((cart) => cart.id === id) || null;
  }

  createCart() {
    const newCart = { id: Date.now(), products: [] };
    carts.push(newCart);
    return newCart
  }

  addProductInCart(cid, product) {
    const cart = carts.find((cart) => cart.id === cid);

    if (cart) {
      const existingProduct = cart.products.find((p) => p.product === product.id);

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        cart.products.push({ product: product.id, quantity: product.quantity });
      }

      return cart;
    }

    return null;
  }

  deleteProductInCart(cid, pid) {
    const cart = carts.find((cart) => cart.id === cid);

    if (cart) {
      cart.products = cart.products.filter((product) => product.product !== pid);
      return cart;
    }

    return null;
  }

  deleteCart(cid) {
    const cart = carts.find((cart) => cart.id === cid);

    if (cart) {
      cart.products = [];
      return cart;
    }

    return null;
  }
}

module.exports = {
  CartDaoMemory
};
