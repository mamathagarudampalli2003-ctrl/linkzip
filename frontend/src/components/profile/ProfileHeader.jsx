export default function ProfileHeader({
  user,
}) {

  return (

    <div className="
      bg-[#111827]
      border border-white/10
      rounded-3xl
      p-8
      shadow-2xl
    ">

      <div className="
        flex flex-col md:flex-row
        items-center
        justify-between
        gap-6
      ">

        <div className="flex items-center gap-5">

          <img
            src={user.avatar}
            alt="avatar"
            className="
              w-24 h-24
              rounded-full
              border-4
              border-blue-500
            "
          />

          <div>

            <h1 className="
              text-3xl
              font-bold
              text-white
            ">
              {user.name}
            </h1>

            <p className="text-gray-400 mt-2">
              {user.email}
            </p>

            <div className="
              mt-4
              inline-flex
              items-center
              px-4 py-2
              rounded-xl
              bg-gradient-to-r
              from-blue-500
              to-purple-600
              text-white
              text-sm
              font-semibold
            ">
              🚀 {user.plan} Plan
            </div>

          </div>

        </div>

        <button
          className="
            bg-blue-600
            hover:bg-blue-700
            px-6 py-3
            rounded-2xl
            text-white
            font-semibold
          "
        >
          Edit Profile
        </button>

      </div>

    </div>
  );
}