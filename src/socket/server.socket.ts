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

    socket.on("joinRoom", (roomId: string) => {
      socket.join(roomId);
    });

    socket.on("leaveRoom", (roomId: string) => {
      socket.leave(roomId);
    });

    socket.on("addOrder", async (data: AddOrder) => {
      const { userId, foodId, roomId } = data;
      let { quantity } = data;
      if (!quantity) quantity = 1;

      const room = await db.getRoomById(roomId);
      if (!room) return;

      const food = await db.getFoodById(foodId);
      if (!food) return;

      await db.createOrder(userId, roomId, foodId, quantity);
      const orders = await db.getOrdersByRoomId(roomId);
      io.to(roomId).emit("doneOrders", orders);
    });

    socket.on("getOrders", async (roomId: string) => {
      const orders = await db.getOrdersByRoomId(roomId);
      socket.emit("doneOrders", orders);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return server;
}
