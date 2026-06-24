import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("https://linkzip-0w52.onrender.com");

export default function useAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [liveData, setLiveData] = useState(null);
  const [visitorCount, setVisitorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://linkzip-0w52.onrender.com/api/analytics/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Analytics API Response:", res.data);

      setAnalytics(res.data);
    } catch (error) {
      console.error(
        "Analytics Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();

    // Live click updates
    socket.on("url-clicked", (data) => {
      console.log("Live Analytics Update:", data);

      setLiveData(data);

      setAnalytics((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          totalClicks: (prev.totalClicks || 0) + 1,
        };
      });
    });

    // Live visitor count updates
    socket.on("visitor-count", (data) => {
      console.log("Visitor Count:", data);

      setVisitorCount(data.count || 0);
    });

    return () => {
      socket.off("url-clicked");
      socket.off("visitor-count");
    };
  }, []);

  return {
    analytics,
    liveData,
    visitorCount,
    loading,
    refreshAnalytics: fetchAnalytics,
  };
}