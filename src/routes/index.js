const { Router } = require('express')
const viewRouter = require("./viewRouter")
const products = require("./products")
const carts = require("./carts")
const router = Router();
const auth = require("./auth")
const auth = require("./auth"
router.use("/",viewRouter)
router.use("/api/products",products)
router.use("/api/carts",carts)
module.exports = router;
router.use("api/auth",auth)