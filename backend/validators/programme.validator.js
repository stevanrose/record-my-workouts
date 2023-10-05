const Joi = require("joi");

const programmeSchema = Joi.object().options({ abortEarly: false }).keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  trainer: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});

module.exports = {
  programmeSchema,
};
