import axios from "axios";

const API = "https://linkzip-0w52.onrender.com";

const getConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ================= FETCH AI INSIGHTS =================

export const fetchAiInsightsApi = async () => {
  const res = await axios.get(
    `${API}/ai/insights`,
    getConfig()
  );

  return res.data;
};