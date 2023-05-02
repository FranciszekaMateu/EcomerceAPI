const express = require('express');
const { CartRepository } = require('../repositories/cartRepository');
const { TicketRepository } = require('../repositories/ticketRepository');
const { ProductRepository } = require('../repositories/productRepository');
const { CartDao, ProductDao,ticketDao } = require('../dao/factory'); 
const ticketRepository =  TicketRepository(ticketDao)
const cartRepository = new CartRepository(CartDao);
const productRepository = new ProductRepository(ProductDao);
const router = express.Router();
router.get('/:cid', async (req, res) => {
    try {
      const cart = await cartRepository.getCart(req.params.cid);
      if (!cart) {
        return res.status(404).send();
      }
      res.render('carts', cart);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });
  
  router.delete('/:cid/products/:pid', async (req, res) => {
    try {
      const cart = await cartRepository.deleteProductInCart(req.params.cid, req.params.pid);
      if (!cart) {
        return res.status(404).send();
      }
      res.send(cart);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });
  
  router.put('/:cid', async (req, res) => {
    try {
      const cart = await cartRepository.updateCartProducts(req.params.cid, req.body);
      if (!cart) {
        return res.status(404).send();
      }
      res.send(cart);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });
  
  router.put('/:cid/products/:pid', async (req, res) => {
    try {
      const cart = await cartRepository.updateProductQuantity(req.params.cid, req.params.pid, req.body.quantity);
      if (!cart) {
        return res.status(404).send();
      }
      res.send(cart);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });
  
  router.delete('/:cid', async (req, res) => {
    try {
      const cart = await cartRepository.deleteCart(req.params.cid);
      if (!cart) {
        return res.status(404).send();
      }
      res.send(cart);
    } catch (error) {
      console.error(error);
      res.status(500).send();
    }
  });
  router.post('/:cid/purchase', async (req, res) => {
    try {
      const cartId = req.params.cid;
      const cart = await cartRepository.getCart(cartId);
      if (!cart) {
        res.status(404).json({ message: 'Carrito no encontrado' });
        return;
      }
  
      let unprocessedProducts = [];
      const purchasedProducts = [];
  
      for (const cartItem of cart.items) {
        const product = await productRepository.getProductById(cartItem.productId);
        if (!product) {
          unprocessedProducts.push(cartItem);
          continue;
        }
  
        if (product.stock >= cartItem.quantity) {
          product.stock -= cartItem.quantity;
          await productRepository.updateProduct(product._id, { stock: product.stock });
          purchasedProducts.push(cartItem);
        } else {
          unprocessedProducts.push(cartItem);
        }
      }
  
      if (purchasedProducts.length > 0) {
        const ticketData = {
          userId: cart.userId,
          items: purchasedProducts,
          purchaseId: uuidv4(),
        };
        await ticketRepository.createTicket(ticketData);
      }
  
      await cartRepository.updateCartProducts(cartId, unprocessedProducts);
  
      res.status(200).json({
        message: 'Compra procesada',
        purchaseId: ticketData.purchaseId,
        unprocessedProducts: unprocessedProducts.map(item => item.productId),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
  
module.exports = router;
