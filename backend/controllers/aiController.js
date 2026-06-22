import Url from "../models/Url.js";

export const getAiInsights =
async (req, res) => {

  try {

    const userId =
      req.user.userId;

    const urls =
      await Url.find({
        user: userId,
      });

    const totalLinks =
      urls.length;

    const totalClicks =
      urls.reduce(
        (sum, url) =>
          sum +
          (url.clicks || 0),
        0
      );

    const avgClicks =
      totalLinks
        ? Number(
            (
              totalClicks /
              totalLinks
            ).toFixed(2)
          )
        : 0;

    const topLink =
      [...urls].sort(
        (a, b) =>
          (b.clicks || 0) -
          (a.clicks || 0)
      )[0] || null;

    const performanceScore =
      Math.min(
        100,
        Math.round(
          avgClicks * 1.2
        )
      );

    const recommendations =
      [];

    if (avgClicks < 10) {

      recommendations.push(
        "Share links more frequently across social platforms."
      );

      recommendations.push(
        "Improve link titles and descriptions."
      );

    }

    if (
      avgClicks >= 10 &&
      avgClicks < 50
    ) {

      recommendations.push(
        "Traffic is healthy. Continue promoting your best links."
      );

    }

    if (avgClicks >= 50) {

      recommendations.push(
        "Excellent performance. Consider premium campaigns."
      );

      recommendations.push(
        "Create more links similar to your top performer."
      );

    }

    return res.status(200).json({

      success: true,

      performanceScore,

      totalLinks,

      totalClicks,

      avgClicks,

      topLink:
        topLink
          ? {
              shortId:
                topLink.shortId,

              originalUrl:
                topLink.originalUrl,

              clicks:
                topLink.clicks,
            }
          : null,

      recommendations,

    });

  } catch (error) {

    console.log(
      "AI ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to load AI insights",

    });

  }

};