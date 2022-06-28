const Joi = require('joi');

const name = Joi.string().min(3).max(15);
const middle_name = Joi.string().min(3).max(15);
const phone_number = Joi.string().min(3).max(15);
const email = Joi.string().min(3).max(40).email();
const password = Joi.string().min(3).max(15);
const confirm_code = Joi.string().min(6).max(6);


const signUpUserSchema = Joi.object({
    name: name.required(),
    middle_name: middle_name.required(),
    phone_number: phone_number.required(),
    email: email.required(),
    password: password.required()
});

const signInUserSchema = Joi.object({
    email: email.required(),
    password: password.required()
})

const confirmUserSchema = Joi.object({
    email: email.required(),
    confirm_code: confirm_code.required()
})


module.exports = {signUpUserSchema,signInUserSchema, confirmUserSchema};