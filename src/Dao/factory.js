const { persistence, dbConnection } = require('../config/config.js');

let ProductDao;
let UserDao;
let CartDao;
let OrderDao;
let ticketDao;

switch (persistence) {
    case 'MONGO':
        dbConnection(); 
        const ProductDaoMongo = require('./mongo/productDaoMongo.js');
        ProductDao = ProductDaoMongo;

        const UserDaoMongo = require('./mongo/userDapMongo.js');
        UserDao = UserDaoMongo;

        const CartDaoMongo = require("./mongo/cartDaoMongo.js")
        CartDao = CartDaoMongo;
        
        const ticketDaoMongo = require("./mongo/ticketDaoMongo.js")
        ticketDao = ticketDaoMongo;
        break;

    case 'MEMORY':
        const UserDaoMemory = require('./memory/user.memory.js');
        UserDao = UserDaoMemory;

        const ProductDaoMongo = require('./memory/productDaoMongo.js');
        ProductDao = ProductDaoMongo;
        
        const cartDaoMemory = require('./memory/cartDaoMongo.js')
        CartDao = cartDaoMemory;
        break;
    case 'ARCHIVO':
        break;

    default:
        break;
}

module.exports = {
    ProductDao,
    UserDao,
    CartDao,
    OrderDao,
    ticketDao
};