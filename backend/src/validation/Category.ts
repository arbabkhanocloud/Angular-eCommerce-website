import Joi from "joi";
import { categoryDto } from "../dto/Category";

export const validateCategory = (category: categoryDto) => {
  const categorySchema = Joi.object().keys({
    type: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
  });
  Joi.valid;
  return categorySchema.validate(category);
};
