import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function useAiInsights() {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchData();

  }, []);

  const fetchData =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:8000/api/ai/insights",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setData(
          res.data
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(
          false
        );

      }
    };

  return {
    data,
    loading,
  };
}