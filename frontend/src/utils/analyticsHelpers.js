// ================= TOTAL CLICKS =================

export const getTotalClicks = (urls = []) => {
  return urls.reduce(
    (sum, item) => sum + (item.clicks || 0),
    0
  );
};

// ================= TOTAL LINKS =================

export const getTotalLinks = (urls = []) => {
  return urls.length;
};

// ================= TOP LINK =================

export const getTopLink = (urls = []) => {
  if (!urls.length) return null;

  return urls.reduce((max, item) =>
    (item.clicks || 0) >
    (max.clicks || 0)
      ? item
      : max
  );
};

// ================= LOW PERFORMANCE LINK =================

export const getLowPerformanceLink = (urls = []) => {
  if (!urls.length) return null;

  return urls.find(
    (item) => (item.clicks || 0) === 0
  );
};

// ================= AVG CLICKS =================

export const getAverageClicks = (urls = []) => {
  if (!urls.length) return 0;

  const total = getTotalClicks(urls);

  return Math.round(total / urls.length);
};

// ================= LIVE VISITORS =================

export const getLiveVisitors = (urls = []) => {
  return urls.reduce(
    (sum, item) =>
      sum + (item.liveVisitors || 0),
    0
  );
};

// ================= CHART DATA =================

export const getChartData = (urls = []) => {
  return urls.map((item) => ({
    name: item.shortId,
    clicks: item.clicks || 0,
  }));
};

// ================= AI SUGGESTION =================

export const generateAiSuggestion = ({
  totalClicks,
  avgClicks,
  topLink,
}) => {
  if (totalClicks === 0) {
    return "Start sharing your links 🚀";
  }

  if (avgClicks < 5) {
    return "Use AI targeting rules 🎯";
  }

  if (topLink?.clicks > 50) {
    return "Your top link is scaling fast 🚀";
  }

  return "Optimize with smart routing 📊";
};