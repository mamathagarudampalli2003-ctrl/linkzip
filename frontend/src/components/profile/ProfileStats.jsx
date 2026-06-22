export default function ProfileStats({
  stats,
}) {

  const cards = [
    {
      title: "Total Links",
      value: stats.totalLinks,
      color:
        "from-blue-500 to-cyan-500",
      icon: "🔗",
    },

    {
      title: "Total Clicks",
      value: stats.totalClicks,
      color:
        "from-green-500 to-emerald-500",
      icon: "📈",
    },

    {
      title: "Teams",
      value: stats.teams,
      color:
        "from-purple-500 to-pink-500",
      icon: "👥",
    },

    {
      title: "AI Score",
      value: `${stats.aiScore}%`,
      color:
        "from-orange-500 to-yellow-500",
      icon: "🤖",
    },
  ];

  return (

    <div className="
      grid
      md:grid-cols-4
      gap-5
    ">

      {cards.map((card, index) => (

        <div
          key={index}
          className={`
            bg-gradient-to-br
            ${card.color}
            p-6
            rounded-3xl
            shadow-2xl
          `}
        >

          <div className="
            flex
            justify-between
            items-center
          ">

            <p className="
              text-white/80
              text-sm
            ">
              {card.title}
            </p>

            <span className="text-2xl">
              {card.icon}
            </span>

          </div>

          <h2 className="
            text-4xl
            font-bold
            text-white
            mt-6
          ">
            {card.value}
          </h2>

        </div>

      ))}

    </div>
  );
}