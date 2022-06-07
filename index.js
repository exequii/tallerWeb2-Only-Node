const express = require('express');
var cors = require('cors')
const app = express();
const productos = require("./productos")

app.use(express.json());
app.use(cors())

app.get('/products', (req, res) => {
    console.log('Invocacion nueva');
    res.json(productos)
});

app.post('/', (req, res) => {
    console.log("JSON:" + JSON.stringify(req.body));
    res.json([
        {
            mensaje: "Hola"
        },
        {
            mensaje: "Como estas?"
        }
    ])
});

app.put('/', (req, res) => {
    res.send(`Hello World! ${req.method}`)
});

app.delete('/', (req, res) => {
    res.send(`Hello World! ${req.method}`)
});

app.listen(3000, () => {
    console.log('Backend Levantado.')
});