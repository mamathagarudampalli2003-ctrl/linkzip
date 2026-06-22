export default function ConversionFunnel({
  totalClicks,
}) {

  const visitors =
    totalClicks;

  const engaged =
    Math.round(
      totalClicks * 0.75
    );

  const signups =
    Math.round(
      totalClicks * 0.35
    );

  const conversions =
    Math.round(
      totalClicks * 0.15
    );

  return (

    <div
      className="
        bg-[#111827]
        border
        border-white/10
        rounded-3xl
        p-6
      "
    >

      <h2
        className="
          text-white
          text-2xl
          font-bold
          mb-6
        "
      >
        Conversion Funnel
      </h2>

      <div className="space-y-4">

        <div className="bg-blue-600 p-4 rounded-xl">
          Visitors: {visitors}
        </div>

        <div className="bg-cyan-600 p-4 rounded-xl">
          Engaged: {engaged}
        </div>

        <div className="bg-purple-600 p-4 rounded-xl">
          Signups: {signups}
        </div>

        <div className="bg-green-600 p-4 rounded-xl">
          Conversions: {conversions}
        </div>

      </div>

    </div>
  );
}