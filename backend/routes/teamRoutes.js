import express from "express";

import {
  createTeam,
  getTeams,
  addMember,
  inviteMember,
  getInvitations,
  removeMember,
  changeRole,
  getTeamLinks,
  resendInvitation,
  cancelInvitation,
  acceptInvitation,
  getTeamActivities,
} from "../controllers/teamController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import requireTeamRole from "../middleware/teamRole.js";

const router = express.Router();


// =====================================
// CREATE TEAM
// =====================================

router.post(
  "/",
  authMiddleware,
  createTeam
);


// =====================================
// GET USER TEAMS
// =====================================

router.get(
  "/",
  authMiddleware,
  getTeams
);


// =====================================
// ADD MEMBER
// =====================================

router.post(
  "/:teamId/add",
  authMiddleware,
  requireTeamRole(
    "owner",
    "admin"
  ),
  addMember
);


// =====================================
// REMOVE MEMBER
// =====================================

router.delete(
  "/:teamId/member/:userId",
  authMiddleware,
  requireTeamRole(
    "owner"
  ),
  removeMember
);


// =====================================
// CHANGE MEMBER ROLE
// =====================================

router.put(
  "/:teamId/member/:userId",
  authMiddleware,
  requireTeamRole(
    "owner"
  ),
  changeRole
);


// =====================================
// TEAM LINKS
// =====================================

router.get(
  "/:teamId/links",
  authMiddleware,
  requireTeamRole(
    "owner",
    "admin",
    "member"
  ),
  getTeamLinks
);


// =====================================
// INVITE MEMBER
// =====================================

router.post(
  "/:teamId/invite",
  authMiddleware,
  requireTeamRole(
    "owner",
    "admin"
  ),
  inviteMember
);


// =====================================
// GET TEAM INVITATIONS
// =====================================

router.get(
  "/:teamId/invitations",
  authMiddleware,
  requireTeamRole(
    "owner",
    "admin"
  ),
  getInvitations
);


// =====================================
// RESEND INVITATION
// =====================================

router.put(
  "/invite/resend/:inviteId",
  authMiddleware,
  resendInvitation
);


// =====================================
// CANCEL INVITATION
// =====================================

router.delete(
  "/invite/:inviteId",
  authMiddleware,
  cancelInvitation
);


// =====================================
// ACCEPT INVITATION
// =====================================

router.post(
  "/invite/accept/:token",
  authMiddleware,
  acceptInvitation
);


// =====================================
// TEAM ACTIVITIES
// =====================================

router.get(
  "/:teamId/activities",
  authMiddleware,
  requireTeamRole(
    "owner",
    "admin",
    "member"
  ),
  getTeamActivities
);

export default router;