const express = require('express');
const productsRouter = require("../routes/products.router")
const cognitoRouter = require("../routes/cognito.router")
const compraRouter = require("../routes/compra.router")


function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/products', productsRouter);
    router.use('/user', cognitoRouter);
    router.use('/compra', compraRouter);
}
  
module.exports = routerApi;