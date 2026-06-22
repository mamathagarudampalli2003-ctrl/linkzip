import {
  useEffect,
  useState,
} from "react";

import {
  getBillingDetails,
} from "../../api/paymentApi";

import UpgradeButton from "../../components/billing/UpgradeButton";
import BillingHistory from "../../components/billing/BillingHistory";
import DownloadInvoiceButton from "../../components/billing/DownloadInvoiceButton";
import DomainManager from "../../components/domain/DomainManager";

export default function BillingSection() {

  const [billing,
    setBilling] =
    useState(null);

  const token =
    localStorage.getItem(
      "token"
    );

  useEffect(() => {

    const loadBilling =
      async () => {

        try {

          const data =
            await getBillingDetails(
              token
            );

          setBilling(data);

        } catch (error) {

          console.log(error);
        }
      };

    loadBilling();

  }, []);

  if (!billing) {

    return (
      <div className="text-center py-10">
        Loading Billing...
      </div>
    );
  }

  return (

    <div className="space-y-8">

      {/* CURRENT PLAN */}

      <div
        className="
          bg-gray-900
          border
          border-gray-800
          p-6
          rounded-3xl
        "
      >

        <h2
          className="
            text-2xl
            font-bold
            mb-6
          "
        >
          💳 Current Subscription
        </h2>

        <div
          className="
            grid
            md:grid-cols-4
            gap-4
          "
        >

          <div>

            <p className="text-gray-400">
              Plan
            </p>

            <h3
              className="
                text-2xl
                font-bold
                text-green-400
              "
            >
              {
                billing.plan?.toUpperCase()
              }
            </h3>

          </div>

          <div>

            <p className="text-gray-400">
              Status
            </p>

            <h3
              className="
                text-xl
                font-bold
                text-blue-400
              "
            >
              {
                billing.subscriptionStatus ||
                "inactive"
              }
            </h3>

          </div>

          <div>

            <p className="text-gray-400">
              Renewal Date
            </p>

            <h3
              className="
                text-xl
                font-bold
              "
            >
              {
                billing.planExpiry
                  ? new Date(
                      billing.planExpiry
                    ).toLocaleDateString()
                  : "N/A"
              }
            </h3>

          </div>

          <div>

            <p className="text-gray-400">
              Days Remaining
            </p>

            <h3
              className="
                text-xl
                font-bold
                text-yellow-400
              "
            >
              {
                billing.daysRemaining
              } Days
            </h3>

          </div>

        </div>

      </div>

      <div
  className="
    mt-3
    bg-gray-800
    rounded-full
    h-3
    overflow-hidden
  "
>

  <div
    className="
      bg-green-500
      h-3
    "
    style={{
      width:
        `${Math.min(
          100,
          (billing.daysRemaining / 30) * 100
        )}%`
    }}
  />

</div>

      {/* PRICING */}

      <div
        className="
          grid
          md:grid-cols-3
          gap-6
        "
      >

        <div
          className="
            bg-gray-900
            border
            border-gray-800
            p-6
            rounded-3xl
          "
        >

          <h2 className="text-2xl font-bold">
            Free Plan
          </h2>

          <h3
            className="
              text-4xl
              font-black
              mt-4
            "
          >
            ₹0
          </h3>

          <ul className="mt-6 space-y-2">
            <li>✅ 10 Links</li>
            <li>✅ Basic Analytics</li>
            <li>✅ Teams</li>
          </ul>

        </div>

        <div
          className="
            bg-gradient-to-br
            from-blue-600
            to-purple-600
            p-6
            rounded-3xl
          "
        >

          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            Pro Plan
          </h2>

          <h3
            className="
              text-5xl
              font-black
              text-white
              mt-4
            "
          >
            ₹199
          </h3>

          <p className="text-white/80">
            per month
          </p>

          <ul
            className="
              mt-6
              space-y-2
              text-white
            "
          >
            <li>🚀 Unlimited Links</li>
            <li>🚀 AI Analytics</li>
            <li>🚀 Custom Domains</li>
            <li>🚀 Premium Routing</li>
            <li>🚀 Startup Features</li>
    <li>🔥 Unlimited Teams</li>
    <li>🔥 API Access</li>
    </ul>

          {
            billing.plan !== "pro" && (

              <div className="mt-8">

                <UpgradeButton />

              </div>

            )
          }

        </div>

      </div>

      <BillingHistory />

      <DomainManager />

      <DownloadInvoiceButton />

    </div>
  );
}