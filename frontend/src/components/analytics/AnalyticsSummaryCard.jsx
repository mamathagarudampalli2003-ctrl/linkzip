export default function AnalyticsSummaryCard({
  totalLinks,
  totalClicks,
  avgClicks,
  liveVisitors,
}) {

  return (

    <div
      className="
        bg-gradient-to-br
        from-cyan-500
        to-blue-600
        rounded-[32px]
        p-8
        text-white
        shadow-2xl
      "
    >

      <h2
        className="
          text-3xl
          font-bold
        "
      >
        Analytics Snapshot
      </h2>

      <div
        className="
          grid
          grid-cols-2
          gap-6
          mt-8
        "
      >

        <div>
          <p className="text-white/70">
            Links
          </p>

          <h3 className="text-4xl font-bold">
            {totalLinks}
          </h3>
        </div>

        <div>
          <p className="text-white/70">
            Clicks
          </p>

          <h3 className="text-4xl font-bold">
            {totalClicks}
          </h3>
        </div>

        <div>
          <p className="text-white/70">
            Avg Clicks
          </p>

          <h3 className="text-4xl font-bold">
            {avgClicks}
          </h3>
        </div>

        <div>
          <p className="text-white/70">
            Live
          </p>

          <h3 className="text-4xl font-bold">
            {liveVisitors}
          </h3>
        </div>

      </div>

    </div>
  );
}