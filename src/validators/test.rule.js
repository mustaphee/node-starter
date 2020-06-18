const Joi = require('@hapi/joi');
const baseValidator = require('./base');

const testRule = Joi.object({
  data: Joi.string(),
  message: Joi.string().required(),
});


module.exports = (req, res, next) => baseValidator(testRule, req, res, next);
