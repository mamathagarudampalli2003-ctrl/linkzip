import axios from "axios";

const API =
  "https://linkzip-0w52.onrender.com/api/ai";

const getConfig = () => {
  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// FETCH AI INSIGHTS
export const getAiInsights =
  async () => {
    const res = await axios.get(
      `${API}/insights`,
      getConfig()
    );

    return res.data;
  };