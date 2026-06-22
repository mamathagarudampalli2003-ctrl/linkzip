import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (
  req,
  res,
  next
) => {

  try {

    const authHeader =
      req.headers.authorization;

    // ================= CHECK HEADER =================

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {

      return res.status(401).json({

        success: false,

        message:
          "Access denied. No token provided.",

      });

    }

    // ================= EXTRACT TOKEN =================

    const token =
      authHeader.split(" ")[1];

    if (!token) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid token",

      });

    }

    // ================= CHECK JWT SECRET =================

    if (!process.env.JWT_SECRET) {

      throw new Error(
        "JWT_SECRET missing"
      );

    }

    // ================= VERIFY TOKEN =================

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    if (!decoded.userId) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid token payload",

      });

    }

    // ================= CHECK USER EXISTS =================

    const user =
      await User.findById(
        decoded.userId
      );

    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "User not found",

      });

    }

    // ================= ACCOUNT STATUS CHECK =================

    if (
      user.accountStatus !== "active"
    ) {

      return res.status(403).json({

        success: false,

        message:
          "Account suspended",

      });

    }

    // ================= UPDATE LAST LOGIN =================

    await User.updateOne(

      {
        _id: user._id,
      },

      {
        lastLogin:
          new Date(),
      }

    );

    // ================= ATTACH USER TO REQUEST =================

    req.user = {

      userId:
        decoded.userId,

      email:
        decoded.email,

      username:
        decoded.username,

      plan:
        user.plan,

    };

    next();

  }

  catch (error) {

    console.log(
      "AUTH MIDDLEWARE ERROR:",
      error.message
    );

    // ================= TOKEN EXPIRED =================

    if (
      error.name ===
      "TokenExpiredError"
    ) {

      return res.status(401).json({

        success: false,

        message:
          "Token expired. Please login again.",

      });

    }

    // ================= INVALID TOKEN =================

    if (
      error.name ===
      "JsonWebTokenError"
    ) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid token.",

      });

    }

    return res.status(401).json({

      success: false,

      message:
        "Unauthorized",

    });

  }

};

export default authMiddleware;