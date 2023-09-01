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
const eventValidation = data => {
    const schema = Joi.object({
        codEvento_fk: Joi.number()
            .integer()
            .optional()
            .min(0)
            .allow(null),
        nome: Joi.string()
            .min(6)
            .max(100)
            .required(),
        endereco: Joi.string()
            .min(6)
            .max(100)
            .required(),
        estabelecimento: Joi.string()
            .min(3)
            .max(100)
            .required(),
        inicio: Joi.date().format('YYYY-MM-DD')
            .required(),
        fim: Joi.date().format('YYYY-MM-DD'),
        horario: Joi.date().format('YYYY-MM-DD HH:mm:ss')
            .required(),
        descricao: Joi.string()
            .min(0)
            .max(65535),
        latitude: Joi.string().regex(/^(\+|-)?(?:90(?:(?:\.0{1,8})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,8})?))$/, 'numbers').max(12).min(12)
            .min(8)
            .max(32),
        longitude: Joi.string().regex(/^(\+|-)?(?:180(?:(?:\.0{1,8})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,8})?))$/, 'numbers').max(12).min(12)
            .min(8)
            .max(32),
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.eventValidation = eventValidation;
;