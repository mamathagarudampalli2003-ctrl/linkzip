import mongoose from "mongoose";

// ================= MEMBER SCHEMA =================

const memberSchema =
  new mongoose.Schema({
    user: {
      type:
        mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    role: {
      type: String,

      enum: [
        "owner",
        "admin",
        "member",
      ],

      default: "member",
    },
  });

// ================= TEAM SCHEMA =================

const teamSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        default: "",
      },

      owner: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      // ================= MEMBERS =================

      members: {
        type: [memberSchema],
        default: [],
      },

      // ================= ACTIVITY LOGS =================

      activityLogs: [
        {
          action: String,

          performedBy: String,

          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],

      // ================= ACTIVITIES =================

      activities: [
        {
          action: {
            type: String,
            required: true,
          },

          user: {
            type: String,
            default: "System",
          },

          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],

      // ================= PENDING INVITES =================

      pendingInvites: {
        type: [
          {
            email: {
              type: String,
              lowercase: true,
              trim: true,
            },

            role: {
              type: String,

              enum: [
                "admin",
                "member",
              ],

              default: "member",
            },

            invitedAt: {
              type: Date,
              default: Date.now,
            },
          },
        ],

        default: [],
      },

      // ================= LINKS =================

      links: [
        {
          type:
            mongoose.Schema.Types.ObjectId,

          ref: "Url",
        },
      ],

      // ================= APPEARANCE =================

      workspaceColor: {
        type: String,
        default: "#3B82F6",
      },

      avatar: {
        type: String,
        default: "",
      },

      // ================= STATUS =================

      status: {
        type: String,

        enum: [
          "active",
          "archived",
        ],

        default: "active",
      },

      // ================= ANALYTICS =================

      totalClicks: {
        type: Number,
        default: 0,
      },

      totalLinks: {
        type: Number,
        default: 0,
      },

      totalMembers: {
        type: Number,
        default: 1,
      },
    },

    {
      timestamps: true,
    }
  );

// ================= INDEXES =================

teamSchema.index({
  owner: 1,
});

teamSchema.index({
  name: 1,
});

teamSchema.index({
  "members.user": 1,
});

teamSchema.index({
  createdAt: -1,
});

teamSchema.index({
  status: 1,
});

// ================= LIMIT LOG SIZE =================

teamSchema.pre(
  "save",
  function (next) {
    if (
      this.activityLogs &&
      this.activityLogs.length > 100
    ) {
      this.activityLogs =
        this.activityLogs.slice(-100);
    }

    if (
      this.activities &&
      this.activities.length > 100
    ) {
      this.activities =
        this.activities.slice(-100);
    }

    this.totalMembers =
      this.members?.length || 0;

    next();
  }
);

// ================= EXPORT =================

export default mongoose.model(
  "Team",
  teamSchema
);