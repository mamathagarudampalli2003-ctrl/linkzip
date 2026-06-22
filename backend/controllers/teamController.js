import Team from "../models/Team.js";
import User from "../models/User.js";
import crypto from "crypto";
import TeamInvite from "../models/TeamInvitation.js";
import { sendInvitationEmail } from "../services/emailService.js";
import { getIO } from "../socket/socketServer.js";
import { PLAN_LIMITS } from "../config/planLimits.js";

// ================= CREATE TEAM =================

export const createTeam = async (
  req,
  res
) => {
  try {

    const { name } = req.body;

if (
 !name ||
 name.trim().length < 3
) {

 return res.status(400).json({
  success: false,
  message:
   "Team name must be at least 3 characters",
 });

}

    const userId =
      req.user.userId;

    const user =
  await User.findById(userId);

const userTeams =
  await Team.countDocuments({
    owner: userId,
  });

const limit =
  PLAN_LIMITS[user.plan]?.teams || 1;

if (userTeams >= limit) {

  return res.status(403).json({
    success: false,
    message:
      "Team limit reached. Upgrade required.",
  });

}

    const team = new Team({
      name,

      owner: userId,

      members: [
        {
          user: userId,
          role: "owner",
        },
      ],
    });

  activities: [
    {
      action: `Created team ${name}`,
      user: req.user?.username || "System",
    },
  ],


await team.save();

const io = getIO();

io.to(team._id.toString()).emit(
 "team-notification",
 {
  message:
   `Team ${team.name} created`
 }
);

res.status(201).json({
  message: "Team created successfully",
  team,
});

  } catch (error) {

    console.log(
      "Create Team Error:",
      error
    );

    res.status(500).json({
      message:
        "Server error",
    });
  }
};

// ================= GET USER TEAMS =================
export const getTeams = async (req, res) => {

  try {

    console.log("REQ.USER =>", req.user);

    const userId =
      req.user.userId;

    if (!userId) {

      return res.status(401).json({
        message: "Unauthorized",
      });

    }

    // SIMPLE QUERY FIRST
    const teams = await Team.find({
  "members.user": userId,
})
.populate(
  "members.user",
  "username email"
)
.populate(
  "owner",
  "username email"
);
  
    console.log("TEAMS =>", teams);

    return res.status(200).json({
 success: true,
 teams,
});

  } catch (error) {

    console.log(
      "GET TEAMS ERROR =>",
      error
    );

    res.status(500).json({
      message: "Server error",
    });

  }
};

// ================= ADD MEMBER =================

export const addMember = async (req, res) => {
  try {

    console.log("ADD MEMBER CONTROLLER");
    console.log("URL:", req.originalUrl);
    console.log("PARAMS:", req.params);
    console.log("BODY:", req.body);

    const { teamId } = req.params;

    const { email, role } = req.body;

    const currentUserId = req.user.userId;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    const currentMember = team.members.find(
      (m) =>
        m.user.toString() === currentUserId
    );

    const isOwner =
      team.owner.toString() === currentUserId;

    const isAdmin =
      currentMember?.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const alreadyExists = team.members.find(
      (m) =>
        m.user.toString() ===
        user._id.toString()
    );

    if (alreadyExists) {
      return res.status(400).json({
        message: "User already member",
      });
    }

    if (team.members.length >= 100) {

  return res.status(400).json({
    success: false,
    message: "Maximum team members reached",
  });

}

    team.members.push({
      user: user._id,
      role: role || "member",
    });

    team.activityLogs.push({
  action: `Added member ${user.email}`,
  performedBy: req.user?.username || "System",
});

    team.activities.push({
  action: `Added ${user.email}`,
  user: req.user?.username || "System",
});

    await team.save();

    const io = getIO();

io.to(teamId).emit(
  "team-notification",
  {
    message:
      `${user.email} added to team`,
  }
);

    return res.status(200).json({
      message: "Member added",
      team,
    });

  } catch (error) {

    console.log(
      "Add Member Error:",
      error
    );

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });

  }
};

// ================= REMOVE MEMBER =================

