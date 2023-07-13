const express = require('express');
const { CartRepository } = require('../repositories/cart.repositories');
const  TicketRepository  = require('../repositories/ticket.reposotories');
const  ProductRepository  = require('../repositories/product.repositories');
const { CartDao, ProductDao,TicketDao,UserDao } = require('../Dao/factory'); 
const { UserRepository } = require('../repositories/user.repositorie');
const ticketRepository = new  TicketRepository(TicketDao);
const cartRepository = new CartRepository(CartDao);
const productRepository = new ProductRepository(ProductDao);
const userRepository = new UserRepository(UserDao)
const router = express.Router();

const checkCartAssociation = async (req, res, next) => {
  const CartUserId = req.cookies.CartId;
  const cartId = req.params.cid;
  try {
    if (cartId != CartUserId) {
      return res.status(401).json({ message: 'Acceso denegado' });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
router.get('/:cid',checkCartAssociation, async (req, res) => {
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
  
  router.delete('/:cid/productsDelete/:pid',checkCartAssociation, async (req, res) => {
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
  
  router.put('/:cid',checkCartAssociation, async (req, res) => {
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
  router.post('/:cid/productsAdd/:pid',checkCartAssociation, async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;
  
      if (!cid || !pid || !quantity) {
        return res.status(400).json({ message: 'cid, pid, and quantity are required' });
      }
  
      const product = {
        id: pid,
        quantity: parseInt(quantity, 10),
      };
      const updatedCart = await cartRepository.addProductInCart(cid, product);
  
      if (!updatedCart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      res.json(updatedCart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.put('/:cid/productsUpdate/:pid',checkCartAssociation, async (req, res) => {
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
  
  router.delete('/:cid',checkCartAssociation, async (req, res) => {
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
  router.post('/:cid/purchase',checkCartAssociation, async (req, res) => {
    try {
      const cartId = req.params.cid;
      const cart = (await cartRepository.getCart(cartId))[0];
      if (!cart) {
        res.status(404).json({ message: 'Carrito no encontrado' });
        return;
      }
  
      let unprocessedProducts = [];
      let purchasedProducts = [];
      let ticketData;
  
      for (const cartItem of cart.products) {
        const product = await productRepository.getProductById(cartItem.product);
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
        ticketData = {
          userId: cart.userId,
          items: purchasedProducts
        };
        await ticketRepository.createTicket(ticketData);
      }
  
      for (const cartItem of unprocessedProducts) {
        await cartRepository.deleteProductInCart(cartId, cartItem.product);
      }
  
      res.status(200).json({
        message: 'Compra procesada',
        purchaseId: ticketData ? ticketData.purchaseId : null,
        unprocessedProducts: unprocessedProducts.map(item => item.product),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
  router.post('/create', async (req, res) => {
    try {
      const newCart = await cartRepository.createCart();
      const userId = req.cookies.userData._id;
      await userRepository.updateUserCart(userId,newCart._id)
      console.log(newCart);
      res.cookie('cartId', newCart._id, { httpOnly: true });
      res.status(200).json({ message: 'Carrito creado exitosamente' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
module.exports = router;
