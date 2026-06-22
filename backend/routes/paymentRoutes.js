import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createOrder,
  verifyPayment,
  getBillingHistory,
  getBillingDetails,
} from "../controllers/paymentController.js";

import paymentLimiter from "../middleware/paymentRateLimit.js";

const router = express.Router();

// CREATE ORDER
router.post(
  "/create-order",
  authMiddleware,
  paymentLimiter,
  createOrder
);

// VERIFY PAYMENT
router.post(
  "/verify-payment",
  authMiddleware,
  paymentLimiter,
  verifyPayment
);

// BILLING HISTORY
router.get(
  "/history",
  authMiddleware,
  getBillingHistory
);

// BILLING DETAILS
router.get(
  "/details",
  authMiddleware,
  getBillingDetails
);

export default router;