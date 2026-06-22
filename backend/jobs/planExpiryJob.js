import User from "../models/User.js";

const checkExpiredPlans =
  async () => {

    try {

      const result =
        await User.updateMany(
          {
            plan: {
              $ne: "free",
            },

            planExpiry: {
              $lt: new Date(),
            },
          },
          {
            $set: {

              plan: "free",

              subscriptionStatus:
                "inactive",

            },
          }
        );

      console.log(
        `Expired plans checked. Updated ${result.modifiedCount} users`
      );

    } catch (error) {

      console.log(
        "Plan Expiry Job Error:",
        error
      );

    }

  };

export default checkExpiredPlans;