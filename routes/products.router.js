const express = require('express');
const router = express.Router();
const validatorHandler = require('../middleware/validator.handler');
const {createProductSchema, getProductSchema} = require('../schemas/product.schema');
const {getAllProducts, getOneProduct, createNewProduct, deleteProduct} = require('../services/products.service');

router.get("/",getAllProducts)
router.get("/:codigo",validatorHandler(getProductSchema,'params'),getOneProduct)
router.delete("/:codigo",validatorHandler(getProductSchema,'body'),deleteProduct)
router.post("/newProduct",validatorHandler(createProductSchema,'body'),createNewProduct);

<<<<<<< HEAD
router.get("/:id", (req,res,next)=>{
    try{
        const {id} = req.params
        const producto = getOneProduct(id)
        res.status(200).json(producto)
    }catch(error){
        next(error)
    }
})

router.post("/newProduct",
    validatorHandler(createProductSchema,'body'),
    (req,res,next)=>{
    try{
        console.log("crea un elemento de la bdd")
    }catch(error){
        next(error)
    }
})

router.delete("/deleteProduct/:id",
    validatorHandler(getProductSchema,'body'),
    (req,res,next)=>{
    try{
        console.log("borra un elemento de la bdd")
    }catch(error){
        next(error)
    }
})
=======
>>>>>>> 556e00bb9aaf0d232c13e5c77c9d906447afcffa

module.exports = router;

