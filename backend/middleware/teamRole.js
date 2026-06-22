import Team from "../models/Team.js";

const requireTeamRole = (...allowedRoles) => {

  return async (req, res, next) => {

    try {

      const teamId = req.params.teamId;

      // ================= AUTH CHECK =================

      if (
        !req.user ||
        !req.user.userId
      ) {

        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });

      }

      // ================= TEAM ID CHECK =================

      if (!teamId) {

        return res.status(400).json({
          success: false,
          message: "Team ID missing",
        });

      }

      // ================= FIND TEAM =================

      const team =
        await Team.findById(teamId)
          .lean();

      if (!team) {

        return res.status(404).json({
          success: false,
          message: "Team not found",
        });

      }

      // ================= FIND MEMBER =================

      const member =
        team.members.find(
          (m) =>
            m.user.toString() ===
            req.user.userId
        );

      if (!member) {

        return res.status(403).json({
          success: false,
          message: "Not a team member",
        });

      }

      // ================= ROLE CHECK =================

      if (
        !allowedRoles.includes(
          member.role
        )
      ) {

        return res.status(403).json({
          success: false,
          message:
            "Insufficient permissions",
        });

      }

      // ================= PASS ROLE INFO =================

      req.teamRole =
        member.role;

      next();

    } catch (error) {

      console.error(
        "TEAM ROLE ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Role validation failed",
      });

    }

  };

};

export default requireTeamRole;