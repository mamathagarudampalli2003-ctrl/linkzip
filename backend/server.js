import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import cron from "node-cron";

import connectDB from "./config/db.js";
import "./config/redis.js";

import authRoutes from "./routes/authRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import webhookRoutes from "./routes/webhookRoutes.js";
import domainRoutes from "./routes/domainRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

import { redirectUrl } from "./controllers/urlController.js";
import { initializeSocket } from "./socket/socketServer.js";
import checkExpiredPlans from "./jobs/planExpiryJob.js";

const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Try again later.",
  },
});

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(compression());
app.use(globalLimiter);

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Healthy",
    uptime: process.uptime(),
  });
});

// ================= ROUTES =================

app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/webhooks", webhookRoutes);
app.use("/api/domains", domainRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/analytics", analyticsRoutes);

// Redirect short URLs
app.get("/:shortId", redirectUrl);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// ================= SERVER =================

const server = http.createServer(app);

cron.schedule("0 * * * *", () => {
  checkExpiredPlans();
});

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();

    initializeSocket(server);

    server.listen(PORT, () => {
      console.log(`Server Running On ${PORT}`);
    });
  } catch (error) {
    console.log("Startup Error ❌", error);
    process.exit(1);
  }
};

startServer();