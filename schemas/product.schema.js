const Joi = require('joi');

const codigo = Joi.string().min(6);
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const details = Joi.string().min(10);
const img = Joi.string().min(10); //ver como cambiar por imagen
const ofert = Joi.boolean();
const desc = Joi.number().integer().min(0).max(100);
const cantidad = Joi.number().integer().min(0);

const createProductSchema = Joi.object({
    codigo: codigo.required(),
    name: name.required(),
    price: price.required(),
    details: details.required(),
    img: img.required(),
    ofert: ofert.required(),
    desc: desc.required(),
    cantidad: cantidad.required()
});

const getProductSchema = Joi.object({
    codigo: codigo.required()
});


module.exports = {createProductSchema, getProductSchema};

