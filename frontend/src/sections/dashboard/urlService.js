import axios from "axios";

const API =
  "https://linkzip-0w52.onrender.com/api";

const getConfig = () => {
  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ================= GET URLS =================
export const getUrls =
  async () => {
    const res = await axios.get(
      `${API}/urls`,
      getConfig()
    );

    return res.data;
  };

// ================= CREATE SHORT URL =================
export const createShortUrl =
  async (urlData) => {
    const res = await axios.post(
      `${API}/shorten`,
      urlData,
      getConfig()
    );

    return res.data;
  };

// ================= DELETE URL =================
export const deleteUrl =
  async (id) => {
    const res = await axios.delete(
      `${API}/url/${id}`,
      getConfig()
    );

    return res.data;
  };

// ================= TOGGLE STATUS =================
export const toggleUrlStatus =
  async (id) => {
    const res = await axios.put(
      `${API}/url/status/${id}`,
      {},
      getConfig()
    );

    return res.data;
  };