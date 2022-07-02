const mongoose = require("mongoose")

const Compra = mongoose.Schema({
    usuario:{
        type: String
    },
    carrito:{
        type: String
    },
    fecha:{
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('Compra', Compra)