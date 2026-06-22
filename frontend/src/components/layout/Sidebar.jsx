import {
  LayoutDashboard,
  BarChart3,
  Users,
  CreditCard,
  User,
  Link2,
} from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
}) {

  const menus = [
    {
      id: "shortener",
      label: "Shortener",
      icon: <Link2 size={20} />,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart3 size={20} />,
    },
    {
      id: "teams",
      label: "Teams",
      icon: <Users size={20} />,
    },
    {
      id: "billing",
      label: "Billing",
      icon: <CreditCard size={20} />,
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User size={20} />,
    },
  ];

  return (
    <aside
      className="
        w-72
        min-h-screen
        bg-[#0B1220]
        border-r
        border-white/10
        flex
        flex-col
      "
    >

      {/* LOGO */}

      <div
        className="
          h-20
          flex
          items-center
          px-6
          border-b
          border-white/10
        "
      >

        <div
          className="
            w-11
            h-11
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            flex
            items-center
            justify-center
            text-white
            font-bold
            text-lg
          "
        >
          L
        </div>

        <div className="ml-3">

          <h1
            className="
              text-xl
              font-bold
              text-white
            "
          >
            LinkZip
          </h1>

          <p
            className="
              text-xs
              text-gray-400
            "
          >
            AI SaaS Platform
          </p>

        </div>

      </div>

      {/* MENU */}

      <div
        className="
          flex-1
          px-4
          py-6
        "
      >

        <p
          className="
            text-xs
            uppercase
            tracking-wider
            text-gray-500
            mb-4
            px-2
          "
        >
          Main Menu
        </p>

        <div className="space-y-2">

          {menus.map((menu) => (

            <button
              key={menu.id}
              onClick={() =>
                setActiveTab(menu.id)
              }
              className={`
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition-all
                duration-300

                ${
                  activeTab === menu.id
                    ? `
                      bg-gradient-to-r
                      from-cyan-500
                      to-blue-600
                      text-white
                      shadow-lg
                    `
                    : `
                      text-gray-300
                      hover:bg-white/5
                    `
                }
              `}
            >

              {menu.icon}

              <span
                className="
                  font-medium
                "
              >
                {menu.label}
              </span>

            </button>

          ))}

        </div>

      </div>

      {/* FOOTER */}

      <div
        className="
          border-t
          border-white/10
          p-5
        "
      >

        <div
          className="
            bg-[#111827]
            rounded-xl
            p-4
          "
        >

          <p
            className="
              text-sm
              text-gray-400
            "
          >
            Platform Status
          </p>

          <div
            className="
              flex
              items-center
              gap-2
              mt-2
            "
          >

            <div
              className="
                w-2
                h-2
                rounded-full
                bg-green-500
                animate-pulse
              "
            />

            <span
              className="
                text-green-400
                text-sm
                font-medium
              "
            >
              All Systems Online
            </span>

          </div>

        </div>

      </div>

    </aside>
  );
}