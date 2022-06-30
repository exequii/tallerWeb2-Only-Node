const express = require('express');
var cors = require('cors')
const app = express();
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middleware/error.handler');
const { conectarDB } = require('./database/bdd');

app.use(cors())

conectarDB();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Conexion funcionando');
});

routerApi(app)


app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Backend Levantado.')
});