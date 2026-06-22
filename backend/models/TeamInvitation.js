import mongoose from "mongoose";

const teamInviteSchema = new mongoose.Schema(
{
team: {
type: mongoose.Schema.Types.ObjectId,
ref: "Team",
required: true,
index: true,
},

email: {
type: String,
required: true,
lowercase: true,
trim: true,
index: true,
},

role: {
type: String,
enum: ["admin", "member"],
default: "member",
},

invitedBy: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},

token: {
type: String,
required: true,
unique: true,
index: true,
},

status: {
type: String,
enum: [
"pending",
"accepted",
"expired",
"cancelled",
],
default: "pending",
index: true,
},

acceptedAt: {
type: Date,
default: null,
},

expiresAt: {
type: Date,
default: () =>
new Date(
Date.now() +
7 * 24 * 60 * 60 * 1000
),
index: true,
},
},
{
timestamps: true,
}
);

// Prevent duplicate pending invites
teamInviteSchema.index(
{
team: 1,
email: 1,
status: 1,
},
{
unique: true,
partialFilterExpression: {
status: "pending",
},
}
);

// Auto-expire old invitations
teamInviteSchema.pre(
"save",
function (next) {

if (
this.status === "pending" &&
this.expiresAt &&
new Date() > this.expiresAt
) {

this.status = "expired";

}

next();

}
);

export default mongoose.model(
"TeamInvite",
teamInviteSchema
);