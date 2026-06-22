export default function AiRecommendationCard({

  aiSuggestion,

  topLink,

  lowLink,

}) {

  return (

    <div
      className="
        bg-gradient-to-br
        from-purple-600
        via-pink-600
        to-indigo-600
        rounded-3xl
        p-7
        shadow-2xl
      "
    >

      <p className="text-white/70 text-sm">
        AI Optimization Engine
      </p>

      <h2
        className="
          text-3xl
          font-bold
          text-white
          mt-4
        "
      >
        Smart AiInsights 🤖
      </h2>

      <div className="mt-6 space-y-4">

        <div>

          <p className="text-white/70">
            Best Performer
          </p>

          <p className="text-white font-bold">
            {topLink?.shortId ||
              "N/A"}
          </p>

        </div>

        <div>

          <p className="text-white/70">
            Needs Attention
          </p>

          <p className="text-white font-bold">
            {lowLink?.shortId ||
              "N/A"}
          </p>

        </div>

        <div>

          <p className="text-white/70">
            Recommendation
          </p>

          <p className="text-white mt-2">
            {aiSuggestion}
          </p>

        </div>

      </div>

    </div>
  );
}