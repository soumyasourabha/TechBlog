const Joi = require('@hapi/joi');

const signupValidation = (data) => {

    const schema  = Joi.object({
        username : Joi.string().alphanum().min(3).max(30).required(),
        email : Joi.string().email({minDomainSegments : 2, tlds : {allow : ['com','net','in']}}).required(),
        password : Joi.string().pattern(/^[a-zA-Z0-9$.@~!-#%^&/]{8,20}$/).required(),
        first_name : Joi.string().min(3).max(30).required(),
        last_name : Joi.string().min(3).max(30).required(),
        age : Joi.number().integer().min(18).required(),
        bio : Joi.string().min(3).max(30).required(),
        gender : Joi.string().min(3).max(30).required()

    })
    
    return schema.validate(data)
};

const loginValidation = (data) => {

    const schema  = Joi.object({
        username : Joi.string().alphanum().min(3).max(30),
        email : Joi.string().email({minDomainSegments : 2, tlds : {allow : ['com','net','in']}}).required(),
        password : Joi.string().pattern(/^[a-zA-Z0-9$.@~!-#%^&/]{8,20}$/).required(),
        first_name : Joi.string().min(3).max(30),
        last_name : Joi.string().min(3).max(30),
        age : Joi.number().integer().min(18),
        bio : Joi.string().min(3).max(30),
        gender : Joi.string().min(3).max(30),
    })

    return schema.validate(data)
};

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;