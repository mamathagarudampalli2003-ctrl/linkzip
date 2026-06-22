import crypto from "crypto";
import User from "../models/User.js";

export const razorpayWebhook =
async (req, res) => {

 try {

  const secret =
   process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!secret) {

   return res.status(500).json({
    success: false,
    message:
     "Webhook secret missing",
   });

  }

  const signature =
   req.headers[
    "x-razorpay-signature"
   ];

  if (!signature) {

   return res.status(400).json({
    success: false,
    message:
     "Missing Signature",
   });

  }

  const body =
   JSON.stringify(req.body);

  const expected =
   crypto
    .createHmac(
      "sha256",
      secret
    )
    .update(body)
    .digest("hex");

  const validSignature =
   crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
   );

  if (!validSignature) {

   return res.status(400).json({
    success: false,
    message:
     "Invalid Signature",
   });

  }

  const event =
   req.body.event;

  // =========================
  // PAYMENT CAPTURED
  // =========================

  if (
   event ===
   "payment.captured"
  ) {

   const payment =
    req.body.payload
     .payment.entity;

   const userId =
    payment.notes?.userId;

   const plan =
    payment.notes?.plan ||
    "pro";

   if (!userId) {

    return res.status(200).json({
     success: true,
    });

   }

   const user =
    await User.findById(
      userId
    );

   if (!user) {

    return res.status(200).json({
     success: true,
    });

   }

   const alreadyExists =
    user.paymentHistory.find(
      (p) =>
       p.paymentId ===
       payment.id
    );

   if (alreadyExists) {

    return res.status(200).json({
     success: true,
    });

   }

   user.plan = plan;

   user.subscriptionStatus =
    "active";

   user.subscriptionDate =
    new Date();

   const currentExpiry =

    user.planExpiry &&
    user.planExpiry >
      new Date()

     ? user.planExpiry

     : new Date();

   user.planExpiry =
    new Date(

     currentExpiry.getTime()

     +

     30 *
     24 *
     60 *
     60 *
     1000

    );

   user.paymentHistory.push({

    amount:
     payment.amount / 100,

    paymentId:
     payment.id,

    orderId:
     payment.order_id,

    status:
     "success",

    paidAt:
     new Date(),

   });

   await user.save();

   console.log(
    `Subscription Activated: ${user.email}`
   );

  }

  // =========================
  // PAYMENT FAILED
  // =========================

  if (
   event ===
   "payment.failed"
  ) {

   const payment =
    req.body.payload
     .payment.entity;

   console.log(
    "Payment Failed:",
    payment.id
   );

  }

  // =========================
  // REFUND PROCESSED
  // =========================

  if (
   event ===
   "refund.processed"
  ) {

   const refund =
    req.body.payload
     .refund.entity;

   console.log(
    "Refund Processed:",
    refund.id
   );

  }

  return res.status(200).json({
   success: true,
   message:
    "Webhook processed",
  });

 } catch (error) {

  console.error(
   "Webhook Error:",
   error
  );

  return res.status(500).json({
   success: false,
   message:
    "Webhook processing failed",
  });

 }

};