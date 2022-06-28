const db = require("mongoose")
const {POOL_DATA, MONGO_URI} = "../config"
const products = require("../productos")

// db.Promise = global.Promise;
// db.connect(MONGO_URI, {
//     useNewUrlParser: true
// });

//console.log("Conectado a la base de datos")

function getAll(){
    return products
}

async function getOne(codigo){

}

async function createNew(){
    
}  

async function deleteOne(codigo){

}

module.exports = {getAll, getOne, createNew, deleteOne}
