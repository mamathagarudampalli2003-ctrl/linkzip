import { useEffect, useState } from "react";

import {
  getBillingHistory,
} from "../../api/paymentApi";

export default function BillingHistory() {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchBillingHistory();

  }, []);

  const fetchBillingHistory =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const result =
          await getBillingHistory(
            token
          );

        setData(result);

      } catch (error) {

        console.log(
          "Billing History Error:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

  if (loading) {

    return (

      <div
        className="
          bg-gray-900
          border
          border-gray-800
          rounded-3xl
          p-6
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            mb-4
          "
        >
          📜 Billing History
        </h2>

        <p className="text-gray-400">
          Loading...
        </p>

      </div>
    );
  }

  return (

    <div
      className="
        bg-gray-900
        border
        border-gray-800
        rounded-3xl
        p-6
      "
    >

      <div
        className="
          flex
          justify-between
          items-center
          mb-6
        "
      >

        <h2
          className="
            text-2xl
            font-bold
          "
        >
          📜 Billing History
        </h2>

        <span
          className="
            px-3
            py-1
            rounded-full
            bg-green-500/20
            text-green-400
            text-sm
          "
        >
          {data?.plan?.toUpperCase()}
        </span>

      </div>

      {/* PLAN INFO */}

      <div
        className="
          mb-6
          p-4
          rounded-2xl
          bg-[#111827]
          border
          border-gray-800
        "
      >

        <p className="text-gray-400">
          Current Plan
        </p>

        <h3
          className="
            text-xl
            font-bold
            text-green-400
            mt-2
          "
        >
          {data?.plan || "Free"}
        </h3>

        <p
          className="
            text-gray-400
            mt-2
          "
        >
          Valid Till:
          {" "}
          {
            data?.planExpiry
              ? new Date(
                  data.planExpiry
                ).toLocaleDateString()
              : "N/A"
          }
        </p>

      </div>

      {/* TABLE HEADER */}

      <div
        className="
          grid
          grid-cols-4
          gap-4
          text-gray-400
          text-sm
          font-semibold
          border-b
          border-gray-800
          pb-3
        "
      >
        <span>Amount</span>
        <span>Status</span>
        <span>Date</span>
        <span>Payment ID</span>
      </div>

      {/* PAYMENTS */}

      {data?.paymentHistory?.length > 0 ? (

        data.paymentHistory.map(
          (payment) => (

            <div
              key={
                payment.paymentId
              }
              className="
                grid
                grid-cols-4
                gap-4
                py-4
                border-b
                border-gray-800
                text-sm
              "
            >

              <span
                className="
                  text-green-400
                  font-semibold
                "
              >
                ₹{payment.amount}
              </span>

              <span
                className="
                  text-green-400
                "
              >
                {payment.status}
              </span>

              <span>
                {
                  new Date(
                    payment.createdAt
                  ).toLocaleDateString()
                }
              </span>

              <span
                className="
                  truncate
                  text-cyan-400
                "
              >
                {
                  payment.paymentId
                }
              </span>

            </div>
          )
        )

      ) : (

        <div
          className="
            py-10
            text-center
            text-gray-400
          "
        >
          No payments yet.
        </div>

      )}

    </div>
  );
}