import Joi from "joi";

export const validateUser = (user: Object) => {
  const userSchema = Joi.object().keys({
    fullname: Joi.string().min(3).required(),
    username: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    isAdmin: Joi.boolean(),
  });
  Joi.valid;
  return userSchema.validate(user);
};

export const validateUpdateUserById = (user: Object) => {
  const userSchema = Joi.object().keys({
    fullname: Joi.string().min(3),
    username: Joi.string().email(),
    password: Joi.string().min(8),
    isAdmin: Joi.boolean().required(),
  });
  Joi.valid;
  return userSchema.validate(user);
};
