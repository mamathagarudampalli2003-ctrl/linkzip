import User from "../models/User.js";
import Url from "../models/Url.js";
import geoip from "geoip-lite";
import QRCode from "qrcode";
import { UAParser } from "ua-parser-js";
import { PLAN_LIMITS } from "../config/planLimits.js";
import { nanoid } from "nanoid";
import redisClient from "../config/redis.js";
import Click from "../models/Click.js";
import Team from "../models/Team.js";
// ================= CREATE SHORT URL =================
export const createUrl = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const {
      originalUrl,
      customId,
      mobileUrl,
      desktopUrl,
      morningUrl,
      eveningUrl,
      countryUrls,
      rules,
      expiresAt,
      teamId,
      customDomain,
      password,
      verifyDomain,
      variantAUrl,
      variantBUrl,
      monetization,
    } = req.body;

    console.log("REQUEST BODY:");
console.log(req.body);

    if (!originalUrl) {
      return res.status(400).json({
        message: "Original URL is required",
      });
    }

    const shortId =
customId ||
nanoid(8);

if (teamId) {

 const team =
 await Team.findById(teamId);

 if (!team) {

  return res.status(404).json({
   message: "Team not found",
  });

 }

 const member =
 team.members.find(
  m =>
   m.user.toString() === userId
 );

 if (!member) {

  return res.status(403).json({
   message:
    "Not a team member",
  });

 }

}

      const shortUrl =
  `http://localhost:8000/api/url/qr/${shortId}`;

const qrCode =
  await QRCode.toDataURL(
    shortUrl
  );

const userUrls =
  await Url.countDocuments({
    user: userId,
  });

const limit =
  PLAN_LIMITS[
    user.plan
  ].links;

