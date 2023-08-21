import { Food } from "../models/food.model";
import { FoodCategory } from "../models/food_category.model";
import { User } from "../models/user.model";

// * Food Category
export type CreateCategoryRequest = Pick<FoodCategory, "name">;
export interface CreateCategoryResponse {}

export type GetCategoryByIdRequest = Pick<FoodCategory, "id">;
export type GetCategoryByIdResponse = {
  category: FoodCategory;
};

export interface GetCategoriesByUserIdRequest {}
export type GetCategoriesByUserIdResponse = {
  categories: FoodCategory[];
};

export type UpdateCategoryRequest = Pick<FoodCategory, "id" | "name">;
export interface UpdateCategoryResponse {}

export type DeleteCategoryRequest = Pick<FoodCategory, "id">;
export interface DeleteCategoryResponse {}

// * Food
export interface CreateFoodRequest {
  name: string;
  price: number;
  room_id: string;
  restaurant?: string;
}
export interface CreateFoodResponse {}

export type GetFoodByIdRequest = Pick<Food, "id">;
export type GetFoodByIdResponse = {
  food: Food;
};

export interface GetFoodByUserIdRequest {}
export type GetFoodByUserIdResponse = {
  food: Food[];
  user: User;
};

export interface GetFoodByCategoryIdRequest {
  id: string;
}
export type GetFoodByCategoryIdResponse = {
  food: Food[];
};

export type GetFoodByRoomIdRequest = "room_id";
export type GetFoodByRoomIdResponse = {
  food: Food[];
};

export type UpdateFoodRequest = Pick<
  Food,
  "id" | "name" | "price" | "restaurant"
>;

export interface UpdateFoodResponse {}

export type DeleteFoodRequest = Pick<Food, "id">;
export interface DeleteFoodResponse {}

export interface AddFoodToRoomRequest {
  food_id: string;
  room_id: string;
}
export interface AddFoodToRoomResponse {}
