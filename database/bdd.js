const db = require("mongoose")
const {POOL_DATA, MONGO_URI} = require("../utilities/config")
const products = require("../productos")


const conectarDB = async () => {
    try {
            await db.connect(MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology:true
            })
        } catch (error) {
            console.log(error)
            process.exit(1) //detener app
        }
}
console.log("Conectado a la base de datos")

function getAll(){
    return products
}

function getOne(codigo){
    var producto = products.find(producto => producto.codigo === codigo)
    return producto
}

async function createNew(product){
    product.save();
    console.log(product)
    
}  

async function deleteOne(codigo){

}

module.exports = {getAll, getOne, createNew, deleteOne, conectarDB}
