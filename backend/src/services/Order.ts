import { inject, injectable } from "inversify";
import { Response } from "express";
import { OrderRepository } from "../repositories/Order";
import { orderDTO } from "../dto/Order";

@injectable()
export class OrderService {
  constructor(
    @inject(OrderRepository) private orderRepository: OrderRepository
  ) {}

  async getAllOrders() {
    const orders = await this.orderRepository.getAllOrders();
    return orders;
  }

  async getOrderById(orderId: string, res: Response) {
    const order = await this.orderRepository.getOrderById(orderId);

    if (!order) {
      res.status(404);
      throw new Error("Order not found.");
    }

    res.status(200).json(order);
  }

  async placeOrder(orderData: orderDTO, res: Response) {
    const newOrder = await this.orderRepository.saveOrder(orderData);
    return newOrder;
  }

  async findOrderByUserId(userId: string, res: Response) {
    const order = await this.orderRepository.getOrderByUserId(userId);
    return order;
  }
}
