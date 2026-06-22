import { useEffect, useState } from "react";

import {
  getUrlsApi,
  createUrlApi,
  deleteUrlApi,
  toggleStatusApi,
  verifyDomainApi,
} from "../api/urlApi";

const useUrls = () => {
  // ================= STATES =================

  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= FETCH URLS =================

  const fetchUrls = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      setLoading(true);

      const response = await getUrlsApi();

      setUrls(response.data || []);
    } catch (err) {
      console.log("Fetch URLs Error:", err);

      setError("Failed to fetch URLs");
    } finally {
      setLoading(false);
    }
  };

  // ================= CREATE URL =================

  const createShortUrl = async (data) => {
    try {
      const response = await createUrlApi(data);

      if (response.data?.url) {
        setUrls((prev) => [
          response.data.url,
          ...prev,
        ]);
      }

      return response.data;
    } catch (err) {
      console.log("Create URL Error:", err);
      throw err;
    }
  };

  // ================= DELETE URL =================

  const deleteUrl = async (id) => {
    try {
      await deleteUrlApi(id);

      setUrls((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );
    } catch (err) {
      console.log("Delete URL Error:", err);
    }
  };

  // ================= TOGGLE STATUS =================

  const toggleUrlStatus = async (id) => {
    try {
      await toggleStatusApi(id);

      setUrls((prev) =>
        prev.map((item) => {
          if (item._id === id) {
            return {
              ...item,
              status:
                item.status === "active"
                  ? "disabled"
                  : "active",
            };
          }

          return item;
        })
      );
    } catch (err) {
      console.log("Toggle Status Error:", err);
    }
  };

  const verifyDomain =
  async (id) => {

    try {

      await verifyDomainApi(id);

      fetchUrls();

    } catch (error) {

      console.log(error);

    }

  };

  // ================= INITIAL LOAD =================

  useEffect(() => {
    fetchUrls();
  }, []);

  // ================= RETURN =================

  return {
    urls,
    loading,
    error,

    fetchUrls,
    createShortUrl,
    deleteUrl,
    toggleUrlStatus,
    verifyDomain,
  };
};

export default useUrls;