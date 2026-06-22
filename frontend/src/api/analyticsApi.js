import axios from "axios";

// ================= API INSTANCE =================

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// ================= TOKEN =================

API.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);

// ================= DASHBOARD ANALYTICS =================

export const getAnalyticsApi =
  async () => {

    return await API.get(
      "/analytics/dashboard"
    );
  };

  export const getLinkAnalyticsApi =
  async (id) => {

    return await API.get(
      `/analytics/link/${id}`
    );
  };

// ================= AI INSIGHTS =================

export const fetchAiInsightsApi =
  async () => {

    return {
      data: {
        suggestion:
          "Traffic is stable. Continue optimizing your links."
      }
    };
  };

export default API;