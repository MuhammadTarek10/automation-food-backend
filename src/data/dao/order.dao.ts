import { Food } from "../../models/food.model";

export interface OrderDao {
  createOrder(
    userId: string,
    roomId: string,
    foodId: string,
    quantity: number
  ): Promise<Food>;
}
