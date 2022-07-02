const products = require(".././productos")
const Producto = require("../models/Producto");


async function getOneProduct(req,res,next){
    const {codigo} = req.params
    console.log(codigo)
    try {
        let producto = await Producto.findOne({'codigo' : codigo})

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto'})
        }

        res.status(200).json(producto)

        console.log(producto)
    
    } catch (error) {
        console.log(error)
        next(error)
    }
}

function createNewProduct(req,res,next){
    try {
        let producto ;

        producto = new Producto(req.body)

        producto.save();
        console.log("El producto ha sido guardado correctamente");
        res.status(200).json("ok");
    } catch (error) {
        console.log(error)
        next(error)
    }

}

async function getAllProducts(req, res,next){
    try {
        const productos = await Producto.find()
        res.status(200).json(productos)
    } catch (error) {
        console.log(error)
        next(error)
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
        next(error)
    }
}

module.exports = {
    getAllProducts,
    getOneProduct,
    createNewProduct,
    deleteProduct
}