const express = require('express');
const router = express.Router();
//const createProductSchema = require('../schemas/product.schema');
const productos = require(".././productos")

router.get("/", (req,res)=>{
    res.json(productos)
    if(err){
        console.log("error")
    }
})

module.exports = router;

