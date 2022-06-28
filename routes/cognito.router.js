const express = require('express');
const validatorHandler = require('../middleware/validator.handler');
const { signUpUserSchema, signInUserSchema, confirmUserSchema } = require('../schemas/user.schema');
const router = express.Router();
const poolData = require("../config")

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// const AWS = require('aws-sdk');
// const request = require('request');
// const jwkToPem = require('jwk-to-pem');
// const jwt = require('jsonwebtoken');
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

router.post('/confirm',
    validatorHandler(confirmUserSchema, 'body'),
    (req, res) => {
    const { email, confirm_code } = req.body;
    var userData = {
        Username : email,
        Pool : userPool
    }
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.confirmRegistration(confirm_code, true, function(err, result){
        if (err) {
            console.log(err);
            res.json(err.code);
            return
        }
        res.json("ok")
    });
});

router.post('/signup',
    validatorHandler(signUpUserSchema, 'body'),
    (req, res) => {
        const { nombre, apellido, telefono, email, password } = req.body;
        var attributeList = [];
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value: nombre}));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"middle_name",Value: apellido}));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value: telefono}));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value: email}));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"password",Value: password}));

        userPool.signUp(email, password, attributeList, null, function(err, result){
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

router.post('/signin',
    validatorHandler(signInUserSchema, 'body'), 
    (req, res) => {
    const { email, password } = req.body;
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username : email,
        Password : password,
    });

    var userData = {
        Username : email,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            res.json("ok")
        },
        onFailure: function(err) {
            res.json(err.name)
        },

    });
});

module.exports = router;