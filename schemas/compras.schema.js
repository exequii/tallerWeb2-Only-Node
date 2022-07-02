const Joi = require("joi")

const usuario = Joi.string().min(6);
const carrito = Joi.string().min(6);

const createNewCompraSchema = Joi.object({
    usuario: usuario.required(),
    carrito: carrito.required(),
});

module.exports = { createNewCompraSchema };