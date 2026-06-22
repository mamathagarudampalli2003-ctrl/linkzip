import StatsCards from "../components/analytics/StatsCards";
import AnalyticsChart from "../components/analytics/AnalyticsChart";
import AiInsightsPanel from "../components/analytics/AiInsightsPanel";
import VisitorsCard from "../components/analytics/VisitorsCard";
import Loader from "../components/common/Loader";
import { useEffect } from "react";
import socket from "../../socket";

export default function AnalyticsSection({
  totalLinks,
  totalClicks,
  avgClicks,
  topLink,
  lowLink,
  liveVisitors,
  chartData,
  aiSuggestion,
  aiData,
  aiLoading,
}) {

  const conversionRate =
    totalLinks > 0
      ? (
          totalClicks / totalLinks
        ).toFixed(1)
      : 0;

  return (

    <div className="space-y-8">

      {/* ================= HERO ================= */}

      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          border
          border-gray-800
          bg-gradient-to-br
          from-gray-950
          via-gray-900
          to-black
          p-8
        "
      >

        {/* GLOW */}

        <div
          className="
            absolute
            top-0
            right-0
            w-72
            h-72
            bg-blue-500/20
            blur-3xl
            rounded-full
          "
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            w-72
            h-72
            bg-purple-500/10
            blur-3xl
            rounded-full
          "
        />

        <div className="relative z-10">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  bg-blue-500/10
                  border
                  border-blue-500/20
                  text-blue-400
                  text-sm
                  font-semibold
                  mb-5
                "
              >
                🚀 AI Analytics Platform
              </div>

              <h1
                className="
                  text-4xl
                  md:text-5xl
                  font-black
                  text-white
                  leading-tight
                "
              >
                Smart Link
                <span className="text-blue-500">
                  {" "}Analytics
                </span>
              </h1>

              <p
                className="
                  text-gray-400
                  mt-4
                  max-w-2xl
                  text-lg
                  leading-relaxed
                "
              >
                Real-time AI powered analytics,
                intelligent optimization,
                audience insights,
                and SaaS-grade performance monitoring.
              </p>

            </div>

            {/* QUICK METRICS */}

            <div className="grid grid-cols-2 gap-4 min-w-[320px]">

              <div
                className="
                  bg-gray-900/70
                  border
                  border-gray-800
                  p-5
                  rounded-2xl
                  backdrop-blur-xl
                "
              >
                <p className="text-gray-400 text-sm">
                  Conversion Rate
                </p>

                <h2 className="text-3xl font-bold mt-2 text-green-400">
                  {conversionRate}%
                </h2>

                <p className="text-xs text-gray-500 mt-2">
                  Engagement performance
                </p>
              </div>

              <div
                className="
                  bg-gray-900/70
                  border
                  border-gray-800
                  p-5
                  rounded-2xl
                  backdrop-blur-xl
                "
              >
                <p className="text-gray-400 text-sm">
                  Live Visitors
                </p>

                <h2 className="text-3xl font-bold mt-2 text-blue-400">
                  {liveVisitors || 0}
                </h2>

                <p className="text-xs text-gray-500 mt-2">
                  Active users now
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ================= STATS ================= */}

      <StatsCards
        totalLinks={totalLinks}
        totalClicks={totalClicks}
        avgClicks={avgClicks}
        topLink={topLink}
      />

      {/* ================= VISITORS + PERFORMANCE ================= */}

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2">
          <AnalyticsChart
            chartData={chartData}
          />
        </div>

        <div className="space-y-6">

          <VisitorsCard
            liveVisitors={liveVisitors}
          />

          {/* AI SCORE */}

          <div
            className="
              bg-gradient-to-br
              from-blue-600
              to-purple-700
              rounded-3xl
              p-6
              shadow-2xl
            "
          >

            <p className="text-sm text-blue-100">
              🤖 AI Optimization Score
            </p>

            <h1 className="text-5xl font-black mt-4">
              92%
            </h1>

            <p className="text-sm text-blue-100 mt-3 leading-relaxed">
              Your links are performing better than
              86% of SaaS campaigns this week.
            </p>

          </div>

        </div>

      </div>

      {/* ================= AI INSIGHTS ================= */}

      <div
        className="
          bg-gray-950
          border
          border-gray-800
          rounded-3xl
          p-6
        "
      >

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold">
              🤖 AI Intelligence Center
            </h2>

            <p className="text-gray-400 mt-1">
              Automated recommendations and optimization insights
            </p>

          </div>

          <div
            className="
              px-4
              py-2
              rounded-xl
              bg-green-500/10
              border
              border-green-500/20
              text-green-400
              text-sm
              font-semibold
            "
          >
            LIVE ANALYSIS
          </div>

        </div>

        {aiLoading ? (
          <Loader text="Analyzing performance with AI..." />
        ) : (
          <AiInsightsPanel
            aiData={aiData}
            topLink={topLink}
            lowLink={lowLink}
            aiSuggestion={aiSuggestion}
          />
        )}

      </div>

      {/* ================= ADVANCED INSIGHTS ================= */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* BEST LINK */}

        <div
          className="
            bg-gray-900
            border
            border-gray-800
            rounded-3xl
            p-6
            hover:border-blue-500/40
            transition-all
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-sm">
                🚀 Top Performing Link
              </p>

              <h2 className="text-xl font-bold mt-3 break-all text-blue-400">
                {topLink?.shortId || "No Data"}
              </h2>

            </div>

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-blue-500/10
                flex
                items-center
                justify-center
                text-2xl
              "
            >
              📈
            </div>

          </div>

          <div className="mt-6">

            <div className="flex justify-between text-sm mb-2">

              <span className="text-gray-400">
                Performance
              </span>

              <span className="text-white">
                {topLink?.clicks || 0} clicks
              </span>

            </div>

            <div className="w-full bg-gray-800 h-3 rounded-full overflow-hidden">

              <div
                style={{
                  width: "92%",
                }}
                className="
                  h-full
                  bg-gradient-to-r
                  from-blue-500
                  to-cyan-400
                "
              />

            </div>

          </div>

        </div>

        {/* LOW LINK */}

        <div
          className="
            bg-gray-900
            border
            border-gray-800
            rounded-3xl
            p-6
            hover:border-red-500/40
            transition-all
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-400 text-sm">
                📉 Needs Optimization
              </p>

              <h2 className="text-xl font-bold mt-3 break-all text-red-400">
                {lowLink?.shortId || "No Data"}
              </h2>

            </div>

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-red-500/10
                flex
                items-center
                justify-center
                text-2xl
              "
            >
              ⚠️
            </div>

          </div>

          <p className="text-gray-400 text-sm mt-6 leading-relaxed">
            AI detected low engagement.
            Try improving targeting,
            CTA wording,
            or redirect strategy.
          </p>

        </div>

        {/* AI RECOMMENDATION */}

        <div
          className="
            bg-gradient-to-br
            from-purple-700
            to-indigo-800
            rounded-3xl
            p-6
            shadow-xl
          "
        >

          <p className="text-purple-100 text-sm">
            ✨ AI Recommendation
          </p>

          <h2 className="text-2xl font-bold mt-4">
            Smart Optimization
          </h2>

          <p className="mt-5 text-purple-100 leading-relaxed">
            {aiSuggestion}
          </p>

          <button
            className="
              mt-6
              bg-white
              text-black
              px-5
              py-3
              rounded-xl
              font-semibold
              hover:scale-105
              transition
            "
          >
            Run AI Optimization
          </button>

        </div>

      </div>

    </div>
  );
}