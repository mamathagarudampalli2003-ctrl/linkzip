import express from "express";

import {
  login,
  signup,
  googleAuth,
  getUserProfile,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  body,
} from "express-validator";

import validationMiddleware from "../middleware/validationMiddleware.js";

import authLimiter from "../middleware/authRateLimit.js";

const router = express.Router();

// ================= SIGNUP =================

router.post(
  "/signup",

  authLimiter,

  [
    body("username")
      .trim()
      .isLength({
        min: 3,
        max: 30,
      })
      .withMessage(
        "Username must be 3-30 characters"
      ),

    body("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage(
        "Valid email required"
      ),

    body("password")
      .isLength({
        min: 6,
        max: 100,
      })
      .withMessage(
        "Password must be at least 6 characters"
      ),
  ],

  validationMiddleware,

  signup
);

// ================= LOGIN =================

router.post(
  "/login",

  authLimiter,

  [
    body("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage(
        "Valid email required"
      ),

    body("password")
      .notEmpty()
      .withMessage(
        "Password required"
      ),
  ],

  validationMiddleware,

  login
);

// ================= GOOGLE LOGIN =================

router.post(
  "/google",

  authLimiter,

  [
    body("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage(
        "Valid email required"
      ),
  ],

  validationMiddleware,

  googleAuth
);

// ================= PROFILE =================

router.get(
  "/me",
  authMiddleware,
  getUserProfile
);

export default router;