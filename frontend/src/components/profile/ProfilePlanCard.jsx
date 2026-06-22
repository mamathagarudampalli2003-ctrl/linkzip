export default function ProfilePlanCard() {

  return (

    <div className="
      bg-[#111827]
      border border-white/10
      rounded-3xl
      p-6
      shadow-2xl
    ">

      <div className="
        flex justify-between items-center
      ">

        <div>

          <p className="text-gray-400">
            Current Plan
          </p>

          <h2 className="
            text-3xl
            font-bold
            text-white
            mt-2
          ">
            🚀 Pro Plan
          </h2>

        </div>

        <div className="
          bg-green-500/20
          text-green-400
          px-4 py-2
          rounded-xl
        ">
          Active
        </div>

      </div>

      <div className="
        mt-8
        space-y-4
      ">

        <div className="
          flex justify-between
          text-gray-300
        ">
          <span>Monthly Links</span>
          <span>Unlimited</span>
        </div>

        <div className="
          flex justify-between
          text-gray-300
        ">
          <span>Analytics</span>
          <span>Advanced AI</span>
        </div>

        <div className="
          flex justify-between
          text-gray-300
        ">
          <span>Teams</span>
          <span>Unlimited</span>
        </div>

      </div>

      <button
        className="
          w-full
          mt-8
          bg-blue-600
          hover:bg-blue-700
          py-3
          rounded-2xl
          font-semibold
        "
      >
        Upgrade Plan
      </button>

    </div>
  );
}