import React from "react";

import {
  Menu,
} from "lucide-react";

export default function Topbar({
  setOpenSidebar,
}) {

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "/login";
  };

  return (

    <header
      className="
        h-[75px]
        bg-[#111827]
        border-b
        border-gray-800
        px-4
        md:px-8
        flex
        items-center
        justify-between
        sticky
        top-0
        z-40
      "
    >

      {/* LEFT */}

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        {/* MOBILE MENU */}

        <button
          onClick={() =>
            setOpenSidebar(true)
          }
          className="
            md:hidden
            text-white
          "
        >
          <Menu size={28} />
        </button>

        <div>

          <h1
            className="
              text-xl
              md:text-3xl
              font-black
              text-blue-400
            "
          >
            LinkZip 🚀
          </h1>

          <p
            className="
              hidden
              md:block
              text-gray-400
              text-sm
            "
          >
            AI Powered Smart Link Platform
          </p>

        </div>

      </div>

      {/* RIGHT */}

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        {/* PLAN */}

        <div
          className={`
            hidden
            sm:block
            px-3
            py-2
            rounded-xl
            text-sm
            font-semibold
            ${
              user.plan === "pro"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-gray-700 text-gray-300"
            }
          `}
        >
          {user.plan === "pro"
            ? "👑 Pro"
            : "🆓 Free"}
        </div>

        {/* USER */}

        <div
          className="
            flex
            items-center
            gap-2
            bg-gray-800
            px-3
            py-2
            rounded-xl
          "
        >

          <div
            className="
              w-9
              h-9
              rounded-full
              bg-blue-600
              flex
              items-center
              justify-center
              font-bold
            "
          >
            {
              user?.username
                ?.charAt(0)
                ?.toUpperCase() || "U"
            }
          </div>

          <div
            className="
              hidden
              lg:block
            "
          >

            <p
              className="
                text-white
                font-semibold
              "
            >
              {user.username || "User"}
            </p>

            <p
              className="
                text-xs
                text-gray-400
              "
            >
              {user.email}
            </p>

          </div>

        </div>

        {/* UPGRADE */}

        {user.plan !== "pro" && (

          <button
            className="
              hidden
              md:block
              bg-gradient-to-r
              from-purple-600
              to-blue-600
              text-white
              px-4
              py-2
              rounded-xl
              font-semibold
              hover:scale-105
              transition
            "
          >
            Upgrade 🚀
          </button>

        )}

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="
            bg-red-500
            hover:bg-red-600
            px-4
            py-2
            rounded-xl
            text-sm
            font-semibold
          "
        >
          Logout
        </button>

      </div>

    </header>

  );
}