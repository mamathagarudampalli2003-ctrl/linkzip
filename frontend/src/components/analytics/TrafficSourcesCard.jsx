export default function TrafficSourcesCard({
  referrerStats,
}) {

  return (

    <div
      className="
        bg-[#111827]
        rounded-2xl
        p-6
        border
        border-white/10
      "
    >

      <h2
        className="
          text-xl
          font-bold
          text-white
          mb-6
        "
      >
        Traffic Sources
      </h2>

      {Object.entries(
        referrerStats || {}
      ).map(
        ([source, count]) => (

          <div
            key={source}
            className="
              flex
              justify-between
              py-3
              border-b
              border-white/5
            "
          >

            <span
              className="
                text-gray-300
              "
            >
              {source}
            </span>

            <span
              className="
                text-cyan-400
                font-semibold
              "
            >
              {count}
            </span>

          </div>

        )
      )}

    </div>

  );
}