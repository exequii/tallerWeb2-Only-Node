const express = require('express');
var cors = require('cors')
const app = express();
const routerApi = require('./routes');

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('Conexion funcionando');
});

routerApi(app)

app.listen(3000, () => {
    console.log('Backend Levantado.')
});