import dotenv from "dotenv";
dotenv.config();

import Razorpay from "razorpay";

let razorpay = null;

console.log(
  "RAZORPAY_KEY_ID:",
  process.env.RAZORPAY_KEY_ID
);

console.log(
  "RAZORPAY_KEY_SECRET:",
  process.env.RAZORPAY_KEY_SECRET ? "FOUND" : "MISSING"
);

if (
  process.env.RAZORPAY_KEY_ID &&
  process.env.RAZORPAY_KEY_SECRET
) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  console.log("Razorpay Initialized ✅");
} else {
  console.log(
    "Razorpay Keys Missing ⚠️ Payment features disabled temporarily"
  );
}

export default razorpay;