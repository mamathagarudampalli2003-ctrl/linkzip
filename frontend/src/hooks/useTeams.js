import { useEffect, useState } from "react";

import {
getTeams,
createTeam as createTeamApi,
addMember as addMemberApi,
removeMember as removeMemberApi,
changeRole as changeRoleApi,
getTeamLinks as getTeamLinksApi,
inviteMember as inviteMemberApi,
getInvitations as getInvitationsApi,
resendInvitation as resendInvitationApi,
cancelInvitation as cancelInvitationApi,
getTeamActivities as getTeamActivitiesApi,
} from "../api/teamApi";

import { useAuth } from "../context/AuthContext";
import socket from "../socket/socket";

export default function useTeams(
  teamId
){

  console.log(
    "HOOK TEAM ID:",
    teamId
  );

const { token } = useAuth();

const [teams, setTeams] = useState([]);

const [teamLinks, setTeamLinks] = useState([]);

const [invitations, setInvitations] = useState([]);

const [activities, setActivities] = useState([]);


// ================= FETCH TEAMS =================

const fetchTeams = async () => {

if (!token) return;

try {

  const data =
    await getTeams(token);

    console.log(
  "TEAM API RESPONSE:",
  data
);

  setTeams(
  Array.isArray(data)
    ? data
    : data?.teams || []
);

} catch (err) {

  console.log(
    "FETCH TEAM ERROR",
    err
  );

  setTeams([]);

}

};

const fetchTeamLinks =
  async () => {

    if (
      !teamId ||
      !token
    )
      return;

    try {

      const links =
        await getTeamLinksApi(
          teamId,
          token
        );

      setTeamLinks(
  Array.isArray(links)
    ? links
    : links?.links || []
);

    } catch (err) {

      console.log(err);

    }

  };

  const fetchInvitations =
async ()=>{

if(
 !teamId ||
 !token
)
 return;

try{

 const data =
 await getInvitationsApi(
   teamId,
   token
 );

 setInvitations(
  Array.isArray(data)
    ? data
    : data?.invitations || []
);

}catch(err){

 console.log(err);

}

};

const handleResendInvite =
async (
inviteId
)=>{

try{

 await resendInvitationApi(
   inviteId,
   token
 );

 alert(
  "Invite Resent"
 );

}catch(err){

 console.log(err);

}

};

const handleCancelInvite =
async (
inviteId
)=>{

try{

 await cancelInvitationApi(
   inviteId,
   token
 );

 fetchInvitations();

}catch(err){

 console.log(err);

}

};

// ================= CREATE TEAM =================

const handleCreateTeam = async (
  name
) => {

  console.log(
    "Creating team:",
    name
  );

  try {

    await createTeamApi(
      name,
      token
    );

    await fetchTeams();

  } catch (err) {

    console.log(err);

  }
};

// ================= ADD MEMBER =================

const handleAddMember = async (
  teamId,
  email,
  role = "member"

) => {

  console.log(
    "Add Member:",
    email
  );

  try {

    await addMemberApi(
      teamId,
      email,
      role,
      token
    );

    console.log(
      "Member Added",
      email
    )

    await fetchTeams();

  } catch (err) {

    console.log(err);

  }
  
};

// ================= REMOVE MEMBER =================

const handleRemoveMember = async (
userId
) => {

try {

  await removeMemberApi(
    teamId,
    userId,
    token
  );

  await fetchTeams();

} catch (err) {

  console.log(err);

}

};

// ================= CHANGE ROLE =================

const handleChangeRole = async (
userId,
role
) => {

try {

  await changeRoleApi(
    teamId,
    userId,
    role,
    token
  );

  await fetchTeams();

} catch (err) {

  console.log(err);

}

};

const handleInviteMember =
async (
teamId,
email,
role="member"
)=>{

try{

 await inviteMemberApi(
   teamId,
   email,
   role,
   token
 );

 alert(
   "Invitation Sent"
 );

}catch(err){

 console.log(err);

}

};

const fetchActivities =
async ()=>{

 if(
  !teamId ||
  !token
 )
 return;

 try{

  const data =
  await getTeamActivitiesApi(
   teamId,
   token
  );

  setActivities(
  Array.isArray(data)
    ? data
    : data?.activities || []
);

 }catch(err){

  console.log(
   "ACTIVITY ERROR:",
   err
  );

 }

};

// Fetch teams when token changes

useEffect(() => {

  if (token) {

    fetchTeams();

  }

}, [token]);

useEffect(() => {

  socket.on(
    "team-activity",
    (activity) => {

      setActivities(
        (prev) => [

          activity,

          ...prev,

        ]
      );

    }
  );

  return () => {

    socket.off(
      "team-activity"
    );

  };

}, []);


// Fetch team links when team changes

useEffect(() => {

  if (teamId) {

    fetchTeamLinks();

    fetchInvitations();

    fetchActivities();

  } else {

    setActivities([]);

  }

}, [teamId, token]);

return {

teams,
setTeams,

teamLinks,
setTeamLinks,

invitations,
fetchInvitations,

fetchTeams,
fetchTeamLinks,

activities,
fetchActivities,

handleCreateTeam,
handleAddMember,
handleRemoveMember,
handleChangeRole,
handleInviteMember,
handleResendInvite,
handleCancelInvite,
};
}

