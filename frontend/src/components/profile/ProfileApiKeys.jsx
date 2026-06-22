export default function ProfileApiKeys() {

  return (

    <div className="
      bg-[#111827]
      border border-white/10
      rounded-3xl
      p-6
      shadow-2xl
    ">

      <div className="
        flex justify-between items-center
      ">

        <h2 className="
          text-2xl
          font-bold
          text-white
        ">
          🔑 API Access
        </h2>

        <button
          className="
            bg-blue-600
            hover:bg-blue-700
            px-4 py-2
            rounded-xl
          "
        >
          Generate
        </button>

      </div>

      <div className="
        mt-6
        bg-[#1f2937]
        p-4
        rounded-2xl
      ">

        <p className="
          text-gray-400
          text-sm
        ">
          Production API Key
        </p>

        <div className="
          flex justify-between items-center
          mt-3
        ">

          <code className="
            text-green-400
            break-all
          ">
            sk_live_x8sj2jshd82j
          </code>

          <button
            className="
              bg-gray-700
              hover:bg-gray-600
              px-4 py-2
              rounded-xl
            "
          >
            Copy
          </button>

        </div>

      </div>

    </div>
  );
}