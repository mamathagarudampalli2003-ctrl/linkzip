import {
  Link2,
  BarChart3,
  Users,
  CreditCard,
  User,
  X,
} from "lucide-react";

export default function MobileSidebar({
  openSidebar,
  setOpenSidebar,
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

  if (!openSidebar) return null;

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/60
        backdrop-blur-sm
        md:hidden
      "
    >

      <div
        className="
          w-72
          h-full
          bg-[#0B1220]
          border-r
          border-white/10
          flex
          flex-col
        "
      >

        {/* HEADER */}

        <div
          className="
            h-20
            px-6
            flex
            items-center
            justify-between
            border-b
            border-white/10
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-black
                bg-gradient-to-r
                from-cyan-400
                to-blue-500
                bg-clip-text
                text-transparent
              "
            >
              LinkZip
            </h2>

            <p
              className="
                text-xs
                text-gray-500
              "
            >
              AI SaaS Platform
            </p>

          </div>

          <button
            onClick={() =>
              setOpenSidebar(false)
            }
            className="
              text-white
            "
          >
            <X size={24} />
          </button>

        </div>

        {/* MENUS */}

        <div
          className="
            flex-1
            p-4
          "
        >

          <div className="space-y-2">

            {menus.map((menu) => (

              <button

                key={menu.id}

                onClick={() => {

                  setActiveTab(
                    menu.id
                  );

                  setOpenSidebar(
                    false
                  );

                }}

                className={`

                  w-full

                  flex
                  items-center
                  gap-3

                  px-4
                  py-3

                  rounded-xl

                  transition-all

                  ${
                    activeTab === menu.id

                      ? `
                        bg-gradient-to-r
                        from-cyan-500
                        to-blue-600
                        text-white
                      `

                      : `
                        text-gray-300
                        hover:bg-white/5
                      `
                  }

                `}
              >

                {menu.icon}

                <span>
                  {menu.label}
                </span>

              </button>

            ))}

          </div>

        </div>

        {/* FOOTER */}

        <div
          className="
            p-4
            border-t
            border-white/10
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
                text-xs
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
                "
              >
                Online
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}