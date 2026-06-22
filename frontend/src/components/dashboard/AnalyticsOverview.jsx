import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AnalyticsOverview({
  chartData,
  totalClicks,
  topLink,
}) {

  const CustomTooltip = ({
    active,
    payload,
    label,
  }) => {

    if (
      active &&
      payload &&
      payload.length
    ) {
      return (
        <div
          className="
            bg-[#0F172A]
            border
            border-white/10
            rounded-2xl
            p-4
            shadow-2xl
          "
        >
          <p className="text-gray-400 text-sm">
            {label}
          </p>

          <p className="text-cyan-400 font-bold mt-2">
            {payload[0].value} Clicks
          </p>
        </div>
      );
    }

    return null;
  };

  return (

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* ================= MAIN CHART ================= */}

      <div
        className="
          xl:col-span-2
          bg-gradient-to-br
          from-[#0F172A]
          to-[#111827]
          border
          border-white/10
          rounded-[28px]
          p-7
          shadow-[0_0_40px_rgba(0,0,0,0.4)]
          overflow-hidden
          relative
        "
      >

        {/* Glow */}
        <div
          className="
            absolute
            top-0
            right-0
            w-72
            h-72
            bg-cyan-500/10
            blur-3xl
            rounded-full
          "
        />

        {/* Header */}

        <div className="flex justify-between items-start mb-8 relative z-10">

          <div>

            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-cyan-500/10
                border
                border-cyan-500/20
                text-cyan-400
                px-4
                py-2
                rounded-full
                text-xs
                font-semibold
                mb-4
              "
            >
              ● LIVE ANALYTICS
            </div>

            <h2
              className="
                text-3xl
                font-bold
                text-white
              "
            >
              Analytics Overview
            </h2>

            <p className="text-gray-400 mt-2">
              AI powered smart routing performance
            </p>

          </div>

          <div
            className="
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              text-white
              px-5
              py-3
              rounded-2xl
              shadow-xl
            "
          >
            <p className="text-xs opacity-80">
              Today
            </p>

            <h2 className="text-xl font-bold mt-1">
              {totalClicks}
            </h2>

          </div>

        </div>

        {/* Chart */}

        <div className="h-[280px] relative z-10">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart data={chartData}>

              <defs>

                <linearGradient
                  id="colorClicks"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#06B6D4"
                    stopOpacity={0.8}
                  />

                  <stop
                    offset="100%"
                    stopColor="#06B6D4"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1F2937"
              />

              <XAxis
                dataKey="name"
                stroke="#94A3B8"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                stroke="#94A3B8"
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                content={<CustomTooltip />}
              />

              <Area
                type="monotone"
                dataKey="clicks"
                stroke="#06B6D4"
                strokeWidth={4}
                fill="url(#colorClicks)"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* ================= SIDE PANEL ================= */}

      <div className="space-y-4">

        {/* TOTAL CLICKS */}

        <div
          className="
            bg-gradient-to-br
            from-cyan-500
            to-blue-600
            rounded-[28px]
            p-7
            shadow-2xl
            relative
            overflow-hidden
          "
        >

          <div
            className="
              absolute
              -right-10
              -top-10
              w-40
              h-40
              bg-white/10
              rounded-full
            "
          />

          <p className="text-white/70 text-sm">
            Total Engagement
          </p>

          <h1
            className="
              text-4xl
              font-black
              text-white
              mt-4
            "
          >
            {totalClicks}
          </h1>

          <p className="text-white/80 mt-4 text-sm">
            Real-time total clicks
            generated across all smart
            links
          </p>

        </div>

        {/* TOP LINK */}

        <div
          className="
            bg-[#111827]
            border
            border-white/10
            rounded-[28px]
            p-7
            shadow-xl
          "
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-400 text-sm">
                Best Performing Link
              </p>

              <h2
                className="
                  text-white
                  font-bold
                  text-lg
                  mt-3
                  break-all
                "
              >
                {
                  topLink?.shortId ||
                  "No Data"
                }
              </h2>

            </div>

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-green-500/10
                flex
                items-center
                justify-center
                text-2xl
              "
            >
              🚀
            </div>

          </div>

          <div
            className="
              mt-6
              flex
              items-center
              justify-between
            "
          >

            <p className="text-green-400 font-semibold">
              {
                topLink?.clicks || 0
              } clicks
            </p>

            <div
              className="
                text-xs
                bg-green-500/10
                text-green-400
                px-3
                py-1
                rounded-full
              "
            >
              Trending
            </div>

          </div>

        </div>

        {/* AI STATUS */}

        <div
          className="
            bg-gradient-to-br
            from-purple-600
            via-pink-600
            to-indigo-600
            rounded-[28px]
            p-7
            shadow-2xl
            relative
            overflow-hidden
          "
        >

          <div
            className="
              absolute
              bottom-0
              right-0
              w-44
              h-44
              bg-white/10
              rounded-full
              blur-2xl
            "
          />

          <p className="text-white/70 text-sm">
            AI Routing Engine
          </p>

          <h2
            className="
              text-2xl
              font-bold
              text-white
              mt-4
            "
          >
            Active ⚡
          </h2>

          <p className="text-white/80 mt-4 text-sm leading-relaxed">
            Smart AI optimization is
            automatically improving
            routing decisions and
            click performance.
          </p>

          <div
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              bg-white/10
              px-4
              py-2
              rounded-full
              text-sm
            "
          >
            ● Neural Engine Online
          </div>

        </div>

      </div>

    </div>
  );
}