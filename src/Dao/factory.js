const { persistence, dbConnection } = require('../config/config.js');

let ProductDao;
let UserDao;
let CartDao;
let OrderDao;

switch (persistence) {
    case 'MONGO':
        dbConnection(); // Establecer conexión a la base de datos
        const ProductDaoMongo = require('./mongo/productDaoMongo.js');
        ProductDao = ProductDaoMongo;

        const UserDaoMongo = require('./mongo/userDapMongo.js');
        UserDao = UserDaoMongo;
        break;

    case 'MEMORY':
        const UserDaoMemory = require('./memory/user.memory.js');
        UserDao = UserDaoMemory;
        break;

    case 'ARCHIVO':
        // Implementación pendiente para la persistencia en archivos
        break;

    default:
        // Implementación por defecto o mensaje de error si es necesario
        break;
}

module.exports = {
    ProductDao,
    UserDao,
    CartDao,
    OrderDao
};