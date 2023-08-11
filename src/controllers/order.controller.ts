import { CreateOrderRequest, CreateOrderResponse } from "../apis/order.apis";
import { ExpressHandler } from "../config/types/types";
import { Datasource } from "../data/dao/datasource.dao";
import { PostgresDatasource } from "../data/dbs/postgres";

class OrderController {
  private db: Datasource;
  constructor(db: Datasource) {
    this.db = db;
  }

  createOrder: ExpressHandler<CreateOrderRequest, CreateOrderResponse> = async (
    req,
    res
  ) => {
    const userId = res.locals.userId;
    const { room_id, food_id, quantity } = req.body;
    if (!room_id || !food_id || !quantity)
      return res.status(401).send({ error: "Invalid Inputs" });

    const room = await this.db.getRoomById(room_id);
    if (!room) return res.status(404).send({ error: "Not Found" });

    const food = await this.db.getFoodById(food_id);
    if (!food) return res.status(404).send({ error: "Not Found" });

    await this.db.createOrder(userId, room_id, food_id, quantity);
    return res.sendStatus(200);
  };
}

export const controller = new OrderController(PostgresDatasource.getInstance());
