import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(
    localStorage.getItem("user")
  ) || null,

  token:
    localStorage.getItem("token") || null,

  isAuthenticated:
    !!localStorage.getItem("token"),

  // ================= LOGIN =================
  login: (userData, token) => {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "token",
      token
    );

    set({
      user: userData,
      token,
      isAuthenticated: true,
    });
  },

  // ================= LOGOUT =================
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  // ================= UPDATE USER =================
  updateUser: (updatedUser) => {
    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    set({
      user: updatedUser,
    });
  },
}));

export default useAuthStore;