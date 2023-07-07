const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.email");
};

validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),

    email: Joi.string().required().email(validateEmail).messages({
      "string.empty": `The "email" field must be filled in`,
      "string.email": `The "email" field must have a valid email address`,
    }),

    password: Joi.string().required().message({
      "string.empty": `The "password" field must be filled in`,
    }),
  }),
});

validateUserAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(validateEmail).messages({
      "string.empty": `The "email" field must be filled in`,
      "string.email": `The "email" field must have a valid email address`,
    }),

    password: Joi.string().required().message({
      "string.empty": `The "password" field must be filled in`,
    }),
  }),
});

validateItemIDs = celebrate({
  params: Joi.object().keys({
    itemId: Joi.alphanum().length(24),
    _id: Joi.alphanum().length(24),
  }),
});
