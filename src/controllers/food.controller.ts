import {
  CreateFoodRequest,
  CreateFoodResponse,
  DeleteCategoryRequest,
  DeleteCategoryResponse,
  DeleteFoodRequest,
  DeleteFoodResponse,
  GetCategoriesByUserIdRequest,
  GetCategoriesByUserIdResponse,
  GetFoodByCategoryIdRequest,
  GetFoodByCategoryIdResponse,
  GetFoodByRoomIdRequest,
  GetFoodByRoomIdResponse,
  GetFoodByUserIdRequest,
  GetFoodByUserIdResponse,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
  UpdateFoodRequest,
  UpdateFoodResponse,
} from "../apis/food.apis";
import {
  CreateCategoryRequest,
  CreateCategoryResponse,
} from "../apis/food.apis.js";
import {
  ExpressHandler,
  ExpressHandlerWithParams,
} from "../config/types/types.js";
import { Datasource } from "../data/dao/datasource.dao.js";
import PostgresDatasource from "../data/dbs/postgres.js";

class FoodController {
  private db: Datasource;
  constructor(db: Datasource) {
    this.db = db;
  }

  // * Food Category
  createCategory: ExpressHandler<
    CreateCategoryRequest,
    CreateCategoryResponse
  > = async (req, res) => {
    const userId = res.locals.userId;
    const { name } = req.body;
    if (!name) return res.status(401).send({ error: "Invalid Inputs" });
    await this.db.createCategory(name, userId);
    return res.sendStatus(200);
  };

  getCategoryByUserId: ExpressHandler<
    GetCategoriesByUserIdRequest,
    GetCategoriesByUserIdResponse
  > = async (req, res) => {
    const userId = res.locals.userId;
    const categories = await this.db.getCategoryByUserId(userId);
    return res.status(200).send({ categories });
  };

  updateCategory: ExpressHandler<
    UpdateCategoryRequest,
    UpdateCategoryResponse
  > = async (req, res) => {
    const userId = res.locals.userId;
    const { id, name } = req.body;
    if (!id || !name) return res.status(401).send({ error: "Invalid Inputs" });
    const category = await this.db.getCategoryById(id);
    if (!category) return res.status(404).send({ error: "Not Found" });
    if (category.user_id !== userId)
      return res.status(403).send({ error: "Unauthorized" });
    await this.db.updateCategory(id, name);
    return res.sendStatus(200);
  };

  deleteCategory: ExpressHandler<
    DeleteCategoryRequest,
    DeleteCategoryResponse
  > = async (req, res) => {
    const userId = res.locals.userId;
    const { id } = req.body;
    if (!id) return res.status(401).send({ error: "Invalid Inputs" });
    const category = await this.db.getCategoryById(id);
    if (!category) return res.status(404).send({ error: "Not Found" });
    if (category.user_id !== userId)
      return res.status(403).send({ error: "Unauthorized" });
    await this.db.deleteCategory(id);
    return res.sendStatus(200);
  };

  // * Food
  createFood: ExpressHandler<CreateFoodRequest, CreateFoodResponse> = async (
    req,
    res
  ) => {};

  getFoodByUserId: ExpressHandler<
    GetFoodByUserIdRequest,
    GetFoodByUserIdResponse
  > = async (req, res) => {
    const userId = res.locals.userId;
    const food = await this.db.getFoodByUserId(userId);
    return res.status(200).send({ food });
  };

  getFoodByCategoryId: ExpressHandlerWithParams<
    { id: string },
    GetFoodByCategoryIdRequest,
    GetFoodByCategoryIdResponse
  > = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);

    const category = await this.db.getCategoryById(id);
    if (!category) return res.status(404).send({ error: "Not Found" });

    const food = await this.db.getFoodByCategoryId(id);
    return res.status(200).send({ food });
  };

  getFoodByRoomId: ExpressHandlerWithParams<
    { id: string },
    GetFoodByRoomIdRequest,
    GetFoodByRoomIdResponse
  > = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);

    const food = await this.db.getFoodByRoomId(id);
    return res.status(200).send({ food });
  };

  updateFood: ExpressHandler<UpdateFoodRequest, UpdateFoodResponse> = async (
    req,
    res
  ) => {
    const userId = res.locals.userId;
    const { id, name, price, category_id, restaurant } = req.body;
    if (!id || !name || !category_id)
      return res.status(401).send({ error: "Invalid Inputs" });

    const food = await this.db.getFoodById(id);
    if (!food) return res.status(404).send({ error: "Not Found" });

    if (food.user_id !== userId)
      return res.status(403).send({ error: "Unauthorized" });

    await this.db.updateFood(id, name, Number(price), restaurant);
    return res.sendStatus(200);
  };

  deleteFood: ExpressHandler<DeleteFoodRequest, DeleteFoodResponse> = async (
    req,
    res
  ) => {
    const userId = res.locals.userId;
    const { id } = req.body;
    if (!id) return res.status(401).send({ error: "Invalid Inputs" });

    const food = await this.db.getFoodById(id);
    if (!food) return res.status(404).send({ error: "Not Found" });

    if (food.user_id !== userId)
      return res.status(403).send({ error: "Unauthorized" });

    await this.db.deleteFood(id);
    return res.sendStatus(200);
  };
}

export const controller = new FoodController(PostgresDatasource.getInstance());
