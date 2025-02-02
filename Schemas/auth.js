const Joi = require("joi");

const registerUserSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const loginUserSchema = Joi.object({
  password: Joi.string().required().min(6),
  email: Joi.string().required(),
});

const emailRegisterSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = { registerUserSchema, loginUserSchema, emailRegisterSchema };
