export default function AnalyticsHeader() {

  return (

    <div className="
      flex
      flex-col
      lg:flex-row
      justify-between
      lg:items-center
      gap-6
    ">

      <div>

        <div className="
          inline-flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          border
          border-cyan-500/20
          bg-cyan-500/10
          text-cyan-400
          text-xs
          font-semibold
          mb-4
        ">
          ● LIVE ANALYTICS ENGINE
        </div>

        <h1 className="
          text-4xl
          font-black
          text-white
        ">
          Analytics Center
        </h1>

        <p className="
          text-gray-400
          mt-3
        ">
          Real-time traffic intelligence and AI optimization.
        </p>

      </div>

      <div className="
        bg-gradient-to-r
        from-blue-600
        to-cyan-500
        px-6
        py-4
        rounded-2xl
      ">

        <p className="text-white/80 text-sm">
          Platform Status
        </p>

        <h2 className="
          text-2xl
          font-bold
          text-white
        ">
          Active ⚡
        </h2>

      </div>

    </div>
  );
}