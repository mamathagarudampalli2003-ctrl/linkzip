import { io } from "../server.js";

// ================= REAL-TIME ANALYTICS EMITTER =================

export const emitAnalyticsUpdate = (userId, data) => {
  io.to(userId).emit("analytics-update", {
    success: true,
    data,
  });
};