import { useState } from "react";

import {
  getLinkAnalyticsApi,
} from "../api/analyticsApi";

export default function useLinkAnalytics() {

  const [analytics,
    setAnalytics] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);

  const fetchAnalytics =
    async (id) => {

      try {

        setLoading(true);

        const res =
          await getLinkAnalyticsApi(
            id
          );

        setAnalytics(
          res.data
        );

      } catch (error) {

        console.log(
          error
        );

      } finally {

        setLoading(false);
      }
    };

  return {
    analytics,
    loading,
    fetchAnalytics,
  };
}