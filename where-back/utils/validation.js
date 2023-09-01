const Joi = require('@hapi/joi').extend(require('@joi/date'));

//Register Validation
const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .max(60)
            .required(),
        email: Joi.string()
            .min(6)
            .max(60)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .max(32)
            .required(),
        date: Joi.date().format('YYYY-MM-DD')
            .required(),
    });
    return schema.validate(data);
}

//Login Validation
const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .max(60)
            .required()
            .email(),
        password: Joi.string()
            .min(8)
            .max(32)
            .required(),
    });
    return schema.validate(data);
}

//Event validation
// const registerValidation = data => {
//     const schema = Joi.object({
//         name: Joi.string()
//             .min(6)
//             .max(60)
//             .required(),
//         email: Joi.string()
//             .min(6)
//             .max(60)
//             .required()
//             .email(),
//         password: Joi.string()
//             .min(8)
//             .max(32)
//             .required(),
//         date: Joi.date().format('YYYY-MM-DD')
//             .required(),
//     });
//     return schema.validate(data);
// }

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation