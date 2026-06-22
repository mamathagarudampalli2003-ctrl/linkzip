import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  addDomain,
  getDomains,
  verifyDomain,
  deleteDomain,
} from "../controllers/domainController.js";

const router = express.Router();

// ================= ADD DOMAIN =================
router.post(
  "/add",
  authMiddleware,
  addDomain
);

// ================= GET DOMAINS =================
router.get(
  "/all",
  authMiddleware,
  getDomains
);

// ================= VERIFY DOMAIN =================
router.post(
  "/verify",
  authMiddleware,
  verifyDomain
);

// ================= DELETE DOMAIN =================
router.delete(
  "/delete",
  authMiddleware,
  deleteDomain
);

export default router;