import axios from "axios";

const API =
  "http://localhost:8000/api/auth";

// ================= SIGNUP =================
export const SignupUser =
  async (userData) => {
    const res = await axios.post(
      `${API}/Signup`,
      userData
    );

    return res.data;
  };

// ================= LOGIN =================
export const loginUser =
  async (userData) => {
    const res = await axios.post(
      `${API}/login`,
      userData
    );

    return res.data;
  };

// ================= LOGOUT =================
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

// ================= GET USER =================
export const getCurrentUser = () => {
  return JSON.parse(
    localStorage.getItem("user")
  );
};