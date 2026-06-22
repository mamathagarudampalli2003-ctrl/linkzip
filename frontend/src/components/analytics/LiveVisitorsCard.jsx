export default function LiveVisitorsCard({
  liveVisitors,
}) {

  return (

    <div
      className="
        bg-gradient-to-br
        from-orange-500
        to-red-600
        rounded-3xl
        p-7
        shadow-2xl
      "
    >

      <p className="text-white/70 text-sm">
        Live Traffic
      </p>

      <h2
        className="
          text-6xl
          font-black
          text-white
          mt-4
        "
      >
        {liveVisitors}
      </h2>

      <div
        className="
          flex
          items-center
          gap-3
          mt-6
        "
      >

        <div
          className="
            w-3
            h-3
            rounded-full
            bg-green-400
            animate-pulse
          "
        />

        <span className="text-white">
          Real-time visitors
        </span>

      </div>

    </div>
  );
}