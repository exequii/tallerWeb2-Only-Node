const products = require(".././productos")
const { getAll, getOne, createNew, deleteOne } = require("../database/bdd");

function getAllProducts(){
    return getAll();
}

function getOneProduct(codigo){
    return getOne(codigo)
}

function createNewProduct(product){
    createNew(product)
}

function deleteProduct(codigo){
    deleteOne(codigo)
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createNewProduct,
    deleteProduct
}