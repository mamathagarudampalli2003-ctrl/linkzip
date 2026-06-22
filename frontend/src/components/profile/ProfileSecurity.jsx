export default function ProfileSecurity() {

  return (

    <div className="
      bg-[#111827]
      border border-white/10
      rounded-3xl
      p-6
      shadow-2xl
    ">

      <h2 className="
        text-2xl
        font-bold
        text-white
      ">
        🔒 Security Settings
      </h2>

      <div className="
        mt-6
        space-y-5
      ">

        <div className="
          flex justify-between items-center
          bg-[#1f2937]
          p-4
          rounded-2xl
        ">

          <div>
            <p className="font-semibold">
              Two Factor Authentication
            </p>

            <p className="text-sm text-gray-400">
              Secure your account
            </p>
          </div>

          <button
            className="
              bg-green-500/20
              text-green-400
              px-4 py-2
              rounded-xl
            "
          >
            Enabled
          </button>

        </div>

        <div className="
          flex justify-between items-center
          bg-[#1f2937]
          p-4
          rounded-2xl
        ">

          <div>
            <p className="font-semibold">
              Password
            </p>

            <p className="text-sm text-gray-400">
              Last changed 7 days ago
            </p>
          </div>

          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              px-4 py-2
              rounded-xl
            "
          >
            Change
          </button>

        </div>

      </div>

    </div>
  );
}