const products = require(".././productos")
const { getAll, getOne, createNew, deleteOne } = require("../database/bdd");
const Producto = require("../models/Producto");


async function getOneProduct(req,res){
    const id = req.params.id
    console.log(id)
    try {
        let producto = await Producto.findOne({'codigo' : id})

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto'})
        }

        res.status(200).json(producto)

        console.log(producto)
    
    } catch (error) {
        console.log(error)
    }
}

function createNewProduct(req){
    try {
        let producto ;

        producto = new Producto(req.body)

        producto.save();
        console.log("El producto ha sido guardado correctamente");
    } catch (error) {
        console.log(error)
    }

}

async function getAllProducts(req, res){
    try {
        const productos = await Producto.find()
        res.status(200).json(productos)
    } catch (error) {
        console.log(error)
    }

}

async function deleteProduct(req,res){
    const id = req.params.id
    console.log(id)
    try {
        let producto = await Producto.findOne({'codigo' : id})

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto'})
        }

        await Producto.findOneAndRemove({'codigo' : id})

        res.json({ msg: 'Producto eliminado'})
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createNewProduct,
    deleteProduct
}