import {
  User,
  Shield,
  Crown,
  Activity,
  Mail,
  Calendar,
} from "lucide-react";

export default function ProfileSection() {

  // ================= SAFE USER =================

  let user = {};

  try {

    const storedUser =
      localStorage.getItem("user");

    user =
      storedUser &&
      storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : {};

  } catch (error) {

    console.error(
      "Invalid user JSON",
      error
    );

    user = {};
  }

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}

      <div className="
        bg-gradient-to-r
        from-blue-600
        to-purple-600
        p-6
        rounded-2xl
        shadow-lg
      ">

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          gap-5
        ">

          {/* AVATAR */}

          <div className="
            w-24
            h-24
            rounded-full
            bg-white/20
            flex
            items-center
            justify-center
          ">

            <User
              size={42}
              className="text-white"
            />

          </div>

          {/* INFO */}

          <div>

            <h1 className="
              text-3xl
              font-bold
              text-white
            ">
              {user.username ||
                "User"}
            </h1>

            <p className="
              text-gray-200
              mt-2
              flex
              items-center
              gap-2
              break-all
            ">

              <Mail size={16} />

              {user.email ||
                "No Email"}

            </p>

          </div>

        </div>

      </div>

      {/* ================= STATS ================= */}

      <div className="
        grid
        md:grid-cols-3
        gap-5
      ">

        {/* ACCOUNT */}

        <div className="
          bg-gray-900
          border
          border-gray-800
          p-5
          rounded-2xl
        ">

          <div className="
            flex
            items-center
            gap-3
            mb-4
          ">

            <div className="
              bg-green-500/20
              p-3
              rounded-xl
            ">

              <Shield className="
                text-green-400
              " />

            </div>

            <div>

              <p className="
                text-gray-400
                text-sm
              ">
                Account Status
              </p>

              <h3 className="
                text-xl
                font-bold
                text-white
              ">
                Active
              </h3>

            </div>

          </div>

          <p className="
            text-gray-500
            text-sm
          ">
            Your account is secure
            and verified.
          </p>

        </div>

        {/* PLAN */}

        <div className="
          bg-gray-900
          border
          border-gray-800
          p-5
          rounded-2xl
        ">

          <div className="
            flex
            items-center
            gap-3
            mb-4
          ">

            <div className="
              bg-yellow-500/20
              p-3
              rounded-xl
            ">

              <Crown className="
                text-yellow-400
              " />

            </div>

            <div>

              <p className="
                text-gray-400
                text-sm
              ">
                Current Plan
              </p>

              <h3 className="
                text-xl
                font-bold
                text-white
              ">
                Free Plan
              </h3>

            </div>

          </div>

          <p className="
            text-gray-500
            text-sm
          ">
            Upgrade for premium AI
            analytics features.
          </p>

        </div>

        {/* ACTIVITY */}

        <div className="
          bg-gray-900
          border
          border-gray-800
          p-5
          rounded-2xl
        ">

          <div className="
            flex
            items-center
            gap-3
            mb-4
          ">

            <div className="
              bg-blue-500/20
              p-3
              rounded-xl
            ">

              <Activity className="
                text-blue-400
              " />

            </div>

            <div>

              <p className="
                text-gray-400
                text-sm
              ">
                Activity
              </p>

              <h3 className="
                text-xl
                font-bold
                text-white
              ">
                Online
              </h3>

            </div>

          </div>

          <p className="
            text-gray-500
            text-sm
          ">
            Workspace currently active.
          </p>

        </div>

      </div>

      {/* ================= USER INFO ================= */}

      <div className="
        bg-gray-900
        border
        border-gray-800
        p-6
        rounded-2xl
      ">

        <h2 className="
          text-2xl
          font-bold
          text-blue-400
          mb-6
        ">
          👤 User Information
        </h2>

        <div className="
          grid
          md:grid-cols-2
          gap-5
        ">

          {/* USERNAME */}

          <div className="
            bg-gray-800
            p-4
            rounded-xl
          ">

            <p className="
              text-sm
              text-gray-400
              mb-1
            ">
              Username
            </p>

            <p className="
              text-white
              font-semibold
            ">
              {user.username ||
                "No Username"}
            </p>

          </div>

          {/* EMAIL */}

          <div className="
            bg-gray-800
            p-4
            rounded-xl
          ">

            <p className="
              text-sm
              text-gray-400
              mb-1
            ">
              Email
            </p>

            <p className="
              text-white
              font-semibold
              break-all
            ">
              {user.email ||
                "No Email"}
            </p>

          </div>

          {/* USER ID */}

          <div className="
            bg-gray-800
            p-4
            rounded-xl
          ">

            <p className="
              text-sm
              text-gray-400
              mb-1
            ">
              User ID
            </p>

            <p className="
              text-white
              font-semibold
              break-all
            ">
              {user._id ||
                user.id ||
                "N/A"}
            </p>

          </div>

          {/* JOINED */}

          <div className="
            bg-gray-800
            p-4
            rounded-xl
          ">

            <p className="
              text-sm
              text-gray-400
              mb-1
              flex
              items-center
              gap-2
            ">

              <Calendar size={16} />

              Joined

            </p>

            <p className="
              text-white
              font-semibold
            ">
              2026
            </p>

          </div>

        </div>

      </div>

      {/* ================= SECURITY ================= */}

      <div className="
        bg-gray-900
        border
        border-gray-800
        p-6
        rounded-2xl
      ">

        <h2 className="
          text-2xl
          font-bold
          text-purple-400
          mb-5
        ">
          🔐 Security
        </h2>

        <div className="
          space-y-4
        ">

          <div className="
            bg-gray-800
            p-4
            rounded-xl
            flex
            justify-between
            items-center
          ">

            <div>

              <p className="
                font-semibold
                text-white
              ">
                JWT Authentication
              </p>

              <p className="
                text-sm
                text-gray-400
              ">
                Secure login enabled
              </p>

            </div>

            <span className="
              bg-green-500/20
              text-green-400
              px-3
              py-1
              rounded-full
              text-sm
            ">
              Enabled
            </span>

          </div>

          <div className="
            bg-gray-800
            p-4
            rounded-xl
            flex
            justify-between
            items-center
          ">

            <div>

              <p className="
                font-semibold
                text-white
              ">
                Team Access
              </p>

              <p className="
                text-sm
                text-gray-400
              ">
                Role-based access active
              </p>

            </div>

            <span className="
              bg-green-500/20
              text-green-400
              px-3
              py-1
              rounded-full
              text-sm
            ">
              Active
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}