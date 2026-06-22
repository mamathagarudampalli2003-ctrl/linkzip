import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// ================= PAYMENT HISTORY =================

const paymentSchema =
new mongoose.Schema(
{
  amount: Number,

  paymentId: String,

  orderId: String,

  status: String,

  earnings: {
  type: Number,
  default: 0,
},

  paidAt: {
    type: Date,
    default: Date.now,
  },
},
{
  _id: false,
}
);


// ================= USER SCHEMA =================

const userSchema =
new mongoose.Schema(
{
  username: {
    type: String,

    required: true,

    trim: true,

    minlength: 3,

    maxlength: 30,
  },

  email: {
    type: String,

    required: true,

    unique: true,

    lowercase: true,

    trim: true,
  },

  provider: {
  type: String,
  enum: ["local", "google"],
  default: "local",
},

avatar: {
  type: String,
  default: "",
},

  password: {
    type: String,

    required: true,

    minlength: 8,

    select: false,
  },

  // ================= PLAN =================

  plan: {
    type: String,

    enum: [
      "free",
      "pro",
      "business",
    ],

    default: "free",
  },

  // ================= ACCOUNT STATUS =================

  accountStatus: {
    type: String,

    enum: [
      "active",
      "suspended",
      "deleted",
    ],

    default: "active",
  },

  // ================= SUBSCRIPTIONS =================

  subscriptionStatus: {
    type: String,

    enum: [
      "inactive",
      "active",
      "expired",
      "cancelled",
    ],

    default: "inactive",
  },

  subscriptionId: {
    type: String,
    default: "",
  },

  razorpayCustomerId: {
    type: String,
    default: "",
  },

  subscriptionDate: {
    type: Date,
    default: null,
  },

  planExpiry: {
    type: Date,
    default: null,
  },

  // ================= LOGIN TRACKING =================

  lastLogin: {
    type: Date,
    default: null,
  },

  // ================= PAYMENTS =================

  paymentHistory: [
    paymentSchema,
  ],

  // ================= CUSTOM DOMAINS =================

  customDomains: [
    {
      domain: String,

      verificationToken: String,

      verified: {
        type: Boolean,
        default: false,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
},
{
  timestamps: true,
}
);

// ================= INDEXES =================

userSchema.index({
  email: 1,
});

userSchema.index({
  plan: 1,
});

userSchema.index({
  createdAt: -1,
});

// ================= PASSWORD HASHING =================

userSchema.pre(
"save",
async function (next) {

  if (
    !this.isModified("password")
  ) {
    return next();
  }

  const salt =
    await bcrypt.genSalt(10);

  this.password =
    await bcrypt.hash(
      this.password,
      salt
    );

  next();

}
);

// ================= PASSWORD COMPARE =================

userSchema.methods.matchPassword =
async function (
enteredPassword
) {

  return await bcrypt.compare(
    enteredPassword,
    this.password
  );

};

// ================= EXPORT =================

export default mongoose.model(
"User",
userSchema
);