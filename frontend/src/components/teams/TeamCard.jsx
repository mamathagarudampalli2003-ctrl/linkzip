import React from "react";

export default function TeamCard({ team }) {

  return (

    <div className="
      relative
      overflow-hidden
      bg-[#111827]
      border
      border-white/10
      rounded-3xl
      p-6
      hover:border-blue-500/50
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-2xl
      hover:shadow-blue-500/10
      group
    ">

      {/* GLOW EFFECT */}

      <div className="
        absolute
        inset-0
        bg-gradient-to-br
        from-blue-500/5
        to-purple-500/5
        opacity-0
        group-hover:opacity-100
        transition
      " />

      {/* TOP SECTION */}

      <div className="
        relative
        flex
        justify-between
        items-start
      ">

        {/* LEFT */}

        <div>

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
            text-3xl
            shadow-xl
          ">
            🚀
          </div>

          <h2 className="
            text-2xl
            font-bold
            text-white
            mt-5
          ">
            {team?.name || "Unnamed Team"}
          </h2>

          <p className="
            text-gray-400
            text-sm
            mt-2
            leading-relaxed
            max-w-[300px]
          ">
            {team?.description ||
              "AI-powered collaboration workspace for smart link routing, analytics and SaaS operations."}
          </p>

        </div>

        {/* STATUS */}

        <div className="
          bg-green-500/20
          text-green-400
          px-3
          py-1
          rounded-xl
          text-xs
          font-semibold
          h-fit
        ">
          Active
        </div>

      </div>

      {/* STATS */}

      <div className="
        grid
        grid-cols-2
        gap-4
        mt-8
      ">

        {/* MEMBERS */}

        <div className="
          bg-white/5
          border
          border-white/10
          rounded-2xl
          p-4
          backdrop-blur-xl
        ">

          <div className="
            flex
            justify-between
            items-center
          ">

            <p className="
              text-gray-400
              text-sm
            ">
              Members
            </p>

            <div className="
              w-9
              h-9
              rounded-xl
              bg-blue-500/20
              flex
              items-center
              justify-center
            ">
              👥
            </div>

          </div>

          <h3 className="
            text-3xl
            font-bold
            text-white
            mt-4
          ">
            {team?.members?.length || 0}
          </h3>

          <p className="
            text-xs
            text-green-400
            mt-2
          ">
            +12% growth
          </p>

        </div>

        {/* LINKS */}

        <div className="
          bg-white/5
          border
          border-white/10
          rounded-2xl
          p-4
          backdrop-blur-xl
        ">

          <div className="
            flex
            justify-between
            items-center
          ">

            <p className="
              text-gray-400
              text-sm
            ">
              Smart Links
            </p>

            <div className="
              w-9
              h-9
              rounded-xl
              bg-purple-500/20
              flex
              items-center
              justify-center
            ">
              🔗
            </div>

          </div>

          <h3 className="
            text-3xl
            font-bold
            text-white
            mt-4
          ">
            {team?.links?.length ||
              team?.totalLinks ||
              0}
          </h3>

          <p className="
            text-xs
            text-blue-400
            mt-2
          ">
            AI optimized
          </p>

        </div>

      </div>

      {/* PERFORMANCE */}

      <div className="
        mt-6
        bg-gradient-to-r
        from-blue-500/10
        to-purple-500/10
        border
        border-white/10
        rounded-2xl
        p-4
      ">

        <div className="
          flex
          justify-between
          items-center
        ">

          <div>

            <p className="
              text-gray-400
              text-sm
            ">
              Team Performance
            </p>

            <h3 className="
              text-white
              text-xl
              font-bold
              mt-2
            ">
              {team?.performance || "+24%"}
            </h3>

          </div>

          <div className="
            text-green-400
            text-3xl
          ">
            📈
          </div>

        </div>

      </div>

      {/* MEMBERS AVATARS */}

      <div className="
        flex
        justify-between
        items-center
        mt-8
      ">

        <div className="flex -space-x-3">

          {team?.members
            ?.slice(0, 4)
            ?.map((member, index) => (

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
                {member?.name?.[0] || "U"}
              </div>

            ))}

        </div>

        <div className="
          text-blue-400
          text-sm
          font-semibold
          group-hover:translate-x-1
          transition
        ">
          Open Workspace →
        </div>

      </div>

      {/* FOOTER */}

      <div className="
        mt-6
        pt-5
        border-t
        border-white/10
        flex
        justify-between
        items-center
      ">

        <div className="
          text-sm
          text-gray-500
        ">

          Created:
          {" "}

          {team?.createdAt
            ? new Date(
                team.createdAt
              ).toLocaleDateString()
            : "Recently"}

        </div>

        <div className="
          bg-blue-500/10
          text-blue-400
          px-3
          py-1
          rounded-xl
          text-xs
        ">
          Enterprise Workspace
        </div>

      </div>

    </div>

  );
}