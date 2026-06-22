import { useEffect, useState } from "react";

import TeamOverviewCards from "../components/teams/TeamOverviewCards";
import TeamGrid from "../components/teams/TeamGrid";
import SelectedTeamWorkspace from "../components/teams/SelectedTeamWorkspace";
import InviteMembersModal from "../components/teams/InviteMembersModal";

import {
getTeams,
createTeam,
} from "../api/teamApi";

export default function Teams() {

const [teams, setTeams] =
useState([]);

const [selectedTeam, setSelectedTeam] =
useState(null);

const [showInviteModal, setShowInviteModal] =
useState(false);

const [loading, setLoading] =
useState(true);

const [newTeamName, setNewTeamName] =
useState("");

// ================= LOAD TEAMS =================

const loadTeams =
async () => {

  try {

    const token =
      localStorage.getItem(
        "token"
      );

    const data =
      await getTeams(
        token
      );

    setTeams(data);

  } catch (error) {

    console.log(
      "Load Teams Error:",
      error
    );

  } finally {

    setLoading(false);

  }
};

useEffect(() => {

loadTeams();

}, []);

// ================= CREATE TEAM =================

const handleCreateTeam =
async () => {

  try {

    if (
      !newTeamName.trim()
    ) {
      return;
    }

    const token =
      localStorage.getItem(
        "token"
      );

    console.log("Creating Team:", newTeamName);

const result =
  await createTeam(
    newTeamName,
    token
  );

console.log(
  "Create Team Result:",
  result
);

    setNewTeamName("");

    await loadTeams();

  } catch (error) {

    console.log(
      "Create Team Error:",
      error.response?.data || error
    );

  }
};

// ================= LOADING =================

if (loading) {

return (

  <div
    className="
      text-white
      text-center
      p-10
    "
  >
    Loading Teams...
  </div>

);

}

return (

<div className="space-y-8">

  {/* HEADER */}

  <div
    className="
      flex
      flex-col
      lg:flex-row
      justify-between
      items-start
      lg:items-center
      gap-5
    "
  >

    <div>

      <div className="flex items-center gap-3">

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
            shadow-2xl
          "
        >
          👥
        </div>

        <div>

          <h1
            className="
              text-4xl
              font-bold
              text-white
            "
          >
            Team Workspace
          </h1>

          <p
            className="
              text-gray-400
              mt-1
            "
          >
            Manage collaboration,
            smart routing and
            enterprise workflows
          </p>

        </div>

      </div>

    </div>

    {/* CREATE TEAM */}

    <div className="flex gap-3">

      <input
        type="text"
        value={newTeamName}
        onChange={(e) =>
          setNewTeamName(
            e.target.value
          )
        }
        placeholder="Enter team name..."
        className="
          bg-gray-900
          border
          border-gray-700
          px-4
          py-3
          rounded-xl
          text-white
        "
      />

      <button
        onClick={
          handleCreateTeam
        }
        className="
          bg-gradient-to-r
          from-blue-500
          to-purple-600
          px-6
          py-3
          rounded-xl
          text-white
          font-semibold
        "
      >
        Create Team
      </button>

      <button
        onClick={() =>
          setShowInviteModal(
            true
          )
        }
        className="
          bg-gray-800
          border
          border-gray-700
          px-5
          py-3
          rounded-xl
          text-white
        "
      >
        Invite
      </button>

    </div>

  </div>

  {/* OVERVIEW */}

  <TeamOverviewCards
    teams={teams}
  />

  {/* TEAM GRID */}

  <TeamGrid
    teams={teams}
    setSelectedTeam={
      setSelectedTeam
    }
  />

  {/* WORKSPACE */}

  {selectedTeam && (

    <SelectedTeamWorkspace
      selectedTeam={
        selectedTeam
      }
    />

  )}

  {/* MODAL */}

  {showInviteModal && (

    <InviteMembersModal
      onClose={() =>
        setShowInviteModal(
          false
        )
      }
    />

  )}

</div>

);
}