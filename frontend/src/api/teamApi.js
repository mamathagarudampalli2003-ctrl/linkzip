import axios from "axios";

const API =
  "http://localhost:8000/api/team";

// ================= CREATE TEAM =================

export const createTeam =
  async (
    name,
    token
  ) => {

    const res =
      await axios.post(
        API,
        { name },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };

// ================= GET TEAMS =================

export const getTeams =
  async (token) => {

    const res =
      await axios.get(
        API,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };

// ================= ADD MEMBER =================
export const addMember = async (
  teamId,
  email,
  role,
  token
) => {

  console.log(
    "ADD MEMBER URL:",
    `${API}/${teamId}/add`
  );

  console.log(
    "TEAM ID:",
    teamId
  );

  const res =
    await axios.post(
      `${API}/${teamId}/add`,
      {
        email,
        role,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return res.data;
};
// ================= REMOVE MEMBER =================

export const removeMember =
  async (
    teamId,
    userId,
    token
  ) => {

    const res =
      await axios.delete(
        `${API}/${teamId}/member/${userId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };

// ================= CHANGE ROLE =================

export const changeRole =
  async (
    teamId,
    userId,
    role,
    token
  ) => {

    const res =
      await axios.put(
        `${API}/${teamId}/member/${userId}`,
        {
          role,
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data;
  };

export const getTeamLinks =
  async (
    teamId,
    token
  ) => {

    const res =
      await axios.get(
        `${API}/${teamId}/links`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return res.data;

  };

export const inviteMember =
async (
teamId,
email,
role,
token
)=>{

const res =
await axios.post(

`${API}/${teamId}/invite`,

{
 email,
 role,
},

{
 headers:{
 Authorization:
 `Bearer ${token}`,
 },
}

);

return res.data;
};

export const getInvitations =
async (
teamId,
token
)=>{

const res =
await axios.get(

`${API}/${teamId}/invitations`,

{
 headers:{
 Authorization:
 `Bearer ${token}`,
 },
}

);

return res.data;
};

export const resendInvitation =
async (
inviteId,
token
)=>{

const res =
await axios.put(

`${API}/invite/resend/${inviteId}`,

{},

{
 headers:{
 Authorization:
 `Bearer ${token}`
 }
}

);

return res.data;

};

export const cancelInvitation =
async (
inviteId,
token
)=>{

const res =
await axios.delete(

`${API}/invite/${inviteId}`,

{
 headers:{
 Authorization:
 `Bearer ${token}`
 }
}

);

return res.data;

};

export const getTeamActivities =
async (
 teamId,
 token
)=>{

 const res =
 await axios.get(

 `${API}/${teamId}/activities`,

 {
  headers:{
   Authorization:
   `Bearer ${token}`,
  },
 }

 );

 return res.data;

};