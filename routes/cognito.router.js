const express = require('express');
const validatorHandler = require('../middleware/validator.handler');
const { signUpUserSchema, signInUserSchema, confirmUserSchema } = require('../schemas/user.schema');
const router = express.Router();
const {POOL_DATA, MONGO_URI} = require("../utilities/config")

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
// const AWS = require('aws-sdk');
// const request = require('request');
// const jwkToPem = require('jwk-to-pem');
// const jwt = require('jsonwebtoken');
const userPool = new AmazonCognitoIdentity.CognitoUserPool(POOL_DATA);

router.post('/confirm',
    validatorHandler(confirmUserSchema, 'body'),
    (req, res, next) => {
    try{
        const { email, confirm_code } = req.body;
        var userData = {
            Username : email,
            Pool : userPool
        }
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    
        cognitoUser.confirmRegistration(confirm_code, true, function(err, result){
            if (err) {
                res.json(err.code);
                return
            }
            res.status(200).json("ok")
        });
    }catch(error){
        next(error)
    }
});

router.post('/signup',
    validatorHandler(signUpUserSchema, 'body'),
    (req, res, next) => {
        try{
            const { nombre, apellido, telefono, email, password } = req.body;
            var attributeList = [];
            attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value: nombre}));
            attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"middle_name",Value: apellido}));
            attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"phone_number",Value: telefono}));
            attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value: email}));
            attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"password",Value: password}));
    
            userPool.signUp(email, password, attributeList, null, function(err, result){
                if (err) {
                    res.json(err.name);
                    return;
                }
                cognitoUser = result.user;
                res.status(201).json("ok")
        });
        }catch(error){
            next(error)
        }
});

router.post('/signin',
    validatorHandler(signInUserSchema, 'body'), 
    (req, res, next) => {
    try{
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
                res.status(200).json("ok")
            },
            onFailure: function(err) {
                res.json(err.name)
            },
        });
    }catch(error){
        next(error)
    }
});

module.exports = router;