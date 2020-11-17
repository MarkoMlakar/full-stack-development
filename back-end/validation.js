const Joi = require("@hapi/joi");

/* Register validation */
const registerValidation = (data) => {
  const validationSchema = Joi.object({
    username: Joi.string().alphanum().min(1).max(30).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
    name: Joi.string(),
    surname: Joi.string(),
    description: Joi.string(),
    age: Joi.number(),
    gender: Joi.number(),
    profession: Joi.string(),
  });

  return validationSchema.validate(data);
};

/* Login validation */
const loginValidation = (data) => {
  const validationSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
  });

  return validationSchema.validate(data);
};

/* Product validation */
const productValidation = (data) => {
  const validationSchema = Joi.object({
    title: Joi.string().min(2).max(30).required(),
    description: Joi.string(),
    price: Joi.number(),
  });

  return validationSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.productValidation = productValidation;
