export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      features: [
        "20 URLs",
        "Basic Analytics",
        "QR Codes",
      ],
      color: "border-gray-700",
    },

    {
      name: "Pro",
      price: "₹199/mo",
      features: [
        "Unlimited URLs",
        "AI Routing",
        "Advanced Analytics",
        "Teams",
        "Priority Support",
      ],
      color: "border-blue-500",
    },

    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Dedicated Infrastructure",
        "Custom AI",
        "SSO",
        "Advanced Security",
      ],
      color: "border-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-10">

      {/* HEADER */}
      <div className="text-center mb-14">

        <h1 className="text-5xl font-bold">
          🚀 Pricing Plans
        </h1>

        <p className="text-gray-400 mt-4">
          Scale your smart link platform with AI
        </p>

      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-8">

        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`
              bg-gray-900 border ${plan.color}
              rounded-2xl p-8
            `}
          >

            {/* PLAN */}
            <h2 className="text-3xl font-bold">
              {plan.name}
            </h2>

            {/* PRICE */}
            <p className="text-4xl font-bold mt-5 text-blue-400">
              {plan.price}
            </p>

            {/* FEATURES */}
            <div className="mt-8 space-y-3">

              {plan.features.map((feature) => (
                <p
                  key={feature}
                  className="text-gray-300"
                >
                  ✅ {feature}
                </p>
              ))}

            </div>

            {/* BUTTON */}
            <button className="mt-10 w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-xl transition">
              Get Started
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}