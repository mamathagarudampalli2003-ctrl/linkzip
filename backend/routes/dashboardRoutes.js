import express from "express";

const router =
  express.Router();

// ================= DASHBOARD ANALYTICS =================

router.get(
  "/analytics",
  async (req, res) => {

    try {

      return res.status(200).json({

        totalLinks: 124,

        totalClicks: 8421,

        avgClicks: 67,

        liveVisitors: 92,

        topLink: {
          shortId:
            "linkzip-ai",
          clicks: 1200,
        },

        lowLink: {
          shortId:
            "test-link",
          clicks: 4,
        },

        aiSuggestion:
          "Your traffic is growing rapidly. Focus on mobile optimization.",

        chartData: [
          {
            name: "Mon",
            clicks: 120,
          },

          {
            name: "Tue",
            clicks: 300,
          },

          {
            name: "Wed",
            clicks: 500,
          },

          {
            name: "Thu",
            clicks: 700,
          },

          {
            name: "Fri",
            clicks: 900,
          },

          {
            name: "Sat",
            clicks: 1200,
          },

          {
            name: "Sun",
            clicks: 1500,
          },
        ],
      });

    } catch (error) {

      console.log(
        "Dashboard Analytics Error ❌",
        error
      );

      return res.status(500).json({
        message:
          "Server error",
      });
    }
  }
);

export default router;