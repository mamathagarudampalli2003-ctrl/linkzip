import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ Socket connected:", socket.id);

    socket.on("join-dashboard", (userId) => {
      socket.join(userId);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });
  });
};

// emit function
export const emitAnalyticsUpdate = (userId, data) => {
  if (io) {
    io.to(userId).emit("analytics-update", data);
  }
};