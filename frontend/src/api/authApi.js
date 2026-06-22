import axios from "axios";

const API = "http://localhost:8000/api";

// ================= LOGIN =================

export const loginApi = async (
  email,
  password
) => {
  const res = await axios.post(
    `${API}/auth/login`,
    {
      email,
      password,
    }
  );

  return res.data;
};

// ================= SIGNUP =================

export const signupApi = async (
  username,
  email,
  password
) => {
  const res = await axios.post(
    `${API}/auth/signup`,
    {
      username,
      email,
      password,
    }
  );

  return res.data;
};

// ================= GET PROFILE =================

export const getProfileApi = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API}/auth/profile`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};