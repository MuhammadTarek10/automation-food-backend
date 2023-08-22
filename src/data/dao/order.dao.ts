import { Order } from "../../models/order.model";

export interface OrderDao {
  createOrder(
    userId: string,
    roomId: string,
    foodId: string,
    quantity: number
  ): Promise<Order>;
  deleteOrdersByRoomId(roomId: string): Promise<void>;
  getOrderById(id: string): Promise<Order>;
  deleteOrder(id: string): Promise<void>;
}
