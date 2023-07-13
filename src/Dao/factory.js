const { persistence}= require('../config/config.js');
const {dbConnection}= require('../config/conectionDb.js');

let ProductDao;
let UserDao;
let CartDao;
let OrderDao;
let TicketDao;

switch (persistence) {
  case 'MONGO':
    const ProductDaoMongo = require('./mongo/productDaoMongo.js');
    ProductDao = new ProductDaoMongo();

    const UserDaoMongo = require('./mongo/userDaoMongo.js');
    UserDao = new UserDaoMongo();

    const CartDaoMongo = require('./mongo/cartDaoMongo.js');
    CartDao = new CartDaoMongo();

    const TicketDaoMongo = require('./mongo/ticketDaoMongo.js');
    TicketDao = new TicketDaoMongo();

    dbConnection();
    break;

  case 'MEMORY':
    const ProductDaoMemory = require('./memory/productDaoMemory.js');
    ProductDao = ProductDaoMemory;

    const UserDaoMemory = require('./memory/userDaoMemory.js');
    UserDao = UserDaoMemory;

    const CartDaoMemory = require('./memory/cartDaoMemory.js');
    CartDao = CartDaoMemory;

    const TicketDaoMemory = require('./memory/ticketDaoMemory.js');
    TicketDao = TicketDaoMemory;
    break;

  case 'ARCHIVO':
    // Agrega la implementación correspondiente para el caso de 'ARCHIVO'
    break;

  default:
    throw new Error('Persistencia no válida');
}

module.exports = {
  ProductDao,
  UserDao,
  CartDao,
  OrderDao,
  TicketDao
};
