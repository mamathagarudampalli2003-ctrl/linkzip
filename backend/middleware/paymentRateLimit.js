import rateLimit from "express-rate-limit";

const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 20,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many payment requests",
  },
});

export default paymentLimiter;