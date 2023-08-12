import { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { PostgresDatasource } from "../data/dbs/postgres";
import { AddOrder } from "../models/add_order.model";

export default function (app: Express) {
  const db = PostgresDatasource.getInstance();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User Connected");

    socket.on("addOrder", (data: AddOrder) => {
      const { userId, foodId, roomId } = data;
      let { quantity } = data;
      if (!quantity) quantity = 1;
      console.log(userId, foodId, roomId, quantity);
      db.createOrder(userId, foodId, roomId, quantity);
      console.log(`Add Order ${data}`);
    });

    socket.on("getOrders", async (data) => {
      console.log(data);
      console.log("user add food");
    });

    socket.on("update food", async (data) => {
      console.log(data);
      console.log("user update food");
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return server;
}
