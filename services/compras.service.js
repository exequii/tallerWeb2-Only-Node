const Compra = require("../models/Compra");

function nuevaCompra(req,res,next){
    try {
        let compra;
        idProductos = []

        carrito = JSON.parse(req.body.carrito)
        
        carrito.forEach(element => {
            idProductos.push(element._id)
        });
        
        compra = new Compra({
            carrito: JSON.stringify(idProductos),
            usuario: req.body.usuario
        })

        compra.save();
        console.log("La compra ha sido guardado correctamente");
        res.status(200).json("ok");
    } catch (error) {
        console.log(error)
        next(error)
    }

}

module.exports = {nuevaCompra}