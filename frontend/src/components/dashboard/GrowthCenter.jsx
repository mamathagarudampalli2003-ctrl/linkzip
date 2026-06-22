export default function GrowthCenter({
  analytics,
}) {

  const topCountries =
    analytics?.topCountries || [];

  return (

    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >

      {/* ================= A/B TESTING ================= */}

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
            text-xl
            font-bold
            mb-4
          "
        >
          🧪 A/B Testing
        </h2>

        <div className="space-y-3">

          <p className="text-gray-300">
            Variant A:
            {" "}
            <span className="text-cyan-400 font-bold">
              {analytics?.abTesting?.variantA || 0}
            </span>
          </p>

          <p className="text-gray-300">
            Variant B:
            {" "}
            <span className="text-purple-400 font-bold">
              {analytics?.abTesting?.variantB || 0}
            </span>
          </p>

          <p className="text-green-400 font-bold">
            Winner:
            {" "}
            {analytics?.abTesting?.winner || "-"}
          </p>

        </div>

      </div>

      {/* ================= QR ANALYTICS ================= */}

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
            text-xl
            font-bold
            mb-4
          "
        >
          📱 QR Analytics
        </h2>

        <div className="space-y-3">

          <p>
            Total Scans:
            {" "}
            <span className="text-cyan-400 font-bold">
              {analytics?.qrScans || 0}
            </span>
          </p>

          <p>
            Mobile:
            {" "}
            <span className="text-green-400">
              {analytics?.mobilePercent || 0}%
            </span>
          </p>

          <p>
            Desktop:
            {" "}
            <span className="text-purple-400">
              {analytics?.desktopPercent || 0}%
            </span>
          </p>

        </div>

      </div>

      {/* ================= GROWTH SUGGESTIONS ================= */}

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
            text-xl
            font-bold
            mb-4
          "
        >
          🤖 Growth Suggestions
        </h2>

        <ul className="space-y-3 text-gray-300">

          <li>
            • Post links during
            7 PM - 9 PM
          </li>

          <li>
            • Focus on mobile traffic
          </li>

          <li>
            • Promote best performing
            links more frequently
          </li>

        </ul>

      </div>

      {/* ================= TOP COUNTRIES ================= */}

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
            text-xl
            font-bold
            mb-4
          "
        >
          🌍 Top Countries
        </h2>

        <div className="space-y-3">

          {topCountries.length > 0 ? (

            topCountries
              .slice(0, 5)
              .map(
                ([country, count]) => (

                  <div
                    key={country}
                    className="
                      flex
                      justify-between
                    "
                  >

                    <span>
                      {country}
                    </span>

                    <span className="text-cyan-400 font-bold">
                      {count}
                    </span>

                  </div>

                )
              )

          ) : (

            <p className="text-gray-400">
              No data available
            </p>

          )}

        </div>

      </div>


      {/* ================= PERFORMANCE SUMMARY ================= */}

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
            text-xl
            font-bold
            mb-4
          "
        >
          📈 Performance
        </h2>

        <div className="space-y-3">

          <p>
            Total Clicks:
            {" "}
            <span className="text-cyan-400 font-bold">
              {analytics?.totalClicks || 0}
            </span>
          </p>

          <p>
            Avg Clicks:
            {" "}
            <span className="text-purple-400 font-bold">
              {analytics?.avgClicks || 0}
            </span>
          </p>

          <p>
            Best Performing Link:
            {" "}
            <span className="text-green-400 font-bold">
              {
                analytics?.topLink?.shortId ||
                "-"
              }
            </span>
          </p>

        </div>

      </div>

    </div>

  );
}