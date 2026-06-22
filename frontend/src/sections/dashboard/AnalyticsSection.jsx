import AnalyticsHeader from "../../components/analytics/AnalyticsHeader";

import StatsCards from "../../components/analytics/StatsCards";

import DeviceAnalytics from "../../components/analytics/DeviceAnalytics";

import CountryAnalytics from "../../components/analytics/CountryAnalytics";

import ConversionFunnel from "../../components/analytics/ConversionFunnel";

import TopLinksTable from "../../components/analytics/TopLinksTable";

import AiRecommendationCard from "../../components/analytics/AiRecommendationCard";

import LiveVisitorsCard from "../../components/analytics/LiveVisitorsCard";

import AnalyticsSummaryCard from "../../components/analytics/AnalyticsSummaryCard";

import TrafficSourcesCard from "../../components/analytics/TrafficSourcesCard";

export default function AnalyticsSection({
  totalLinks,
  totalClicks,
  avgClicks,
  topLink,
  lowLink,
  liveVisitors,
  chartData,
  aiSuggestion,

  browserStats,
  osStats,

  analytics,
  urls,

  aiData,
  aiLoading,
})
{

  const referrerStats =
  analytics?.referrerStats ||
  {};

  return (

    <div className="space-y-8">

      {/* ================= HEADER ================= */}

      <AnalyticsHeader />

      {/* ================= KPI CARDS ================= */}

      <StatsCards

        totalLinks={totalLinks}

        totalClicks={totalClicks}

        avgClicks={avgClicks}

        liveVisitors={liveVisitors}

      />

      <AnalyticsSummaryCard

  totalLinks={totalLinks}

  totalClicks={totalClicks}

  avgClicks={avgClicks}

  liveVisitors={liveVisitors}

/>

      {/* ================= DEVICE + COUNTRY ================= */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        "
      >

        <DeviceAnalytics

          deviceStats={
            analytics?.deviceStats
          }

        />

        <CountryAnalytics

          countryStats={
            analytics?.countryStats
          }

        />

        <TrafficSourcesCard
  referrerStats={
    referrerStats
  }
/>

      </div>

      {/* ================= FUNNEL ================= */}

      <ConversionFunnel

        totalClicks={totalClicks}

      />

      {/* ================= TOP LINKS ================= */}

      <TopLinksTable

        urls={urls}

      />

      {/* ================= AI + LIVE ================= */}

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        "
      >

        <AiRecommendationCard

          aiSuggestion={
            aiSuggestion
          }

          topLink={
            topLink
          }

          lowLink={
            lowLink
          }

        />

        <LiveVisitorsCard

          liveVisitors={
            liveVisitors
          }

        />

      </div>

      {/* ================= BROWSER + OS ANALYTICS ================= */}

<div className="grid md:grid-cols-2 gap-6">

  {/* Browser */}

  <div
    className="
      bg-gray-900
      border
      border-gray-800
      rounded-3xl
      p-6
    "
  >

    <h2 className="text-xl font-bold mb-4">
      🌐 Browser Analytics
    </h2>

    {Object.entries(browserStats || {})
      .sort((a,b)=>b[1]-a[1])
      .map(([browser,count])=>(
        <div
          key={browser}
          className="
            flex
            justify-between
            py-2
          "
        >
          <span>{browser}</span>

          <span className="text-cyan-400">
            {count}
          </span>
        </div>
      ))}

  </div>

  {/* OS */}

  <div
    className="
      bg-gray-900
      border
      border-gray-800
      rounded-3xl
      p-6
    "
  >

    <h2 className="text-xl font-bold mb-4">
      💻 OS Analytics
    </h2>

    {Object.entries(osStats || {})
      .sort((a,b)=>b[1]-a[1])
      .map(([os,count])=>(
        <div
          key={os}
          className="
            flex
            justify-between
            py-2
          "
        >
          <span>{os}</span>

          <span className="text-green-400">
            {count}
          </span>
        </div>
      ))}

  </div>

</div>

      {/* ================= ADVANCED INSIGHTS ================= */}

      <div
        className="
          bg-[#111827]
          border
          border-white/10
          rounded-3xl
          p-8
        "
      >

      <div
  className="
    bg-[#0F172A]
    rounded-2xl
    p-5
    border
    border-white/5
  "
>

  <p className="text-gray-400 text-sm">
    QR Scans
  </p>

  <div
  className="
    bg-[#0F172A]
    rounded-2xl
    p-5
    border
    border-white/5
  "
>
  <p className="text-gray-400 text-sm">
    A/B Test Winner
  </p>

  <h3 className="text-purple-400 text-2xl font-black mt-3">
    {analytics?.abTesting?.length
      ? analytics.abTesting[0]?.winner
      : "No Data"}
  </h3>
</div>

  <h3
    className="
      text-yellow-400
      text-3xl
      font-black
      mt-3
    "
  >
    {analytics?.totalQrScans || 0}
  </h3>

</div>

        <div className="mb-6">

          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            Startup Growth Insights
          </h2>

          <p className="text-gray-400 mt-2">
            AI powered growth intelligence
          </p>

        </div>

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
          "
        >

          <div
            className="
              bg-[#0F172A]
              rounded-2xl
              p-5
              border
              border-white/5
            "
          >

            <p className="text-gray-400 text-sm">
              Top Performing Link
            </p>

            <h3
              className="
                text-green-400
                font-bold
                mt-3
                break-all
              "
            >
              {topLink?.shortId ||
                "No Data"}
            </h3>

            <p className="text-white mt-2">
              {topLink?.clicks || 0}
              {" "}
              clicks
            </p>

          </div>

          <div
            className="
              bg-[#0F172A]
              rounded-2xl
              p-5
              border
              border-white/5
            "
          >

            <p className="text-gray-400 text-sm">
              Needs Optimization
            </p>

            <h3
              className="
                text-red-400
                font-bold
                mt-3
                break-all
              "
            >
              {lowLink?.shortId ||
                "No Data"}
            </h3>

            <p className="text-white mt-2">
              {lowLink?.clicks || 0}
              {" "}
              clicks
            </p>

          </div>

          <div
            className="
              bg-[#0F172A]
              rounded-2xl
              p-5
              border
              border-white/5
            "
          >

            <p className="text-gray-400 text-sm">
              AI Optimization Score
            </p>

            <h3
              className="
                text-cyan-400
                text-3xl
                font-black
                mt-3
              "
            >
              92%
            </h3>

            <p className="text-white mt-2">
              Platform performing
              exceptionally well
            </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-3xl border border-gray-800 mt-6">

  <h2 className="text-xl font-bold mb-4">
    🔥 A/B Testing Results
  </h2>

  {analytics?.abTesting?.map((item) => (
    <div
      key={item.shortId}
      className="flex justify-between py-3"
    >
      <span>{item.shortId}</span>

      <span className="text-green-400">
        A: {item.variantA} | B: {item.variantB}
      </span>

      <span className="text-purple-400 font-bold">
        Winner: {item.winner}
      </span>
    </div>
  ))}


          </div>

        </div>

      </div>

    </div>
  );
}

<div
  className="
    bg-[#0F172A]
    rounded-2xl
    p-5
    border
    border-white/5
  "
>

  <p className="text-gray-400 text-sm">
    💰 Total Earnings
  </p>
</div>

