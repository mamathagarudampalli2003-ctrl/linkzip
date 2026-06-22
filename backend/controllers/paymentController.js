import razorpay from "../services/razorpayService.js";
import User from "../models/User.js";
import crypto from "crypto";

import { PLAN_PRICES } from "../config/planLimits.js";

// ================= CREATE ORDER =================

export const createOrder = async (
  req,
  res
) => {

  try {

    const { plan } = req.body;

if (
 !plan ||
 !(plan in PLAN_PRICES)
)

 return res.status(400).json({
  success: false,
  message: "Invalid plan",
 });


const options = {

 amount:
  PLAN_PRICES[plan] * 100,

 currency: "INR",

 receipt:
  `receipt_${Date.now()}`,

 notes: {
  plan,
  userId:
   req.user.userId,
 },

};

    const order =
      await razorpay.orders.create(
        options
      );

    return res.status(200).json(
      order
    );

  } catch (error) {

    console.log(
      "Create Order Error:",
      error
    );

    return res.status(500).json({
      message:
        "Failed to create order",
    });
  }
};

// ================= VERIFY PAYMENT =================

export const verifyPayment =
async (
 req,
 res
) => {

 try {

  const {

   razorpay_order_id,

   razorpay_payment_id,

   razorpay_signature,

  } = req.body;

  const generatedSignature =
   crypto
    .createHmac(
      "sha256",
      process.env
       .RAZORPAY_KEY_SECRET
    )
    .update(
      razorpay_order_id +
      "|" +
      razorpay_payment_id
    )
    .digest("hex");

  if (
   generatedSignature !==
   razorpay_signature
  ) {

   return res.status(400).json({

    success:false,

    message:
     "Payment verification failed",

   });

  }

  const user =
   await User.findById(
    req.user.userId
   );

  if (!user) {

   return res.status(404).json({

    success:false,

    message:
     "User not found",

   });

  }

  const existingPayment =
 user.paymentHistory.find(
  payment =>
   payment.paymentId ===
   razorpay_payment_id
 );

if (existingPayment) {

 return res.status(400).json({

  success:false,

  message:
   "Payment already processed",

 });

}

  const selectedPlan =
 req.body.plan;

 if (
 !selectedPlan ||
 !(selectedPlan in PLAN_PRICES)
) {

 return res.status(400).json({
  success: false,
  message: "Invalid plan",
 });

}

user.plan =
 selectedPlan;

  user.subscriptionStatus =
   "active";

  user.subscriptionDate =
   new Date();

  const currentExpiry =

 user.planExpiry &&
 user.planExpiry > new Date()

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
  PLAN_PRICES[selectedPlan],

 paymentId:
  razorpay_payment_id,

 orderId:
  razorpay_order_id,

 status:
  "success",

 paidAt:
  new Date(),

});

  await user.save();

  user.lastLogin =
 new Date();

await user.save();

  return res.status(200).json({

   success:true,

   message:
    "Payment verified successfully",

   plan:user.plan,

   planExpiry:
    user.planExpiry,

  });

 }

 catch(error){

  console.log(error);

  return res.status(500).json({

   success:false,

   message:
    "Verification failed",

  });

 }

};

// ================= BILLING HISTORY =================

export const getBillingHistory =
  async (
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

      const totalSpent =
 (user.paymentHistory || [])
 .reduce(
  (sum, payment) =>
   sum + (payment.amount || 0),
  0
 );

return res.status(200).json({

 success: true,

 plan:
  user.plan,

 planExpiry:
  user.planExpiry,

 totalSpent,

 paymentHistory:

 [...(
  user.paymentHistory || []
 )].sort(
  (a,b)=>
   new Date(b.paidAt) -
   new Date(a.paidAt)
 ),

});


    } catch (error) {

      console.log(
        "Billing History Error:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Failed to fetch billing history",

      });
    }
  };

// ================= BILLING DETAILS =================

export const getBillingDetails =
  async (req, res) => {

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

      let daysRemaining = 0;

      if (user.planExpiry) {

        daysRemaining =
          Math.max(
            0,
            Math.ceil(
              (
                new Date(
                  user.planExpiry
                ) -
                new Date()
              ) /
              (
                1000 *
                60 *
                60 *
                24
              )
            )
          );
      }

      return res.status(200).json({

        success: true,

        plan:
          user.plan,

        planExpiry:
          user.planExpiry,

        subscriptionStatus:
          user.subscriptionStatus,

        daysRemaining,

      });

    } catch (error) {

      console.log(
        "Billing Details Error:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Failed to fetch billing details",

      });
    }
  };