import axios from "axios";

const API =
  "https://linkzip-0w52.onrender.com/api/teams";

const getConfig = () => {
  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ================= GET TEAMS =================
export const getTeams =
  async () => {
    const res = await axios.get(
      API,
      getConfig()
    );

    return res.data;
  };

// ================= CREATE TEAM =================
export const createTeam =
  async (teamData) => {
    const res = await axios.post(
      API,
      teamData,
      getConfig()
    );

    return res.data;
  };

// ================= GET TEAM LINKS =================
export const getTeamLinks =
  async (teamId) => {
    const res = await axios.get(
      `${API}/${teamId}/links`,
      getConfig()
    );

    return res.data;
  };

// ================= ADD MEMBER =================
export const addMember =
  async (teamId, email) => {
    const res = await axios.post(
      `${API}/${teamId}/add`,
      { email },
      getConfig()
    );

    return res.data;
  };

// ================= REMOVE MEMBER =================
export const removeMember =
  async (teamId, userId) => {
    const res = await axios.delete(
      `${API}/${teamId}/member/${userId}`,
      getConfig()
    );

    return res.data;
  };

// ================= CHANGE ROLE =================
export const changeRole =
  async (teamId, userId, role) => {
    const res = await axios.put(
      `${API}/${teamId}/member/${userId}`,
      { role },
      getConfig()
    );

    return res.data;
  };