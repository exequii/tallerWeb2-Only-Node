const express = require('express');
const { nuevaCompra } = require('../services/compras.service');
const router = express.Router();

router.post("/nuevaCompra",nuevaCompra);

module.exports = router;