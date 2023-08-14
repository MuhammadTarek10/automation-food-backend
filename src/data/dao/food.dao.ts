import { Food } from "../../models/food.model";
import { FoodCategory } from "../../models/food_category.model";

export interface FoodDao {
  // * Food Category
  createCategory(name: string, user_id: string): Promise<void>;
  getCategoryById(id: string): Promise<FoodCategory>;
  getCategoryByUserId(user_id: string): Promise<FoodCategory[]>;
  updateCategory(id: string, name: string): Promise<void>;
  deleteCategory(id: string): Promise<void>;

  // * Food
  createFood(
    name: string,
    user_id: string,
    category_id: string,
    price: number,
    restaurant?: string | undefined
  ): Promise<string>;
  addFoodToRoom(foodId: string, roomId: string, userId: string): Promise<void>;
  getFoodById(id: string): Promise<Food>;
  getFoodByUserId(user_id: string): Promise<Food[]>;
  getFoodByCategoryId(category_id: string): Promise<Food[]>;
  updateFood(
    id: string,
    name: string,
    price: number,
    restaurant?: string
  ): Promise<void>;
  deleteFood(id: string): Promise<void>;
}
