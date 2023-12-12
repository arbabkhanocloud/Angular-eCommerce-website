import "express-async-errors";
import { CustomRequest } from "../types/Types";
import { Response } from "express";
import { validateOrder } from "../validation/Order";
import { orderServiceInstance } from "../Server";
import { orderDTO } from "../dto/Order";

export const addOrder = async (req: CustomRequest, res: Response) => {
  const { error } = validateOrder(req.body);

  if (error) {
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const orderData: orderDTO = req.body;
  const placedOrder = await orderServiceInstance.placeOrder(orderData, res);
  res.status(201).json(placedOrder);
};

export const getAllOrders = async (req: CustomRequest, res: Response) => {
  const orders = await orderServiceInstance.getAllOrders();
  res.status(200).json(orders);
};

export const getOrdersByUserId = async (req: CustomRequest, res: Response) => {
  const userId = req.user._id;
  const orders = await orderServiceInstance.findOrderByUserId(userId, res);
  res.status(200).json(orders);
};
