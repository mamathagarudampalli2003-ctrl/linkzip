import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api`

export const getUrls = (token) =>
  axios.get(`${API}/urls`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createShortUrl = (data, token) =>
  axios.post(`${API}/shorten`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteUrl = (id, token) =>
  axios.delete(`${API}/url/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const toggleStatus = (id, token) =>
  axios.put(`${API}/url/status/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });