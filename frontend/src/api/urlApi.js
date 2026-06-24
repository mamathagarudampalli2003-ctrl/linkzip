import axios from "axios";

const API = axios.create({
  baseURL: "https://linkzip-0w52.onrender.com/api",
});

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

  (error) => Promise.reject(error)
);

// GET URLS
export const getUrlsApi =
  async () => {

    return await API.get(
      "/url"
    );
  };

// CREATE URL
export const createUrlApi =
  async (data) => {

    return await API.post(
      "/url",
      data
    );
  };

// DELETE URL
export const deleteUrlApi =
  async (id) => {

    return await API.delete(
      `/url/${id}`
    );
  };

// TOGGLE URL STATUS
export const toggleStatusApi =
  async (id) => {

    return await API.put(
      `/url/status/${id}`
    );
  };

// AI INSIGHTS
export const getAiInsightsApi =
  async () => {

    return await API.get(
      "/dashboard/analytics"
    );
  };

  export const verifyDomainApi =
  async (id) => {

    return await API.put(
      `/url/verify-domain/${id}`
    );

  };

export default API;