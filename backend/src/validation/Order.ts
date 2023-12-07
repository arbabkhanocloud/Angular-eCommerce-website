import Joi from "joi";
import { orderDTO } from "../dto/Order";

export const validateOrder = (order: orderDTO) => {
  const orderItemSchema = Joi.object().keys({
    productId: Joi.string().hex().length(24).required(),
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    price: Joi.number().required(),
  });

  const shippingAddressSchema = Joi.object().keys({
    fullName: Joi.string().min(3).required(),
    address: Joi.string().min(10).required(),
    city: Joi.string().min(3).required(),
  });

  const orderSchema = Joi.object().keys({
    items: Joi.array().items(orderItemSchema).min(1).required(),
    shippingDetails: shippingAddressSchema.required(),
    totalQuantity: Joi.number().required(),
    totalPrice: Joi.number().required(),
  });
  return orderSchema.validate(order);
};

export const validateUpdateOrder = (order: orderDTO) => {
  const orderItemSchema = Joi.object().keys({
    productId: Joi.string().hex().length(24),
    name: Joi.string(),
    quantity: Joi.number(),
    price: Joi.number(),
  });

  const shippingAddressSchema = Joi.object().keys({
    fullName: Joi.string().min(3),
    address: Joi.string().min(10),
    city: Joi.string().min(3),
  });

  const orderSchema = Joi.object().keys({
    items: Joi.array().items(orderItemSchema).min(1),
    shippingDetails: shippingAddressSchema,
    totalQuantity: Joi.number(),
    totalPrice: Joi.number(),
  });
  return orderSchema.validate(order);
};
