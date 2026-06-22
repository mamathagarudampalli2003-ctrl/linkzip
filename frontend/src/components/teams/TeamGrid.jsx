export default function TeamGrid({
  teams,
  setSelectedTeam,
}) {

  return (

    <div>

      <div
        className="
          flex
          justify-between
          items-center
          mb-5
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-white
            "
          >
            Active Workspaces
          </h2>

          <p
            className="
              text-gray-400
              mt-1
            "
          >
            Click a workspace to manage collaboration
          </p>

        </div>

      </div>

      <div
        className="
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >

        {teams.map((team) => (

          <div
            key={team._id}
            onClick={() =>
              setSelectedTeam(team)
            }
            className="
              cursor-pointer
              group
            "
          >

            <div
              className="
                bg-[#111827]
                border
                border-white/10
                hover:border-blue-500/50
                rounded-3xl
                p-6
                transition
                hover:-translate-y-1
                hover:shadow-blue-500/20
                shadow-2xl
              "
            >

              {/* TOP */}

              <div
                className="
                  flex
                  justify-between
                  items-start
                "
              >

                <div>

                  <div
                    className="
                      w-14
                      h-14
                      rounded-2xl
                      bg-gradient-to-br
                      from-blue-500
                      to-purple-600
                      flex
                      items-center
                      justify-center
                      text-2xl
                    "
                  >
                    🚀
                  </div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                      text-white
                      mt-4
                    "
                  >
                    {team.name}
                  </h2>

                  <p
                    className="
                      text-gray-400
                      text-sm
                      mt-2
                    "
                  >
                    {team.description || "Team workspace for collaboration"}
                  </p>

                </div>

                <div
                  className="
                    bg-green-500/20
                    text-green-400
                    px-3
                    py-1
                    rounded-xl
                    text-sm
                  "
                >
                  Active
                </div>

              </div>

              {/* STATS */}

              <div
                className="
                  grid
                  grid-cols-3
                  gap-4
                  mt-8
                "
              >

                <div>

                  <p
                    className="
                      text-gray-500
                      text-sm
                    "
                  >
                    Members
                  </p>

                  <h3
                    className="
                      text-xl
                      font-bold
                      text-white
                      mt-1
                    "
                  >
                    {team.members.length}
                  </h3>

                </div>

                <div>

                  <p
                    className="
                      text-gray-500
                      text-sm
                    "
                  >
                    Links
                  </p>

                  <h3
                    className="
                      text-xl
                      font-bold
                      text-white
                      mt-1
                    "
                  >
                    0
                  </h3>

                </div>

                <div>

                  <p
                    className="
                      text-gray-500
                      text-sm
                    "
                  >
                    Projects
                  </p>

                  <h3
                    className="
                      text-xl
                      font-bold
                      text-white
                      mt-1
                    "
                  >
                    1
                  </h3>

                </div>

              </div>

              {/* MEMBERS */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mt-8
                "
              >

                <div
                  className="
                    flex
                    -space-x-3
                  "
                >

                  {team.members?.map(
                    (member, index) => (

                      <div
                        key={index}
                        className="
                          w-11
                          h-11
                          rounded-full
                          bg-gradient-to-br
                          from-blue-500
                          to-purple-600
                          border-2
                          border-[#111827]
                          flex
                          items-center
                          justify-center
                          text-sm
                          font-bold
                          text-white
                        "
                      >
                        {member.user?.username?.[0] || "U"}
                      </div>

                    )
                  )}

                </div>

                <div
                  className="
                    text-blue-400
                    text-sm
                    font-medium
                  "
                >
                  Open Workspace →
                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}