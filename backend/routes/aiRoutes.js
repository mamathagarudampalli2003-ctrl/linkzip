import express from "express";

import {
  getAiInsights,
} from "../controllers/aiController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router =
  express.Router();

// ================= AI ROUTES =================

router.get(
  "/insights",
  authMiddleware,
  getAiInsights
);

export default router;