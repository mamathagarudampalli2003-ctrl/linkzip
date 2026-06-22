export default function ProfileAiSettings() {

  return (

    <div className="
      bg-gradient-to-r
      from-purple-600
      to-blue-600
      rounded-3xl
      p-8
      shadow-2xl
    ">

      <div className="
        flex flex-col md:flex-row
        justify-between
        items-center
        gap-6
      ">

        <div>

          <h2 className="
            text-3xl
            font-bold
            text-white
          ">
            🤖 AI Optimization Engine
          </h2>

          <p className="
            text-white/80
            mt-3
            max-w-2xl
          ">
            Enable intelligent traffic routing,
            smart analytics predictions,
            and automated performance optimization.
          </p>

        </div>

        <button
          className="
            bg-white
            text-black
            px-6 py-3
            rounded-2xl
            font-bold
          "
        >
          AI Enabled ⚡
        </button>

      </div>

    </div>
  );
}