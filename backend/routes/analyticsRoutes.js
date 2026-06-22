import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  getDashboardAnalytics,
  getLinkAnalytics,
} from "../controllers/analyticsController.js";

const router =
  express.Router();

// DASHBOARD

router.get(
  "/dashboard",
  authMiddleware,
  getDashboardAnalytics
);

// SINGLE LINK ANALYTICS

router.get(
  "/link/:id",
  authMiddleware,
  getLinkAnalytics
);

export default router;