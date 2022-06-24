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
    UserPoolId : "us-east-2_T9l6jcW60", // Your user pool id here    
    ClientId : "545v6pj3vfe4116dva0jv97h86" // Your client id here
    }; 
const pool_region = 'us-east-2';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

app.use(express.json());
app.use(cors())

app.get('/products', (req, res) => {
    console.log('Invocacion nueva');
    res.json(productos)
});

app.post('/confirm', (req, res) => {
    var userData = {
        Username : req.body.email,
        Pool : userPool
    }
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(req.body.code, true, function(err, result){
        if (err) {
            console.log(err);
            res.json(err.code);
            return
        }
        res.json("ok")
    });
});

app.post('/signup', (req, res) => {
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value: req.body.nombre}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"middle_name",Value: req.body.apellido}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value: req.body.telefono}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value: req.body.email}));
    //attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"password",Value: req.body.password}));

    userPool.signUp(req.body.email, req.body.password, attributeList, null, function(err, result){
        if (err) {
            console.log(err);
            res.json(err.name);
            return;
        }
        cognitoUser = result.user;
        console.log('Nombre de usuario es: ' + cognitoUser.getUsername());
        res.json("ok")
    });
});

app.post('/signin', (req, res) => {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : req.body.email,
        Password : req.body.password,
    });

    var userData = {
        Username : req.body.email,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            //console.log('access token + ' + result.getAccessToken().getJwtToken());
            //console.log('id token + ' + result.getIdToken().getJwtToken());
            //console.log('refresh token + ' + result.getRefreshToken().getToken());
            res.json([
                {
                    login: "Login Correcto"
                }
            ])
        },
        onFailure: function(err) {
            res.json(err.name)
        },

    });
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