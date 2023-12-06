import Joi from "joi";
import { productDTO } from "../dto/Product";

export const validateProduct = (product: productDTO) => {
  const productSchema = Joi.object().keys({
    categoryId: Joi.string().hex().length(24).required(),
    name: Joi.string().min(3).required(),
    imageUrl: Joi.string().uri().required(),
    price: Joi.number().required(),
    description: Joi.string(),
  });
  return productSchema.validate(product);
};

export const validateUpdateProduct = (product: productDTO) => {
  const productSchema = Joi.object().keys({
    categoryId: Joi.string().hex().length(24),
    name: Joi.string().min(3),
    imageUrl: Joi.string().uri(),
    price: Joi.number(),
    description: Joi.string(),
  });
  return productSchema.validate(product);
};
