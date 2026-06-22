import Invite from "../models/Invite.js";
import Team from "../models/Team.js";
import User from "../models/User.js";
import crypto from "crypto";

// ================= SEND INVITE =================
export const sendInvite = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { email, role } = req.body;

    const userId = req.user?.userId || req.user?.id;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // 🔐 Only owner/admin
    const isAllowed =
      team.owner.toString() === userId ||
      team.members.some(
        (m) =>
          m.user.toString() === userId &&
          m.role === "admin"
      );

    if (!isAllowed) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // 🔥 Generate token
    const token = crypto.randomBytes(20).toString("hex");

    const invite = new Invite({
      email,
      team: teamId,
      role,
      token,
    });

    await invite.save();

    const inviteLink = `http://localhost:5173/invite/${token}`;

    res.json({
      message: "Invite created",
      inviteLink,
    });

  } catch (err) {
    console.log("Invite Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= ACCEPT INVITE =================
export const acceptInvite = async (req, res) => {
  try {
    const { token } = req.params;
    const userId = req.user?.userId || req.user?.id;

    const invite = await Invite.findOne({ token });

    if (!invite) {
      return res.status(404).json({ message: "Invalid invite" });
    }

    if (invite.status !== "pending") {
      return res.status(400).json({ message: "Invite already used" });
    }

    if (new Date() > invite.expiresAt) {
      invite.status = "expired";
      await invite.save();
      return res.status(400).json({ message: "Invite expired" });
    }

    const team = await Team.findById(invite.team);

    // ❌ prevent duplicate
    const alreadyMember = team.members.find(
      (m) => m.user.toString() === userId
    );

    if (alreadyMember) {
      return res.status(400).json({
        message: "Already in team",
      });
    }

    // ✅ add to team
    team.members.push({
      user: userId,
      role: invite.role,
    });

    await team.save();

    invite.status = "accepted";
    await invite.save();

    res.json({
      message: "Joined team successfully 🚀",
      team,
    });

  } catch (err) {
    console.log("Accept Invite Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};