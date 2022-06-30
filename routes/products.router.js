const express = require('express');
const router = express.Router();
const validatorHandler = require('../middleware/validator.handler');
const {createProductSchema, getProductSchema} = require('../schemas/product.schema');
const {getAllProducts, getOneProduct, createNewProduct, deleteProduct} = require('../services/products.service');

router.get("/",getAllProducts)
router.get("/:codigo",validatorHandler(getProductSchema,'params'),getOneProduct)
router.delete("/:codigo",validatorHandler(getProductSchema,'body'),deleteProduct)
router.post("/newProduct",validatorHandler(createProductSchema,'body'),createNewProduct);

module.exports = router;

