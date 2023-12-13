import { inject, injectable } from "inversify";
import { OrderRepository } from "../repositories/Order";
import { orderDTO } from "../dto/Order";
import { ErrorService } from "../errors/ErrorService";

@injectable()
export class OrderService {
  constructor(
    @inject(OrderRepository) private orderRepository: OrderRepository
  ) {}

  async getAllOrders() {
    return await this.orderRepository.getAllOrders();
  }

  async getOrderById(orderId: string) {
    const order = await this.orderRepository.getOrderById(orderId);

    if (!order) {
      throw new ErrorService(404, "Order not found.");
    }
    return order;
  }

  async placeOrder(orderData: orderDTO) {
    const newOrder = await this.orderRepository.saveOrder(orderData);
    return newOrder;
  }

  async findOrderByUserId(userId: string) {
    const order = await this.orderRepository.getOrderByUserId(userId);
    return order;
  }
}
