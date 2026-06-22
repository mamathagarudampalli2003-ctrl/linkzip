import { create } from "zustand";

const useUrlStore = create((set) => ({
  urls: [],

  selectedUrl: null,

  loading: false,

  search: "",

  sortType: "latest",

  // ================= SET URLS =================
  setUrls: (urls) =>
    set({ urls }),

  // ================= ADD URL =================
  addUrl: (url) =>
    set((state) => ({
      urls: [url, ...state.urls],
    })),

  // ================= DELETE URL =================
  removeUrl: (id) =>
    set((state) => ({
      urls: state.urls.filter(
        (url) => url._id !== id
      ),
    })),

  // ================= SELECT URL =================
  setSelectedUrl: (url) =>
    set({
      selectedUrl: url,
    }),

  // ================= LOADING =================
  setLoading: (loading) =>
    set({ loading }),

  // ================= SEARCH =================
  setSearch: (search) =>
    set({ search }),

  // ================= SORT =================
  setSortType: (sortType) =>
    set({ sortType }),
}));

export default useUrlStore;