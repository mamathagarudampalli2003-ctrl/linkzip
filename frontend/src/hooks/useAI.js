import { useEffect, useState } from "react";

import {
  fetchAiInsightsApi,
} from "../api/analyticsApi";

export default function useAI() {

  const [aiData, setAiData] =
    useState(null);

  const fetchAiInsights =
    async () => {

      try {

        const res =
          await fetchAiInsightsApi();

        setAiData(
          res.data
        );

      } catch (error) {

        console.log(
          "AI Error:",
          error
        );
      }
    };

  useEffect(() => {

    fetchAiInsights();

  }, []);

  return {

    aiData,

    fetchAiInsights,
  };
}