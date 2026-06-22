export default function TeamMembers({
  teams,
  teamId,
  currentRole,
  handleRemoveMember,
  handleChangeRole,
}) {

  const selectedTeam = teams.find(
    (t) => t._id === teamId
  );

  if (!selectedTeam) {
    return (
      <div className="
        bg-[#111827]
        border
        border-white/10
        rounded-3xl
        p-12
        text-center
      ">

        <div className="text-6xl mb-4">
          👥
        </div>

        <h2 className="
          text-2xl
          font-bold
          text-white
        ">
          No Team Selected
        </h2>

        <p className="
          text-gray-400
          mt-3
        ">
          Select a workspace to manage members and permissions
        </p>

      </div>
    );
  }

  return (

    <div className="
      bg-[#111827]
      border
      border-white/10
      rounded-3xl
      p-6
      shadow-2xl
    ">

      {/* HEADER */}

      <div className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
        mb-8
      ">

        <div>

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
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
              shadow-xl
            ">
              👥
            </div>

            <div>

              <h2 className="
                text-3xl
                font-bold
                text-white
              ">
                Team Members
              </h2>

              <p className="
                text-gray-400
                mt-1
              ">
                Manage workspace permissions and collaboration
              </p>

            </div>

          </div>

        </div>

        {/* MEMBER COUNT */}

        <div className="
          bg-gradient-to-r
          from-blue-500/20
          to-purple-500/20
          border
          border-white/10
          px-5
          py-4
          rounded-2xl
        ">

          <p className="
            text-gray-400
            text-sm
          ">
            Active Members
          </p>

          <h3 className="
            text-3xl
            font-bold
            text-white
            mt-1
          ">
            {selectedTeam.members?.length || 0}
          </h3>

        </div>

      </div>

      {/* MEMBER LIST */}

      <div className="space-y-5">

        {selectedTeam.members?.map(
          (member, index) => (

            <div
              key={
  member.user?._id ||
  Math.random()
}
              className="
                bg-white/5
                border
                border-white/10
                rounded-3xl
                p-5
                hover:border-blue-500/40
                transition-all
                duration-300
                hover:shadow-xl
                hover:shadow-blue-500/5
              "
            >

              <div className="
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-5
              ">

                {/* LEFT */}

                <div className="
                  flex
                  items-center
                  gap-5
                ">

                  {/* AVATAR */}

                  <div className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-500
                    to-purple-600
                    flex
                    items-center
                    justify-center
                    text-2xl
                    font-bold
                    text-white
                    shadow-xl
                  ">

                    {
                      member.user?.username?.[0]
                      || "U"
                    }

                  </div>

                  {/* INFO */}

                  <div>

                    <div className="
                      flex
                      items-center
                      gap-3
                      flex-wrap
                    ">

                      <h3 className="
                        text-xl
                        font-bold
                        text-white
                      ">
                        {member.user?.username}
                      </h3>

                      {/* ROLE BADGE */}

                      <div className={`
                        px-3
                        py-1
                        rounded-xl
                        text-xs
                        font-semibold
                        ${
                          member.role === "owner"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : member.role === "admin"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-gray-700 text-gray-300"
                        }
                      `}>

                        {member.role === "owner"
                          ? "👑 OWNER"
                          : member.role === "admin"
                          ? "⚡ ADMIN"
                          : "👤 MEMBER"}

                      </div>

                    </div>

                    <p className="
                      text-gray-400
                      mt-2
                    ">
                      {member.user?.email}
                    </p>

                    <div className="
                      flex
                      items-center
                      gap-4
                      mt-3
                      text-sm
                    ">

                      <span className="
                        text-green-400
                      ">
                        ● Active
                      </span>

                      <span className="
                        text-gray-500
                      ">
                        Workspace Member
                      </span>

                    </div>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                  lg:items-center
                ">

                  {/* ROLE SELECT */}

                  <select
                    value={member.role}
                    onChange={(e) =>
                      handleChangeRole(
                        member.user._id,
                        e.target.value
                      )
                    }
                    disabled={
                      currentRole !== "owner"
                    }
                    className="
                      bg-[#1F2937]
                      border
                      border-white/10
                      rounded-2xl
                      px-4
                      py-3
                      text-white
                      outline-none
                      focus:border-blue-500
                      transition
                    "
                  >

                    <option value="member">
                      Member
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                  </select>

                  {/* REMOVE */}

                  {currentRole === "owner" &&
                    member.role !== "owner" && (

                    <button
                      onClick={() =>
                        handleRemoveMember(
                          member.user._id
                        )
                      }
                      className="
                        bg-red-500/20
                        hover:bg-red-500
                        border
                        border-red-500/30
                        text-red-400
                        hover:text-white
                        px-5
                        py-3
                        rounded-2xl
                        font-semibold
                        transition-all
                        duration-300
                      "
                    >
                      Remove
                    </button>

                  )}

                </div>

              </div>

              {/* PERFORMANCE */}

              <div
  className="
    mt-4
    bg-[#0F172A]
    border
    border-white/5
    rounded-2xl
    p-4
  "
>

  <p className="text-gray-400 text-sm">
    Workspace Role
  </p>

  <h4
    className="
      text-white
      text-lg
      font-semibold
      mt-2
    "
  >
    {member.role}
  </h4>

</div>

                <div className="
                  bg-[#0F172A]
                  rounded-2xl
                  p-4
                  border
                  border-white/5
                ">

                  <p className="
                    text-gray-400
                    text-xs
                  ">
                    Clicks
                  </p>

                  <h4 className="
                    text-white
                    text-xl
                    font-bold
                    mt-2
                  ">
                    {320 + index * 21}
                  </h4>

                </div>

                <div className="
                  bg-[#0F172A]
                  rounded-2xl
                  p-4
                  border
                  border-white/5
                ">

                  <p className="
                    text-gray-400
                    text-xs
                  ">
                    AI Score
                  </p>

                  <h4 className="
                    text-green-400
                    text-xl
                    font-bold
                    mt-2
                  ">
                    98%
                  </h4>

                </div>

                <div className="
                  bg-[#0F172A]
                  rounded-2xl
                  p-4
                  border
                  border-white/5
                ">

                  <p className="
                    text-gray-400
                    text-xs
                  ">
                    Status
                  </p>

                  <h4 className="
                    text-blue-400
                    text-xl
                    font-bold
                    mt-2
                  ">
                    Online
                  </h4>

                </div>

              </div>

          )
        )}

      </div>

    </div>

  );
}