if (
  userUrls >= limit
) {

  return res.status(403).json({

    success: false,

    message:
      "Plan limit reached. Upgrade required.",

  });

}
    const existing = await Url.findOne({ shortId });

    if (existing) {
      return res.status(400).json({
        message: "Short ID already exists",
      });
    }

  const newUrl = new Url({
  user: userId,

  originalUrl,

  shortId,

  qrCode,

  customDomain:
    customDomain || "",

    domainVerified: false,

  team: teamId || null,

  mobileUrl: mobileUrl || "",

  desktopUrl: desktopUrl || "",

  morningUrl: morningUrl || "",

  eveningUrl: eveningUrl || "",

  countryUrls: countryUrls || {},

  rules: rules || [],

  password: password || "",

  expiresAt: expiresAt || null,

  variantAUrl:
  variantAUrl || "",

  variantBUrl:
  variantBUrl || "",

  clicks: 0,

  uniqueClicks: 0,

  status: "active",
});


    await newUrl.save();
    
    await redisClient.del(
  `urls:${userId}`
);

    return res.status(201).json({
      success: true,
      message: "Short URL created successfully",
      url: newUrl,
      shortUrl: `http://localhost:8000/api/url/r/${shortId}`,
    });

  } catch (error) {
    console.log("CREATE URL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// ================= GET URLS =================

export const getUrls =
async (
  req,
  res
) => {

  try {

    const userId =
      req.user.userId;

    const cacheKey =
      `urls:${userId}`;

    const cached =
      await redisClient.get(
        cacheKey
      );

    if (cached) {

      return res.status(200).json(
        JSON.parse(cached)
      );

    }

    const teams =
      await Team.find({
        "members.user":
          userId,
      });

    const teamIds =
      teams.map(
        team => team._id
      );

    const urls =
      await Url.find({

        $or: [

          {
            user: userId,
          },

          {
            team: {
              $in: teamIds,
            },
          },

        ],

      })

      .populate(
        "team",
        "name"
      )

      .sort({
        createdAt: -1,
      });

    await redisClient.setEx(

      cacheKey,

      300,

      JSON.stringify(urls)

    );

    return res.status(200).json(
      urls
    );

  }

  catch (error) {

    console.log(error);

    return res.status(500).json({
      message:
        "Server error",
    });

  }

};

// ================= DELETE URL =================
export const deleteUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const deleted = await Url.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deleted) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    await redisClient.del(
  `redirect:${deleted.shortId}`
);

await redisClient.del(
  `urls:${userId}`
);

    return res.status(200).json({
      message: "URL deleted successfully",
    });


  } catch (error) {
    console.log("DELETE URL ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= TOGGLE STATUS =================
export const toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const url = await Url.findOne({
      _id: id,
      user: userId,
    });

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    url.status = url.status === "active" ? "disabled" : "active";

    await url.save();
    await redisClient.del(
  `redirect:${url.shortId}`
);

await redisClient.del(
 `analytics:${url.shortId}`
);

await redisClient.del(
  `urls:${userId}`
);

    return res.status(200).json({
      message: "Status updated",
      status: url.status,
    });

  } catch (error) {
    console.log("TOGGLE STATUS ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

import { getIO } from "../socket/socketServer.js";

// ================= REDIRECT URL (SAAS LEVEL FIXED) =================
export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const cacheKey = `redirect:${shortId}`;

let url = await redisClient.get(cacheKey);

if (url) {

  url = JSON.parse(url);

} else {

  const dbUrl =
    await Url.findOne({
      shortId,
    });

  if (!dbUrl) {

    return res.redirect(
      "http://localhost:5173/not-found"
    );

  }

  url = dbUrl.toObject();

  await redisClient.setEx(

    cacheKey,

    3600,

    JSON.stringify(url)

  );
}

    // ❌ If not found → redirect to frontend safe page
    if (!url) {
      return res.redirect("http://localhost:5173/not-found");
    }

    // ❌ If disabled
    if (url.status === "disabled") {
      return res.redirect("http://localhost:5173/disabled");
    }

    // PASSWORD PROTECTION

if (url.password) {

  const enteredPassword =
    req.query.password;

  if (
    enteredPassword !==
    url.password
  ) {

    return res.redirect(
      `http://localhost:5173/protected/${shortId}`
    );
  }
}

    // ================= EXPIRY CHECK =================

if (
  url.expiresAt &&
  new Date() > new Date(url.expiresAt)
) {

  await Url.updateOne(
  { shortId },
  {
    status: "expired",
  }
);

await redisClient.del(
  `redirect:${shortId}`
);

  return res.redirect(
    "http://localhost:5173/expired"
  );
}

    // ================= CLICK TRACKING =================
    const ip =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "unknown";
      const geo =
  geoip.lookup(ip);

const country =
  geo?.country || "Unknown";

const city =
  geo?.city || "Unknown";

const region =
  geo?.region || "Unknown";

const userAgent =
  req.headers["user-agent"] || "";

const parser =
  new UAParser(userAgent);

const browser =
  parser.getBrowser().name ||
  "Unknown";

const os =
  parser.getOS().name ||
  "Unknown";

const referrer =
  req.headers.referer || "Direct";

const currentHour =
  new Date().getHours();

let device = "desktop";

if (/mobile/i.test(userAgent))
  device = "mobile";

if (/tablet|ipad/i.test(userAgent))
  device = "tablet";

  // ================= COUNTRY ROUTING =================

if (
  url.countryUrls &&
  url.countryUrls[country]
) {

  return res.redirect(
    url.countryUrls[country]
  );

}

// ================= TIME ROUTING =================

if (
  currentHour >= 5 &&
  currentHour <= 11 &&
  url.morningUrl
) {

  return res.redirect(
    url.morningUrl
  );

}

if (
  currentHour >= 18 &&
  currentHour <= 23 &&
  url.eveningUrl
) {

  return res.redirect(
    url.eveningUrl
  );

}

// ================= AI RULES =================

if (
  url.rules &&
  url.rules.length > 0
) {

  for (const rule of url.rules) {

    // Device

    if (
  rule.type === "device" &&
  rule.value.toLowerCase() === device
)
{
  return res.redirect(rule.url);
}

    // Country

    if (
      rule.type === "country" &&
      rule.value === country
    ) {

      return res.redirect(
        rule.url
      );

    }

    // Time

    if (
      rule.type === "time"
    ) {

      const now =
        currentHour;

      const target =
        parseInt(rule.value);

      if (now === target) {

        return res.redirect(
          rule.url
        );

      }

    }
  }
}

// ================= A/B TESTING =================

if (
  url.variantAUrl &&
  url.variantBUrl
) {

  const random =
    Math.random();

  if (random < 0.5) {

    await Url.updateOne(
  { shortId },
  {
    $inc: {
      variantAClicks: 1,
    },
  }
);

    return res.redirect(
      url.variantAUrl
    );
  }

  await Url.updateOne(
  { shortId },
  {
    $inc: {
      variantBClicks: 1,
    },
  }
);

  return res.redirect(
    url.variantBUrl
  );
}
    // ================= DEVICE RULE =================

if (
  device === "mobile" &&
  url.mobileUrl
) {
  return res.redirect(
    url.mobileUrl
  );
}

if (
  device === "desktop" &&
  url.desktopUrl
) {
  return res.redirect(
    url.desktopUrl
  );
}

    // Unique click logic
    const alreadyVisited =
await Click.exists({

  url: url._id,

  ip,

});

    if (!alreadyVisited) {

  await Url.updateOne(

    { _id: url._id },

    {
      $inc: {
        uniqueClicks: 1,
      },
    }

  );

}

    // Increment clicks
    await Url.updateOne(

  { _id: url._id },

  {
    $inc: {
      clicks: 1,
    },
  }

);
    
    const io = getIO();
    io.emit("url-clicked", {
  shortId: url.shortId,
  clicks: (url.clicks || 0) + 1,
  device,
  country,
  browser,
  os,
  referrer,
});

    // Device stats
    const updateStats = {};

if (device === "mobile")
updateStats["deviceStats.mobile"] = 1;

if (device === "desktop")
updateStats["deviceStats.desktop"] = 1;

if (device === "tablet")
updateStats["deviceStats.tablet"] = 1;

await Url.updateOne(

  { _id: url._id },

  {
    $inc: updateStats,
  }

);

    // Save analytics
    await Click.create({

  url: url._id,

  ip,

  device,

  browser,

  os,

  country,

  city,

  region,

  referrer,

});


    // 🚀 FINAL REDIRECT
    return res.redirect(url.originalUrl);

  } catch (error) {
    console.log("REDIRECT ERROR:", error);

    return res.redirect("http://localhost:5173/error");
  }
};

export const qrRedirect =
  async (req, res) => {

    try {

      const { shortId } =
        req.params;

      const url =
        await Url.findOne({
          shortId,
        });

      if (!url) {

        return res.redirect(
          "http://localhost:5173/not-found"
        );
      }

      const geo =
        geoip.lookup(req.ip);

      const parser =
        new UAParser(
          req.headers["user-agent"]
        );

      let device =
        "desktop";

      const ua =
        req.headers["user-agent"] || "";

      if (/mobile/i.test(ua))
        device = "mobile";

      if (/tablet|ipad/i.test(ua))
        device = "tablet";

      url.qrScans += 1;

      url.qrAnalytics.push({
        country:
          geo?.country ||
          "Unknown",

        city:
          geo?.city ||
          "Unknown",

        region:
          geo?.region ||
          "Unknown",

        device,

        browser:
          parser.getBrowser().name ||
          "Unknown",

        os:
          parser.getOS().name ||
          "Unknown",

        timestamp:
          new Date(),
      });

      await url.save();

      return res.redirect(
 `http://localhost:8000/api/url/r/${shortId}`
);

    } catch (err) {

      console.log(err);

      return res.redirect(
        "http://localhost:5173/error"
      );
    }
  };

export const getPublicAnalytics =
async (req, res) => {

 try {

  const { shortId } =
 req.params;

const cacheKey =
 `analytics:${shortId}`;

const cached =
 await redisClient.get(
  cacheKey
 );

if (cached) {

 return res.json(
  JSON.parse(cached)
 );

}

  const url =
   await Url.findOne({
    shortId,
   });

  if (!url) {

   return res
    .status(404)
    .json({
     success: false,
     message:
      "Link not found",
    });

  }

  const analytics =
   await Click.find({
    url: url._id,
   })
   .sort({
    createdAt: -1,
   })
   .limit(100);

  const response = {

 success: true,

 shortId:
  url.shortId,

 originalUrl:
  url.originalUrl,

 clicks:
  url.clicks || 0,

 uniqueClicks:
  url.uniqueClicks || 0,

 qrScans:
  url.qrScans || 0,

 deviceStats:
  url.deviceStats || {},

 analytics,

 qrCode:
  url.qrCode || "",

 createdAt:
  url.createdAt,

};

await redisClient.setEx(
 cacheKey,
 300,
 JSON.stringify(response)
);

return res.json(response);

 } catch (err) {

  console.log(
   "PUBLIC ANALYTICS ERROR:",
   err
  );

  return res.status(500).json({

   success: false,

   message:
    "Server Error",

  });

 }

};

  // ================= VERIFY DOMAIN =================

export const verifyDomain = async (
  req,
  res
) => {
  try {

    const { id } = req.params;

    const url =
      await Url.findById(id);

    if (!url) {
      return res.status(404).json({
        message: "URL not found",
      });
    }

    url.domainVerified = true;

    await url.save();

    res.json({
      success: true,
      message:
        "Domain verified successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};
