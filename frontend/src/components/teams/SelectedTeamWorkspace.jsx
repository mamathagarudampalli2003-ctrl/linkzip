import TeamMembers from "./TeamMembers";
import TeamLinks from "./TeamLinks";

export default function SelectedTeamWorkspace({
  selectedTeam,
}) {

  if (!selectedTeam) return null;

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div
        className="
          bg-[#111827]
          border
          border-white/10
          rounded-3xl
          p-6
          shadow-2xl
        "
      >

        <div
          className="
            flex
            justify-between
            items-center
          "
        >

          <div>

            <h2
              className="
                text-3xl
                font-bold
                text-white
              "
            >
              {selectedTeam.name}
            </h2>

            <p
  className="
    text-gray-400
    mt-2
  "
>
  {selectedTeam.description ||
    "No description available"}
</p>

          </div>

          <div
            className="
              bg-gradient-to-r
              from-blue-500
              to-purple-600
              px-5
              py-3
              rounded-2xl
              text-white
              font-semibold
            "
          >
            AI Collaboration Enabled
          </div>

          <div
  className="
    grid
    grid-cols-3
    gap-4
    mt-6
  "
>

  <div
    className="
      bg-[#1f2937]
      p-4
      rounded-xl
      text-center
    "
  >
    <p className="text-gray-400 text-sm">
      Members
    </p>

    <h3 className="text-white text-2xl font-bold">
      {selectedTeam.members?.length || 0}
    </h3>
  </div>

  <div
    className="
      bg-[#1f2937]
      p-4
      rounded-xl
      text-center
    "
  >
    <p className="text-gray-400 text-sm">
      Links
    </p>

    <h3 className="text-white text-2xl font-bold">
      {selectedTeam.links?.length || 0}
    </h3>
  </div>

  <div
    className="
      bg-[#1f2937]
      p-4
      rounded-xl
      text-center
    "
  >
    <p className="text-gray-400 text-sm">
      Clicks
    </p>

    <h3 className="text-white text-2xl font-bold">
      {selectedTeam.totalClicks || 0}
    </h3>
  </div>

</div>

        </div>

      </div>

      {/* CONTENT */}

      <div
        className="
          grid
          xl:grid-cols-2
          gap-6
        "
      >

        <div
          className="
            bg-[#111827]
            border
            border-white/10
            rounded-3xl
            p-6
          "
        >
          <TeamMembers
            team={selectedTeam}
          />
        </div>

        <div
          className="
            bg-[#111827]
            border
            border-white/10
            rounded-3xl
            p-6
          "
        >
          <TeamLinks
            team={selectedTeam}
          />
        </div>

      </div>

    </div>
  );
}