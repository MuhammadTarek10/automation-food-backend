import { Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";

export default function (app: Express) {
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("join", (data) => {
      console.log(data);
      console.log("user join");
    });

    socket.on("add-food", async (data) => {
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
