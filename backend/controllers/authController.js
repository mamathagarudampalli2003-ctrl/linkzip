import User from "../models/User.js";
import jwt from "jsonwebtoken";

// ================= JWT GENERATOR =================

const generateToken = (user) => {

  return jwt.sign(

    {
      userId: user._id,
      email: user.email,
      username: user.username,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "7d",
    }

  );

};

// ================= SIGNUP =================

export const signup = async (
  req,
  res
) => {

  try {

    const {
      username,
      email,
      password,
    } = req.body;

    if (
      !username ||
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message:
          "All fields are required",

      });

    }

    if (
      username.trim().length < 3
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Username must be at least 3 characters",

      });

    }

    if (
      password.length < 8
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Password must be at least 8 characters",

      });

    }

    const emailRegex =
      /^\S+@\S+\.\S+$/;

    if (
      !emailRegex.test(email)
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid email format",

      });

    }

    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {

      return res.status(400).json({

        success: false,

        message:
          "User already exists",

      });

    }

    const user =
      await User.create({

        username,

        email,

        password,

      });

    const token =
      generateToken(user);

    const userData =
      user.toObject();

    delete userData.password;

    return res.status(201).json({

      success: true,

      message:
        "User created successfully",

      token,

      user: userData,

    });

  } catch (error) {

    console.error(
      "SIGNUP ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Server error",

    });

  }

};

// ================= LOGIN =================

export const login = async (
  req,
  res
) => {

  try {

    const {
      email,
      password,
    } = req.body;

    if (
      !email ||
      !password
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Email and password are required",

      });

    }

    const user =
      await User.findOne({
        email,
      }).select("+password");

    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User not found",

      });

    }

    if (
      user.accountStatus ===
      "deleted"
    ) {

      return res.status(403).json({

        success: false,

        message:
          "Account deleted",

      });

    }

    if (
      user.accountStatus ===
      "suspended"
    ) {

      return res.status(403).json({

        success: false,

        message:
          "Account suspended",

      });

    }

    const isMatch =
      await user.matchPassword(
        password
      );

    if (!isMatch) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid credentials",

      });

    }

    user.lastLogin =
      new Date();

    await user.save();

    const token =
      generateToken(user);

    const userData =
      user.toObject();

    delete userData.password;

    return res.status(200).json({

      success: true,

      message:
        "Login successful",

      token,

      user: userData,

    });

  } catch (error) {

    console.error(
      "LOGIN ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Server error",

    });

  }

};

// ================= GOOGLE AUTH =================

export const googleAuth = async (
  req,
  res
) => {

  try {

    console.log(
      "BODY RECEIVED:",
      req.body
    );

    const {
      email,
      name,
      picture,
    } = req.body || {};

    if (!email) {

      return res.status(400).json({

        success: false,

        message:
          "Email not received from frontend",

      });

    }

    let user =
      await User.findOne({
        email,
      });

    if (!user) {

      user =
        await User.create({

          username:
            name ||
            "Google User",

          email,

          password:
            `${Date.now()}GoogleUserSecurePassword123`,

          avatar:
            picture || "",

        });

    }

    if (
      user.accountStatus ===
      "deleted"
    ) {

      return res.status(403).json({

        success: false,

        message:
          "Account deleted",

      });

    }

    if (
      user.accountStatus ===
      "suspended"
    ) {

      return res.status(403).json({

        success: false,

        message:
          "Account suspended",

      });

    }

    const token =
      generateToken(user);

    const userData =
      user.toObject();

    delete userData.password;

    return res.status(200).json({

      success: true,

      token,

      user: userData,

    });

  } catch (error) {

    console.error(
      "GOOGLE AUTH ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Google auth failed",

    });

  }

};

// ================= GET PROFILE =================

export const getUserProfile =
  async (
    req,
    res
  ) => {

    try {

      const user =
        await User.findById(
          req.user.userId
        ).select("-password");

      if (!user) {

        return res.status(404).json({

          success: false,

          message:
            "User not found",

        });

      }

      return res.status(200).json({

        success: true,

        user,

      });

    } catch (error) {

      console.error(
        "PROFILE ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Server error",

      });

    }

  };