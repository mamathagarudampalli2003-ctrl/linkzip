import TeamOverviewCard from "../../components/teams/TeamOverviewCard";
import TeamActivityFeed from "../../components/teams/TeamActivityFeed";
import TeamAnalyticsCard from "../../components/teams/TeamAnalyticsCard";
import TopTeamLinks from "../../components/teams/TopTeamLinks";

export default function TeamsSection({
  teams,
  teamId,
  setTeamId,
  teamLinks,
  currentRole,
  memberEmail,
  setMemberEmail,
  handleAddMember,
  handleInviteMember,
  teamTab,
  setTeamTab,
  newTeamName,
  setNewTeamName,
  invitations,
  handleCreateTeam,
  handleRemoveMember,
  handleChangeRole,
  handleResendInvite,
  handleCancelInvite,
  handleCopy,
  handleDelete,
  fetchTeamLinks,
  activities,
  fetchActivities,
  
}) {

  const selectedTeam =
  teams.find(
    (t) => t._id === teamId
  );

  console.log(
  "CURRENT ROLE:",
  currentRole
);

  return (
    <div className="bg-gray-900 p-6 rounded-xl">

      {/* HEADER */}
      <h2 className="text-2xl font-bold mb-4 text-blue-400">
        👥 Teams Dashboard
      </h2>

      {/* SELECTED TEAM */}
      {teamId && (
        <h3 className="text-lg font-semibold text-blue-300 mb-4">
          Selected Team:
          {" "}
          {teams.find((t) => t._id === teamId)?.name}
        </h3>
      )}

      {/* CREATE TEAM */}
      <div className="mb-6 flex gap-3">

        <input
          type="text"
          placeholder="Enter team name..."
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          className="p-3 rounded bg-gray-800 border border-gray-700 flex-1"
        />

        <button
  onClick={() =>
    handleCreateTeam(newTeamName)
  }
  className="bg-blue-500 px-4 py-2 rounded"
>
  ➕ Create Team
</button>

      </div>

      {/* TEAM LIST */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">

        {teams.length === 0 ? (
          <p className="text-gray-400">
            No teams found
          </p>
        ) : (
          teams.map((team) => (
            <div
              key={team._id}
              onClick={() => {
                setTeamId(team._id);
              }}
              className={`p-4 rounded cursor-pointer border transition ${
                teamId === team._id
                  ? "bg-blue-600 border-blue-400"
                  : "bg-gray-800 border-gray-700 hover:bg-gray-700"
              }`}
            >
              <h3 className="font-bold text-lg">
                {team.name}
              </h3>

              <p className="text-sm text-gray-300">
                Members:
                {" "}
                {team.members?.length || 0}
              </p>
            </div>
          ))
        )}

      </div>

      {teamId && selectedTeam && (

  <TeamOverviewCard
    team={selectedTeam}
    links={teamLinks}
  />

)}

{teamId && (

  <TeamAnalyticsCard
    teamLinks={teamLinks}
  />

)}

      {/* ADD MEMBER */}
      {teamId && (
        <div className="mb-5 flex gap-3">

          <input
            type="text"
            placeholder="Enter member email..."
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
            className="p-2 rounded bg-gray-800 border border-gray-700 flex-1"
          />

          <button
  onClick={() => {

    console.log(
      "TEAM:",
      teamId
    );

    console.log(
      "EMAIL:",
      memberEmail
    );

    handleInviteMember(
      teamId,
      memberEmail,
      "member"
    );

  }}
  className="
    bg-green-500
    px-4
    py-2
    rounded
  "
>
  📨 Send Invite
</button>

        </div>
      )}

{/* TEAM OVERVIEW */}

{teamId && (

  <div className="grid md:grid-cols-4 gap-4 mb-6">

    <div className="bg-gray-800 p-5 rounded-xl">
      <p className="text-gray-400 text-sm">
        Team Links
      </p>

      <h2 className="text-3xl font-bold text-blue-400">
        {teamLinks.length}
      </h2>
    </div>

    <div className="bg-gray-800 p-5 rounded-xl">
      <p className="text-gray-400 text-sm">
        Total Clicks
      </p>

      <h2 className="text-3xl font-bold text-green-400">
        {
          teamLinks.reduce(
            (total, link) =>
              total + (link.clicks || 0),
            0
          )
        }
      </h2>
    </div>

    <div className="bg-gray-800 p-5 rounded-xl">
      <p className="text-gray-400 text-sm">
        Members
      </p>

      <h2 className="text-3xl font-bold text-purple-400">
        {
          teams.find(
            (t) => t._id === teamId
          )?.members?.length || 0
        }
      </h2>
    </div>

    <div className="bg-gray-800 p-5 rounded-xl">
      <p className="text-gray-400 text-sm">
        Avg Clicks
      </p>

      <h2 className="text-3xl font-bold text-yellow-400">
        {
          teamLinks.length > 0
            ? Math.round(
                teamLinks.reduce(
                  (total, link) =>
                    total + (link.clicks || 0),
                  0
                ) / teamLinks.length
              )
            : 0
        }
      </h2>
    </div>

  </div>

)}

{teamId &&
 teamLinks.length > 0 && (

  <div className="bg-gray-800 p-5 rounded-xl mb-6">

    <h3 className="text-lg font-bold text-green-400 mb-3">
      🏆 Top Performing Link
    </h3>

    {(() => {

      const topLink =
        [...teamLinks].sort(
          (a, b) =>
            (b.clicks || 0) -
            (a.clicks || 0)
        )[0];

      return (

        <div>

          <p className="text-gray-300 break-all">
            {topLink.originalUrl}
          </p>

          <p className="text-green-400 mt-2">
            {topLink.clicks} Clicks
          </p>

        </div>

      );

    })()}

  </div>

)}

{teamId && (

       <TeamActivityFeed
  teamLinks={teamLinks}
  activities={activities}
  team={
    selectedTeam
  }
/>
)
}
{/* TEAM TABS */}      
    {teamId && (       
       <div className="flex gap-4 mb-5">

          <button
            onClick={() => setTeamTab("members")}
            className={`px-4 py-2 rounded ${
              teamTab === "members"
                ? "bg-blue-600"
                : "bg-gray-700"
            }`}
          >
            👥 Members
          </button>

          <button
            onClick={() => setTeamTab("links")}
            className={`px-4 py-2 rounded ${
              teamTab === "links"
                ? "bg-blue-600"
                : "bg-gray-700"
            }`}
          >
            🔗 Links
          </button>

        </div>
      )}

      {/* MEMBERS TAB */}
      {teamId && teamTab === "members" && (
        <div className="bg-gray-800 p-5 rounded-xl">

          <h3 className="text-lg font-bold mb-4 text-green-400">
            👥 Team Members
          </h3>

          {teams
            .find((t) => t._id === teamId)
            ?.members.map((member) => (
              <div
                key={member.user._id}
                className="flex justify-between items-center bg-gray-900 p-3 rounded mb-2"
              >

                <div>
                  <p className="font-semibold">
                    {member.user?.username}
                  </p>

                  <p className="text-xs text-gray-400">
                    {member.user?.email}
                  </p>
                </div>

                <div className="flex gap-2 items-center">

                  <span className="text-xs bg-blue-600 px-2 py-1 rounded">
                    {member.role}
                  </span>

                  {true && (
                    <>
                      <select
                        value={member.role}
                        onChange={(e) =>
                          handleChangeRole(
                            member.user._id,
                            e.target.value
                          )
                        }
                        className="bg-gray-700 text-xs p-1 rounded"
                      >
                        <option value="member">
                          Member
                        </option>

                        <option value="admin">
                          Admin
                        </option>
                      </select>

                      <button
                        onClick={() =>
                          handleRemoveMember(member.user._id)
                        }
                        className="bg-red-500 px-2 py-1 rounded text-xs"
                      >
                        Remove
                      </button>
                    </>
                  )}

                </div>
              </div>
            ))}
        </div>
      )}

{teamId && (

  <TopTeamLinks
    teamLinks={teamLinks}
  />
)}

<div className="mt-6 bg-gray-800 p-5 rounded-xl">

  <h3 className="text-lg font-bold text-yellow-400 mb-4">
    📨 Pending Invitations
  </h3>

  {invitations?.length === 0 ? (

    <p className="text-gray-400">
      No Pending Invites
    </p>

  ) : (

    invitations.map((invite) => (

      <div
        key={invite._id}
        className="
          flex
          justify-between
          items-center
          bg-gray-900
          p-3
          rounded-lg
          mb-2
        "
      >

        <div>

          <p>{invite.email}</p>

          <p className="text-sm text-gray-400">
            {invite.role}
          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() =>
              handleResendInvite(
                invite._id
              )
            }
            className="
              bg-blue-500
              px-3
              py-1
              rounded
            "
          >
            Resend
          </button>

          <button
            onClick={() =>
              handleCancelInvite(
                invite._id
              )
            }
            className="
              bg-red-500
              px-3
              py-1
              rounded
            "
          >
            Cancel
          </button>

        </div>

      </div>

    ))

  )}

</div>

      {/* LINKS TAB */}
      {teamId && teamTab === "links" && (
        <div className="bg-gray-800 p-5 rounded-xl">

          <h3 className="text-lg font-bold mb-4 text-blue-400">
            🔗 Team Links
          </h3>

          {teamLinks.length === 0 ? (
            <p className="text-gray-400">
              No links found
            </p>
          ) : (
            <table className="w-full bg-gray-900 rounded-lg overflow-hidden">

              <thead className="bg-gray-700">
                <tr>
                  <th className="p-3 text-left">
                    Original
                  </th>

                  <th className="p-3 text-left">
                    Short
                  </th>

                  <th className="p-3 text-center">
                    Clicks
                  </th>

                  <th className="p-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>

                {teamLinks.map((link) => {
                  const shortUrl =
                    `http://localhost:8000/api/url/r/${link.shortId}`;

                  return (
                    <tr
                      key={link._id}
                      className="border-t border-gray-700"
                    >

                      <td className="p-3 break-all">
                        {link.originalUrl}
                      </td>

                      <td className="p-3 text-blue-400 break-all">
                        {shortUrl}
                      </td>

                      <td className="p-3 text-center">
                        {link.clicks || 0}
                      </td>

                      <td className="p-3 text-center space-x-2">

                        <button
                          onClick={() => handleCopy(shortUrl)}
                          className="bg-green-500 px-2 py-1 rounded"
                        >
                          Copy
                        </button>

                        <button
                          onClick={() => handleDelete(link._id)}
                          className="bg-red-500 px-2 py-1 rounded"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>
          )}
          </div>
          )}
      
    </div>
  );
}