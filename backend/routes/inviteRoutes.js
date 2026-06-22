import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  sendInvite,
  acceptInvite,
} from "../controllers/inviteController.js";

const router = express.Router();

// send invite
router.post("/:teamId/invite", authMiddleware, sendInvite);

// accept invite
router.get("/accept/:token", authMiddleware, acceptInvite);

export default router;