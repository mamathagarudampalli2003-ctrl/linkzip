import Url from "../models/Url.js";

export const getDashboardAnalytics = async (
  req,
  res
) => {
  try {
    const userId =
      req.user.userId;

    const urls =
      await Url.find({
        user: userId,
      });

    // ================= BASIC STATS =================

    const totalLinks =
      urls.length;

    const totalClicks =
      urls.reduce(
        (sum, url) =>
          sum +
          (url.clicks || 0),
        0
      );

    const uniqueClicks =
      urls.reduce(
        (sum, url) =>
          sum +
          (url.uniqueClicks || 0),
        0
      );

    const avgClicks =
      totalLinks > 0
        ? Math.round(
            totalClicks /
              totalLinks
          )
        : 0;

    // ================= TOP LINK =================

    const topLink =
      urls.length > 0
        ? [...urls].sort(
            (a, b) =>
              b.clicks -
              a.clicks
          )[0]
        : null;

    // ================= LOW LINK =================

    const lowLink =
      urls.length > 0
        ? [...urls].sort(
            (a, b) =>
              a.clicks -
              b.clicks
          )[0]
        : null;

    // ================= DEVICE STATS =================

    let deviceStats = {
      mobile: 0,
      desktop: 0,
      tablet: 0,
    };

    // ================= BROWSER STATS =================

    let browserStats = {};

    // ================= OS STATS =================

    let osStats = {};

    // ================= COUNTRY STATS =================

    let countryStats = {};

    let referrerStats = {};

    // ================= PROCESS DATA =================

    urls.forEach((url) => {
      deviceStats.mobile +=
        url.deviceStats
          ?.mobile || 0;

      deviceStats.desktop +=
        url.deviceStats
          ?.desktop || 0;

      deviceStats.tablet +=
        url.deviceStats
          ?.tablet || 0;

      url.analytics?.forEach(
        (visit) => {
          // Browser

          const browser =
            visit.browser ||
            "Unknown";

          browserStats[
            browser
          ] =
            (browserStats[
              browser
            ] || 0) + 1;

          // OS

          const os =
            visit.os ||
            "Unknown";

          osStats[os] =
            (osStats[os] || 0) +
            1;

          // Country

          const country =
            visit.country ||
            "Unknown";

          countryStats[
            country
          ] =
            (countryStats[
              country
            ] || 0) + 1;

            const referrer =
  visit.referrer ||
  "Direct";

referrerStats[
  referrer
] =
  (referrerStats[
    referrer
  ] || 0) + 1;
        }
      );
    });

    // ================= TOP COUNTRIES =================

    const topCountries =
      Object.entries(
        countryStats
      )
        .sort(
          (a, b) =>
            b[1] - a[1]
        )
        .slice(0, 10);

    // ================= CHART DATA =================

    const chartData = urls
      .sort(
        (a, b) =>
          new Date(
            a.createdAt
          ) -
          new Date(
            b.createdAt
          )
      )
      .slice(-10)
      .map((url) => ({
        name:
          url.shortId,
        clicks:
          url.clicks || 0,
      }));

    // ================= LIVE VISITORS =================

    const liveVisitors =
      uniqueClicks;

    // ================= AI SUGGESTION =================

    let aiSuggestion =
      "Your links are performing normally.";

    if (
      avgClicks > 50
    ) {
      aiSuggestion =
        "Excellent engagement detected. Continue promoting your top-performing links.";
    }

    if (
      avgClicks < 10
    ) {
      aiSuggestion =
        "Low engagement detected. Improve your content strategy and sharing channels.";
    }

    // ================= RESPONSE =================

    const totalQrScans = urls.reduce(
  (sum, url) => sum + (url.qrScans || 0),
  0
);

const abTesting = urls.map((url) => ({
  shortId: url.shortId,
  variantA: url.variantAClicks || 0,
  variantB: url.variantBClicks || 0,
  winner:
    (url.variantAClicks || 0) >
    (url.variantBClicks || 0)
      ? "A"
      : "B",
}));

const totalRevenue = urls.reduce(
  (sum, url) =>
    sum + (url.monetization?.revenue || 0),
  0
);

const totalEarnings = urls.reduce(
  (sum, url) =>
    sum + (url.monetization?.earnings || 0),
  0
);

    return res.status(200).json({
      success: true,

      totalLinks,

      totalClicks,

      uniqueClicks,

      avgClicks,

      liveVisitors,

      topLink,

      lowLink,

      deviceStats,

      browserStats,

      osStats,

      countryStats,

      referrerStats,

      topCountries,

      chartData,

      aiSuggestion,

      totalQrScans,
  abTesting,
  totalRevenue,
  totalEarnings,
    });

    
  } catch (error) {
    console.log(
      "ANALYTICS ERROR:",
      error
    );

    return res.status(500).json({
  success: false,
  message: "Failed to load analytics",
});
  }
};

export const getLinkAnalytics = async (
  req,
  res
) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Link analytics endpoint working",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load link analytics",
    });
  }
};


