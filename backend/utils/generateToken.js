import jwt from "jsonwebtoken";

import {
  JWT_SECRET,
  JWT_EXPIRES,
} from "../config/jwt.js";

const generateToken = (
  user
) => {

  return jwt.sign(
    {
      userId: user._id,

      email: user.email,

      role: user.role,
    },

    JWT_SECRET,

    {
      expiresIn:
        JWT_EXPIRES,
    }
  );
};

export default generateToken;