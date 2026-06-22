export default function AiInsightsPanel({
  topLink,
  lowLink,
  aiSuggestion,
  avgClicks,
  totalClicks,
}) {
  return (
    <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800">

      <h3 className="text-xl font-bold mb-4 text-purple-400">
        🤖 AI Performance Insights
      </h3>

      <div className="grid md:grid-cols-3 gap-4">

        {/* BEST LINK */}
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">
            Best Performing Link
          </p>

          <p className="text-green-400 break-all mt-2">
            {topLink?.shortId || "No data"}
          </p>
        </div>

        {/* LOW LINK */}
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">
            Low Performance Link
          </p>

          <p className="text-red-400 break-all mt-2">
            {lowLink?.shortId || "None"}
          </p>
        </div>

        {/* AI SUGGESTION */}
        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-sm">
            AI Suggestion
          </p>

          <p className="text-blue-400 mt-2">
            {aiSuggestion || "No suggestion"}
          </p>
        </div>

      </div>

      {/* EXTRA STATS */}
      <div className="grid md:grid-cols-2 gap-4 mt-5">

        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-sm text-gray-400">
            Average Clicks
          </p>

          <p className="text-2xl font-bold text-yellow-400">
            {avgClicks || 0}
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl">
          <p className="text-sm text-gray-400">
            Total Clicks
          </p>

          <p className="text-2xl font-bold text-green-400">
            {totalClicks || 0}
          </p>
        </div>

      </div>

    </div>
  );
}