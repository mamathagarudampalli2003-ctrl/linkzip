import {
  Link2,
  MousePointerClick,
  BarChart3,
  Activity,
  TrendingUp,
} from "lucide-react";

export default function StatsCards({
  totalLinks,
  totalClicks,
  avgClicks,
  liveVisitors,
}) {
  const cards = [
    {
      title: "Total Smart Links",
      value: totalLinks || 0,
      icon: Link2,
      gradient:
        "from-blue-600 via-cyan-500 to-sky-400",
      glow: "shadow-blue-500/30",
      change: "+12%",
      subtitle:
        "Links actively generating traffic",
    },

    {
      title: "Total Engagement",
      value: totalClicks || 0,
      icon: MousePointerClick,
      gradient:
        "from-emerald-500 via-green-500 to-lime-400",
      glow: "shadow-green-500/30",
      change: "+28%",
      subtitle:
        "Clicks across all campaigns",
    },

    {
      title: "Average CTR",
      value: avgClicks || 0,
      icon: BarChart3,
      gradient:
        "from-purple-600 via-fuchsia-500 to-pink-500",
      glow: "shadow-purple-500/30",
      change: "+9%",
      subtitle:
        "Average clicks per smart link",
    },

    {
      title: "Live Visitors",
      value: liveVisitors || 0,
      icon: Activity,
      gradient:
        "from-orange-500 via-amber-500 to-yellow-400",
      glow: "shadow-orange-500/30",
      change: "LIVE",
      subtitle:
        "Users currently interacting",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card, index) => {

        const Icon = card.icon;

        return (

          <div
            key={index}
            className={`
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-[#111827]
              p-6
              shadow-2xl
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:-translate-y-1
              ${card.glow}
            `}
          >

            {/* BACKGROUND GLOW */}

            <div
              className={`
                absolute
                top-0
                right-0
                h-32
                w-32
                rounded-full
                bg-gradient-to-br
                ${card.gradient}
                opacity-20
                blur-3xl
              `}
            />

            {/* TOP SECTION */}

            <div className="relative z-10 flex items-center justify-between">

              <div
                className={`
                  h-14
                  w-14
                  rounded-2xl
                  bg-gradient-to-br
                  ${card.gradient}
                  flex
                  items-center
                  justify-center
                  shadow-lg
                `}
              >
                <Icon size={26} className="text-white" />
              </div>

              <div className="
                flex
                items-center
                gap-1
                bg-white/5
                border
                border-white/10
                px-3
                py-1
                rounded-full
                text-xs
                text-green-400
                font-semibold
              ">
                <TrendingUp size={14} />
                {card.change}
              </div>

            </div>

            {/* VALUE */}

            <div className="relative z-10 mt-7">

              <h2 className="
                text-4xl
                font-black
                text-white
                tracking-tight
              ">
                {card.value}
              </h2>

              <p className="
                text-gray-300
                text-sm
                mt-3
                font-medium
              ">
                {card.title}
              </p>

              <p className="
                text-gray-500
                text-xs
                mt-2
                leading-relaxed
              ">
                {card.subtitle}
              </p>

            </div>

            {/* BOTTOM LINE */}

            <div
              className={`
                absolute
                bottom-0
                left-0
                h-1
                w-full
                bg-gradient-to-r
                ${card.gradient}
              `}
            />

          </div>
        );
      })}

    </div>
  );
}