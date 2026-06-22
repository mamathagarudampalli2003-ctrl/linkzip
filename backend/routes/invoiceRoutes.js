import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  downloadInvoice,
} from "../controllers/invoiceController.js";

const router =
  express.Router();

router.get(
  "/download",
  authMiddleware,
  downloadInvoice
);

export default router;