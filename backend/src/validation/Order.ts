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
    userId: Joi.string().hex().length(24).required(),
    items: Joi.array().items(orderItemSchema).min(1).required(),
    shippingDetails: shippingAddressSchema.required(),
    totalQuantity: Joi.number().required(),
    totalPrice: Joi.number().required(),
  });
  return orderSchema.validate(order);
};
