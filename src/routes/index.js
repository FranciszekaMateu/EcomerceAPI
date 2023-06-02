const { Router } = require('express')

const viewRouter = require("./viewRouter")

const products = require("./products")

const { errorHandler } = require('./middlewares/errorHandler');

const carts = require("./carts")

const router = Router();

const auth = require("./auth")

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')

app.use(errorHandler);

const { generateMockProducts } = require('../utils/mocking');

router.use("/",viewRouter)

router.use("/api/products",products)

router.use("/api/carts",carts)

module.exports = router;

router.use("api/auth",auth)

app.get('/mockingproducts', (req, res) => {
    const products = generateMockProducts();
    res.json(products);
  });

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
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))