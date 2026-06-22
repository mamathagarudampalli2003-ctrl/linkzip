import User from "../models/User.js";
import crypto from "crypto";
import { PLAN_LIMITS } from "../config/planLimits.js";

// ================= ADD DOMAIN =================

export const addDomain = async (req, res) => {

try {

const { domain } = req.body;

if (!domain) {

  return res.status(400).json({
    success: false,
    message: "Domain is required",
  });

}

const user =
  await User.findById(
    req.user.userId
  );

if (!user) {

  return res.status(404).json({
    success: false,
    message: "User not found",
  });

}

// CHECK DUPLICATE DOMAIN

const alreadyExists =
  user.customDomains.find(
    d => d.domain === domain
  );

if (alreadyExists) {

  return res.status(400).json({
    success: false,
    message: "Domain already added",
  });

}

// PLAN LIMIT CHECK

const limit =
  PLAN_LIMITS[user.plan]
    .customDomains;

if (
  limit !== Infinity &&
  user.customDomains.length >= limit
) {

  return res.status(403).json({
    success: false,
    message:
      "Custom domain limit reached. Upgrade your plan.",
  });

}

const verificationToken =
  crypto
    .randomBytes(32)
    .toString("hex");

user.customDomains.push({

  domain,

  verified: false,

  verificationToken,

  createdAt: new Date(),

});

await user.save();

return res.status(200).json({

  success: true,

  message:
    "Domain added successfully",

  verificationToken,

});

} catch (error) {

console.log(
  "ADD DOMAIN ERROR:",
  error
);

return res.status(500).json({

  success: false,

  message:
    "Failed to add domain",

});

}

};

// ================= GET ALL DOMAINS =================

export const getDomains = async (
req,
res
) => {

try {

const user =
  await User.findById(
    req.user.userId
  );

if (!user) {

  return res.status(404).json({

    success: false,

    message:
      "User not found",

  });

}

return res.status(200).json({

  success: true,

  domains:
    user.customDomains || [],

});

} catch (error) {

console.log(
  "GET DOMAINS ERROR:",
  error
);

return res.status(500).json({

  success: false,

  message:
    "Failed to fetch domains",

});

}

};

// ================= VERIFY DOMAIN =================

export const verifyDomain =
async (req, res) => {

try {

  const {
    domain,
    token,
  } = req.body;

  if (!domain || !token) {

    return res.status(400).json({

      success: false,

      message:
        "Domain and token are required",

    });

  }

  const user =
    await User.findById(
      req.user.userId
    );

  if (!user) {

    return res.status(404).json({

      success: false,

      message:
        "User not found",

    });

  }

  const item =
    user.customDomains.find(
      (d) =>
        d.domain === domain &&
        d.verificationToken === token
    );

  if (!item) {

    return res.status(400).json({

      success: false,

      message:
        "Invalid verification token",

    });

  }

  item.verified = true;

  item.verificationToken = "";

  await user.save();

  return res.status(200).json({

    success: true,

    message:
      "Domain verified successfully",

  });

} catch (error) {

  console.log(
    "VERIFY DOMAIN ERROR:",
    error
  );

  return res.status(500).json({

    success: false,

    message:
      "Domain verification failed",

  });

}

};

// ================= DELETE DOMAIN =================

export const deleteDomain =
async (req, res) => {

try {

  const { domain } =
    req.body;

  if (!domain) {

    return res.status(400).json({

      success: false,

      message:
        "Domain is required",

    });

  }

  const user =
    await User.findById(
      req.user.userId
    );

  if (!user) {

    return res.status(404).json({

      success: false,

      message:
        "User not found",

    });

  }

  user.customDomains =
    user.customDomains.filter(
      (d) =>
        d.domain !== domain
    );

  await user.save();

  return res.status(200).json({

    success: true,

    message:
      "Domain deleted successfully",

  });

} catch (error) {

  console.log(
    "DELETE DOMAIN ERROR:",
    error
  );

  return res.status(500).json({

    success: false,

    message:
      "Failed to delete domain",

  });

}

};