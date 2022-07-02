const express = require('express');
const { nuevaCompra } = require('../services/compras.service');
const router = express.Router();
const validatorHandler = require('../middleware/validator.handler');
const { createNewCompraSchema } = require('../schemas/compras.schema');

router.post("/nuevaCompra",validatorHandler(createNewCompraSchema,'body'),nuevaCompra);

module.exports = router;