export default function AiInsightsCard({
  data,
}) {
  if (!data) return null;

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        bg-gradient-to-br
        from-purple-600
        via-fuchsia-600
        to-indigo-700
        p-8
        text-white
        shadow-2xl
      "
    >
      {/* Glow Effect */}

      <div
        className="
          absolute
          top-0
          right-0
          h-56
          w-56
          rounded-full
          bg-white/10
          blur-3xl
        "
      />

      {/* Header */}

      <div
        className="
          relative
          z-10
          flex
          items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-white/70
              text-sm
            "
          >
            AI Optimization Engine
          </p>

          <h2
            className="
              text-3xl
              font-bold
              mt-2
            "
          >
            Smart Insights
          </h2>
        </div>

        <div
          className="
            text-5xl
          "
        >
          🤖
        </div>
      </div>

      {/* Score */}

      <div
        className="
          relative
          z-10
          mt-8
        "
      >
        <p
          className="
            text-white/70
          "
        >
          Performance Score
        </p>

        <h1
          className="
            text-6xl
            font-black
            mt-2
          "
        >
          {data.performanceScore}%
        </h1>
      </div>

      {/* Stats */}

      <div
        className="
          relative
          z-10
          grid
          grid-cols-2
          gap-4
          mt-8
        "
      >
        <div
          className="
            bg-white/10
            rounded-2xl
            p-4
          "
        >
          <p className="text-white/70 text-sm">
            Total Clicks
          </p>

          <h3
            className="
              text-2xl
              font-bold
              mt-2
            "
          >
            {data.totalClicks}
          </h3>
        </div>

        <div
          className="
            bg-white/10
            rounded-2xl
            p-4
          "
        >
          <p className="text-white/70 text-sm">
            Avg Clicks
          </p>

          <h3
            className="
              text-2xl
              font-bold
              mt-2
            "
          >
            {Math.round(
              data.avgClicks
            )}
          </h3>
        </div>
      </div>

      {/* Best Link */}

      <div
        className="
          relative
          z-10
          mt-8
          bg-white/10
          rounded-2xl
          p-5
        "
      >
        <p
          className="
            text-white/70
            text-sm
          "
        >
          Best Performing Link
        </p>

        <h3
          className="
            text-xl
            font-bold
            mt-2
            break-all
          "
        >
          {data.topLink?.shortId ||
            "No Data"}
        </h3>

        <p
          className="
            text-green-300
            mt-2
          "
        >
          {data.topLink?.clicks || 0}
          {" "}clicks
        </p>
      </div>

      {/* AI Recommendations */}

      <div
        className="
          relative
          z-10
          mt-8
        "
      >
        <p
          className="
            font-semibold
            mb-4
          "
        >
          AI Recommendations
        </p>

        <div
          className="
            space-y-3
          "
        >
          {data.recommendations?.map(
            (
              item,
              index
            ) => (
              <div
                key={index}
                className="
                  bg-white/10
                  rounded-xl
                  p-4
                "
              >
                • {item}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}