export const removeMember =
  async (req, res) => {
    try {

      const {
        teamId,
        userId,
      } = req.params;

      const currentUserId =
        req.user.userId;

      const team =
        await Team.findById(
          teamId
        );

      if (!team) {
        return res
          .status(404)
          .json({
            message:
              "Team not found",
          });
      }

      if (
        team.owner.toString() !==
        currentUserId
      ) {
        return res
          .status(403)
          .json({
            message:
              "Only owner can remove",
          });
      }

      team.activities.push({
  action: `Removed member`,
  user: req.user?.username || "System",
});

if (
 team.owner.toString() === userId
) {

 return res.status(400).json({
  message:
   "Owner cannot be removed",
 });

}

      team.members =
        team.members.filter(
          (m) =>
            m.user.toString() !==
            userId
        );

        team.activityLogs.push({
  action: "Removed member",
  performedBy: req.user?.username || "System",
});

      await team.save();

      const io = getIO();

io.to(teamId).emit(
  "team-notification",
  {
    message:
      "Member removed",
  }
);

      res.json({
        message:
          "Member removed",
      });

    } catch (error) {

      console.log(
        "Remove Member Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error",
      });
    }
  };

// ================= CHANGE ROLE =================

export const changeRole =
  async (req, res) => {
    try {

      const {
        teamId,
        userId,
      } = req.params;

      const { role } =
        req.body;

      const currentUserId =
        req.user.userId;

      const team =
        await Team.findById(
          teamId
        );

      if (!team) {
        return res
          .status(404)
          .json({
            message:
              "Team not found",
          });
      }

      if (
        team.owner.toString() !==
        currentUserId
      ) {
        return res
          .status(403)
          .json({
            message:
              "Only owner can change role",
          });
      }

      const member =
        team.members.find(
          (m) =>
            m.user.toString() ===
            userId
        );

      if (!member) {
        return res
          .status(404)
          .json({
            message:
              "Member not found",
          });
      }

      const allowedRoles =
[
  "admin",
  "member"
];

if (
 !allowedRoles.includes(role)
) {

 return res.status(400).json({
  message:
   "Invalid role",
 });

}

      member.role = role;

team.activityLogs.push({
  action: `Changed role to ${role}`,
  performedBy:
    req.user?.username || "System",
});

team.activities.push({
  action: `Changed role to ${role}`,
  user:
    req.user?.username || "System",
});

await team.save();

const io = getIO();

io.to(teamId).emit(
  "team-notification",
  {
    message:
      `Role changed to ${role}`,
  }
);

io.to(team._id.toString()).emit(
  "team-activity",
  {
    type: "role_changed",

    title:
      `Role changed to ${role}`,

    description:
      "",

    time:
      new Date(),
  }
);
      res.json({
        message:
          "Role updated",
      });

    } catch (error) {

      console.log(
        "Change Role Error:",
        error
      );

      res.status(500).json({
        message:
          "Server error",
      });
    }
  };

import Url from "../models/Url.js";

export const getTeamLinks = async (
  req,
  res
) => {

  try {

    const { teamId } =
      req.params;

    const team =
 await Team.findById(teamId);

if (!team) {

 return res.status(404).json({
  message:
   "Team not found",
 });

}

const member =
 team.members.find(
  m =>
   m.user.toString() ===
   req.user.userId
 );

if (!member) {

 return res.status(403).json({
  message:
   "Access denied",
 });

}

    const links =
      await Url.find({
        team: teamId,
      }).sort({
        createdAt: -1,
      });

    return res.status(200).json({
 success: true,
 links,
});

  } catch (error) {

    console.log(
      "GET TEAM LINKS ERROR:",
      error
    );

    res.status(500).json({
      message:
        "Server error",
    });

  }

};

export const inviteMember =
async (
 req,
 res
) => {

 try {

  const {
   email,
   role
  } = req.body;

  const allowedRoles =
[
 "admin",
 "member"
];

if (
 role &&
 !allowedRoles.includes(role)
) {

 return res.status(400).json({
  message:
   "Invalid role",
 });

}

  const {
   teamId
  } = req.params;

  const token =
   crypto.randomBytes(32)
    .toString("hex");
  
  const existingInvite =
 await TeamInvite.findOne({

  team: teamId,

  email,

  status: "pending",

 });

if (
 existingInvite
) {

 return res.status(400).json({
  message:
   "Invitation already pending",
 });

}

  const invite =
   await TeamInvite.create({
    team: teamId,
    email,
    role,
    invitedBy: req.user.userId,
    token,
   });

   const team =
await Team.findById(teamId);

const inviteLink =
`http://localhost:5173/invite/${invite.token}`;

await sendInvitationEmail(
  email,
  team.name,
  invite.token
);

team.activities.push({
  action:
    `Invitation sent to ${email}`,
  user:
    req.user?.username || "System",
});

await team.save();

const io = getIO();

io.to(teamId).emit(
  "team-notification",
  {
    message:
      `Invitation sent to ${email}`,
  }
);

  return res.status(201).json({
   success: true,
   invite,
  });

 } catch (err) {

  console.log(err);

  res.status(500).json({
   message:
    "Invite failed"
  });

 }

};

