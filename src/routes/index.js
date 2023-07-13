const { Router } = require('express')


const products = require("./products")
const users = require("./users")
const { errorHandler } = require('../middlewares/manejadorErrores');

const carts = require("./carts")

const router = Router();

const auth = require("./auth")

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')

//const { generateMockProducts } = require('../utils/mocking');

router.use(errorHandler);


router.use("/products",products)

router.use("/carts",carts)

router.use("/users",users)

router.use("/auth",auth)

//app.get('/mockingproducts', (req, res) => {
//    const products = generateMockProducts();
//    res.json(products);
//  });

const swaggerOptions = {
    definition: {
        info: {
            title: 'Documentation of api(products and cart)',
            description: 'Api para un eecomerce'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJsDoc(swaggerOptions)
router.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

module.exports = router;
