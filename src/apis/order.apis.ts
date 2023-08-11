import { Food } from "../models/food.model";
import { Order } from "../models/order.model";

export interface CreateOrderRequest {
  food_id: string;
  room_id: string;
  quantity: number;
}
export interface CreateOrderResponse {
  order: Order;
  food: Food;
}

export interface GetAllOrdersRequest {}
export interface GetAllOrdersResponse {
  orders: Order[];
  foods: Food[];
}
