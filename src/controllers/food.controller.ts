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
import { ExpressHandler } from "../config/types/types.js";
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
  > = async (req, res) => {};

  getFoodByCategoryId: ExpressHandler<
    GetFoodByCategoryIdRequest,
    GetFoodByCategoryIdResponse
  > = async (req, res) => {};

  getFoodByRoomId: ExpressHandler<
    GetFoodByRoomIdRequest,
    GetFoodByRoomIdResponse
  > = async (req, res) => {};

  updateFood: ExpressHandler<UpdateFoodRequest, UpdateFoodResponse> = async (
    req,
    res
  ) => {};

  deleteFood: ExpressHandler<DeleteFoodRequest, DeleteFoodResponse> = async (
    rqe,
    res
  ) => {};
}

export const controller = new FoodController(PostgresDatasource.getInstance());
