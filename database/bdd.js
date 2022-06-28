const db = require("mongoose")
const {POOL_DATA, MONGO_URI} = "../utilities/config"
const products = require("../productos")

// db.Promise = global.Promise;
// db.connect(MONGO_URI, {
//     useNewUrlParser: true
// });

//console.log("Conectado a la base de datos")

function getAll(){
    return products
}

function getOne(codigo){
    var producto = products.find(producto => producto.codigo === codigo)
    return producto
}

async function createNew(){
    
}  

async function deleteOne(codigo){

}

module.exports = {getAll, getOne, createNew, deleteOne}
