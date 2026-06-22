import axios from "axios";

const API = "http://localhost:8000/api";

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