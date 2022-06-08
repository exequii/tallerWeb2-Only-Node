const express = require('express');
var cors = require('cors')
const app = express();
const productos = require("./productos")

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
//global.fetch = require('node-fetch');

const poolData = {    
    UserPoolId : "us-east-2_c3MNGk6x0", // Your user pool id here    
    ClientId : "tcf1d6qkb6kqrpqo6nmqeajtf" // Your client id here
    }; 
const pool_region = 'us-east-2';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

app.use(express.json());
app.use(cors())

app.get('/products', (req, res) => {
    console.log('Invocacion nueva');
    res.json(productos)
});

app.post('/signup', (req, res) => {
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"nombre",Value: req.body.nombre}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"apellido",Value: req.body.apellido}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"telefono",Value: req.body.telefono}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value: req.body.email}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"password",Value: req.body.password}));

    userPool.signUp(req.body.email, req.body.password, attributeList, null, function(err, result){
        if (err) {
            console.log(err);
            res.json(err);
            return;
        }
        cognitoUser = result.user;
        console.log('Nombre de usuario es: ' + cognitoUser.getUsername());
        res.json({
            bienvenido: `${cognitoUser.getUsername()}`
        })
    });
});

app.post('/signin', (req, res) => {
    console.log("JSON:" + JSON.stringify(req.body));
    res.json([
        {
            usuario: "Login Correcto"
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