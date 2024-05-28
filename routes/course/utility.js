const Joi = require("joi");

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      "string.base": "Name should be of type string.",
      "string.min": "Name should be atleast 3 character long.",
      "any.required": "Name is required field.",
      "string.empty": "Name cannot be empty.",
    }),
  });
  return schema.validate(course);
};

module.exports.validateCourse = validateCourse;
