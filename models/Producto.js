const mongoose = require("mongoose")

const Producto = mongoose.Schema({
    codigo:{
        type: String
    },
    name:{
        type: String
    },
    price:{
        type: Number
    },
    details:{
        type: String
    },
    img:{
        type: String
    },
    ofert:{
        type: Boolean
    },
    desc:{
        type: Number
    },
    cantidad:{
        type: Number
    }
})

module.exports = mongoose.model('Producto', Producto)