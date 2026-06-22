import express from "express";
import { body, param } from "express-validator";

import authMiddleware from "../middleware/authMiddleware.js";

import validationMiddleware
from "../middleware/validationMiddleware.js";

import {
  createUrl,
  getUrls,
  deleteUrl,
  toggleStatus,
  redirectUrl,
  getPublicAnalytics,
  verifyDomain,
  qrRedirect,
} from "../controllers/urlController.js";

const router = express.Router();

// ================= PUBLIC =================

router.get(
  "/public/:shortId",

  param("shortId")
    .notEmpty()
    .isLength({ min: 3 }),

  validationMiddleware,

  getPublicAnalytics
);

router.get(
  "/qr/:shortId",

  param("shortId")
    .notEmpty()
    .isLength({ min: 3 }),

  validationMiddleware,

  qrRedirect
);

router.get(
  "/r/:shortId",

  param("shortId")
    .notEmpty()
    .isLength({ min: 3 }),

  validationMiddleware,

  redirectUrl
);

// ================= PROTECTED =================

router.post(
  "/",

  authMiddleware,

  body("originalUrl")
    .isURL(),

  validationMiddleware,

  createUrl
);

router.get(
  "/",
  authMiddleware,
  getUrls
);

router.put(
  "/status/:id",
  authMiddleware,
  toggleStatus
);

router.put(
  "/verify-domain/:id",
  authMiddleware,
  verifyDomain
);

router.delete(
  "/:id",
  authMiddleware,
  deleteUrl
);

export default router;