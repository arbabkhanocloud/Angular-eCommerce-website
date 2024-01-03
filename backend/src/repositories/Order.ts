import { injectable } from "inversify";
import { Order } from "../models/Order";
import { orderDTO } from "../dto/Order";

@injectable()
export class OrderRepository {
  async getAllOrders() {
    return await Order.find();
  }

  async getOrderById(id: string) {
    return await Order.findById(id);
  }

  async getOrderByUserId(id: string) {
    return await Order.find({ userId: id });
  }

  async saveOrder(orderData: orderDTO) {
    const newOrder = new Order(orderData);
    return await newOrder.save();
  }
}
