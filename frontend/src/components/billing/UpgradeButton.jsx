import {
  createOrder,
  verifyPayment,
} from "../../api/paymentApi";

export default function UpgradeButton() {

  const handleUpgrade =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          alert(
            "Please login first"
          );

          return;
        }

        // CREATE ORDER

        const order =
          await createOrder(
            "pro",
            token
          );

        const options = {

          key:
            import.meta.env
              .VITE_RAZORPAY_KEY,

          amount:
            order.amount,

          currency:
            order.currency,

          name:
            "LinkZip",

          description:
            "Pro Subscription",

          order_id:
            order.id,

          handler:
            async (
              response
            ) => {

              try {

                const result =
                  await verifyPayment(
                    {
                    response,
                    plan: "pro",
                  },
                    token
                  );

                if (
                  result.success
                ) {

                  const user =
                    JSON.parse(
                      localStorage.getItem(
                        "user"
                      )
                    ) || {};

                  // PLAN

                  user.plan =
                    "pro";

                  // EXPIRY

                  user.planExpiry =
                    new Date(
                      Date.now() +
                      30 *
                      24 *
                      60 *
                      60 *
                      1000
                    );

                  // PAYMENT HISTORY

                  user.paymentHistory =
                    user.paymentHistory ||
                    [];

                  user.paymentHistory.push({

                    amount:
                      199,

                    paymentId:
                      response.razorpay_payment_id,

                    orderId:
                      response.razorpay_order_id,

                    status:
                      "success",

                    createdAt:
                      new Date(),

                  });

                  localStorage.setItem(
                    "user",
                    JSON.stringify(
                      user
                    )
                  );

                  alert(
                    "🎉 Payment Successful!"
                  );

                  window.location.reload();

                } else {

                  alert(
                    "Payment verification failed"
                  );
                }

              } catch (error) {

                console.log(
                  "Verification Error:",
                  error
                );

                alert(
                  "Payment verification failed"
                );
              }
            },

          prefill: {

            name:
              "LinkZip User",

            email:
              "",

            contact:
              "",

          },

          theme: {
            color:
              "#7C3AED",
          },

        };

        const razorpay =
          new window.Razorpay(
            options
          );

        razorpay.open();

      } catch (error) {

        console.log(
          "Payment Error:",
          error
        );

        alert(
          "Payment Failed"
        );
      }
    };

  return (

    <button
      onClick={
        handleUpgrade
      }
      className="
        w-full
        bg-purple-600
        hover:bg-purple-700
        text-white
        py-3
        rounded-xl
        font-bold
        transition-all
        duration-300
      "
    >
      🚀 Upgrade To Pro
    </button>

  );
}