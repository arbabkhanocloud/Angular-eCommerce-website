import Joi from "joi";
import { categoryDto } from "../dto/Category";

export const validateCategory = (category: categoryDto) => {
  const categorySchema = Joi.object().keys({
    type: Joi.string().required(),
    imageUrl: Joi.string().uri().required(),
  });
  return categorySchema.validate(category);
};