export const getInvitations =
async (req,res)=>{

try{

 const invites =
 await TeamInvite.find({

   team:req.params.id,

   status:"pending",

 });

 return res.status(200).json({
 success: true,
 invites,
});

}catch(err){

 res.status(500).json({
   message:"Failed"
 });

}

};

export const resendInvitation =
async (req,res)=>{

try{

 const invite =
 await TeamInvite.findById(
   req.params.inviteId
 );

 if(!invite){

   return res.status(404)
   .json({
     message:"Invite not found"
   });

 }

 invite.updatedAt =
 new Date();

 const team =
  await Team.findById(invite.team);

await sendInvitationEmail(
  invite.email,
  team.name,
  invite.token
);

 await invite.save();

 res.json({
   message:
   "Invitation resent"
 });

}catch(err){

 res.status(500).json({
   message:"Failed"
 });

}

};

export const cancelInvitation =
async (req,res)=>{

try{

 const invite =
 await TeamInvite.findById(
   req.params.inviteId
 );

 if(!invite){

   return res.status(404)
   .json({
     message:"Invite not found"
   });

 }

 const team =
 await Team.findById(invite.team);

team.activities.push({
 action:
  `Invitation cancelled for ${invite.email}`,
 user:
  req.user?.username || "System",
});

await team.save();

 await invite.deleteOne();

 res.json({
   message:
   "Invitation cancelled"
 });

}catch(err){

 res.status(500).json({
   message:"Failed"
 });

}

};

export const acceptInvitation =
async (req, res) => {

 try {

  const { token } = req.params;

  const invite =
   await TeamInvite.findOne({
    token,
    status: "pending",
   });

  if (!invite) {

   return res.status(404).json({
    message:
     "Invitation not found",
   });

  }

  const user =
 await User.findById(
  req.user.userId
 );


if (
 user.email !== invite.email
) {

 return res.status(403).json({
  success: false,
  message:
   "This invitation does not belong to you",
 });

}

  if (!user) {

   return res.status(404).json({
    message:
     "User not found",
   });

  }

  const team =
   await Team.findById(
    invite.team
   );

  if (!team) {

   return res.status(404).json({
    message:
     "Team not found",
   });

  }

  const alreadyMember =
   team.members.find(
    (m) =>
     m.user.toString() ===
     user._id.toString()
   );

  if (!alreadyMember) {

   team.members.push({

    user: user._id,

    role:
      invite.role || "member",

   });

   team.activities.push({

    action:
      `${user.email} joined team`,

    user:
      user.username,

   });

   await team.save();

   const io = getIO();

io.to(team._id.toString())
.emit(
  "team-notification",
  {
    message:
      `${user.username} joined team`,
  }
);

  }

  invite.status =
   "accepted";

  invite.acceptedAt =
   new Date();

  await invite.save();

  return res.json({

   success: true,

   message:
    "Invitation accepted",

   teamId:
    team._id,

  });

 } catch (err) {

  console.log(err);

  res.status(500).json({

   message:
    "Server Error",

  });

 }

};

export const getTeamActivities =
async (req, res) => {

 try {

  const { teamId } = req.params;

  const team =
   await Team.findById(teamId);

  if (!team) {

   return res.status(404).json({
    message: "Team not found",
   });

  }

  const member =
   team.members.find(
    m =>
     m.user.toString() ===
     req.user.userId
   );

  if (!member) {

   return res.status(403).json({
    message: "Access denied",
   });

  }

  return res.status(200).json({
 success: true,
 activities:
  team.activities || [],
});

 } catch (err) {

  console.log(err);

  return res.status(500).json({
   message: "Server Error",
  });

 }

};