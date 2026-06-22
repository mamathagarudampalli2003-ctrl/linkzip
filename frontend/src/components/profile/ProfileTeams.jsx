export default function ProfileTeams() {

  const teams = [
    "Development Team",
    "Marketing Team",
    "AI Research",
  ];

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
        👥 Team Memberships
      </h2>

      <div className="
        mt-6
        space-y-4
      ">

        {teams.map((team, index) => (

          <div
            key={index}
            className="
              bg-[#1f2937]
              p-4
              rounded-2xl
              flex justify-between
              items-center
            "
          >

            <p>{team}</p>

            <span className="
              text-sm
              text-blue-400
            ">
              Active
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}