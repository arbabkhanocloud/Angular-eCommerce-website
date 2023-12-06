import { CustomRequest } from "../types/Types";
import { Response } from "express";
import { validateOrder, validateUpdateOrder } from "../validation/Order";
import { Order } from "../models/Order";
import mongoose from "mongoose";

export const addOrder = async (req: CustomRequest, res: Response) => {
  const { error } = validateOrder(req.body);

  console.log("user:  ", req.user);

  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { items, shippingDetails, totalPrice, totalQuantity } = req.body;

  let order = new Order({
    userId: req.user._id,
    items: items,
    shippingDetails: shippingDetails,
    totalPrice: totalPrice,
    totalQuantity: totalQuantity,
  });

  order = await order.save();

  res.status(200).json(order);
};

export const getAllOrders = async (req: CustomRequest, res: Response) => {
  const orders = await Order.find();
  res.status(200).json(orders);
};

export const getOrdersByUserId = async (req: CustomRequest, res: Response) => {
  const userId = req.user._id;
  const orders = await Order.find({ userId });
  res.status(200).json(orders);
};
