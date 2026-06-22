import { create } from "zustand";

const useUiStore = create((set) => ({
  sidebarOpen: true,

  theme: "dark",

  loading: false,

  notification: null,

  // ================= SIDEBAR =================
  toggleSidebar: () =>
    set((state) => ({
      sidebarOpen:
        !state.sidebarOpen,
    })),

  closeSidebar: () =>
    set({
      sidebarOpen: false,
    }),

  openSidebar: () =>
    set({
      sidebarOpen: true,
    }),

  // ================= THEME =================
  setTheme: (theme) =>
    set({ theme }),

  // ================= LOADING =================
  setLoading: (loading) =>
    set({ loading }),

  // ================= NOTIFICATIONS =================
  showNotification: (
    message,
    type = "success"
  ) =>
    set({
      notification: {
        message,
        type,
      },
    }),

  clearNotification: () =>
    set({
      notification: null,
    }),
}));

export default useUiStore;