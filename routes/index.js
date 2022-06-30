const express = require('express');
const productsRouter = require("../routes/products.router")
const cognitoRouter = require("../routes/cognito.router")


function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/products', productsRouter);
    router.use('/user', cognitoRouter);
}
  
module.exports = routerApi;