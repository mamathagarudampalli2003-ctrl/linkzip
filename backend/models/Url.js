import mongoose from "mongoose";

const ruleSchema =
  new mongoose.Schema({
    type: String,

    value: String,

    url: String,
  });

const urlSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",
      },

      originalUrl: {
        type: String,
        required: true,
      },

      shortId: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },

      customDomain: {
        type: String,
        default: "",
      },

      domainVerified: {
        type: Boolean,
        default: false,
      },

      team: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Team",
  default: null,
},

mobileUrl: {
  type: String,
  default: "",
},

desktopUrl: {
  type: String,
  default: "",
},

morningUrl: {
  type: String,
  default: "",
},

eveningUrl: {
  type: String,
  default: "",
},

countryUrls: {
  type: Map,
  of: String,
  default: {},
},

      title: {
        type: String,
        default: "",
      },

      description: {
        type: String,
        default: "",
      },

      favicon: {
        type: String,
        default: "",
      },

      qrCode: {
        type: String,
        default: "",
      },

      clicks: {
        type: Number,
        default: 0,
      },

      uniqueClicks: {
        type: Number,
        default: 0,
      },

      totalRevenue: {
  type: Number,
  default: 0,
},

lastClickedAt: {
  type: Date,
  default: null,
},

      rules: [ruleSchema],

      tags: [String],

      deviceStats: {
        mobile: {
          type: Number,
          default: 0,
        },

        desktop: {
          type: Number,
          default: 0,
        },

        tablet: {
          type: Number,
          default: 0,
        },
      },

      countryStats: {
        type: Map,
        of: Number,
        default: {},
      },

      browserStats: {
  type: Map,
  of: Number,
  default: {},
},

osStats: {
  type: Map,
  of: Number,
  default: {},
},

referrerStats: {
  type: Map,
  of: Number,
  default: {},
},

qrScans: {
  type: Number,
  default: 0,
},

qrAnalytics: [
  {
    country: String,

    city: String,

    region: String,

    device: String,

    browser: String,

    os: String,

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
],

clickLogs: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Click",
  },
],

variantAUrl: {
  type: String,
  default: "",
},

variantBUrl: {
  type: String,
  default: "",
},

variantAClicks: {
  type: Number,
  default: 0,
},

variantBClicks: {
  type: Number,
  default: 0,
},

abTestWinner: {
  type: String,
  default: "",
},

lastRedirectCache: {
  type: Date,
  default: null,
},

monetization: {
  enabled: {
    type: Boolean,
    default: false,
  },

  cpc: {
    type: Number,
    default: 0.02, // default 2 cents per click
  },

  revenue: {
    type: Number,
    default: 0,
  },

  earnings: {
    type: Number,
    default: 0,
  },
},
      status: {
        type: String,
        enum: [
          "active",
          "disabled",
          "expired",
        ],
        default: "active",
      },

      expiresAt: {
        type: Date,
        default: null,
      },

      aiOptimized: {
        type: Boolean,
        default: false,
      },

      password: {
       type: String,
       default: "",
      },

      isPasswordProtected: {
  type: Boolean,
  default: false,
},

      aiSuggestions: [
        {
          type: String,
        },
      ],
    },
    {
      timestamps: true,
    }
  );

urlSchema.index({
  user: 1,
});

urlSchema.index({
  team: 1,
});

urlSchema.index({
  createdAt: -1,
});

urlSchema.index({
  status: 1,
});

urlSchema.index({
  clicks: -1,
});

urlSchema.index({
  expiresAt: 1,
});

urlSchema.index({
  "monetization.enabled": 1,
});

urlSchema.pre(
  "save",
  function (next) {

    this.isPasswordProtected =
      !!this.password;

    next();

  }
);

export default mongoose.model(
  "Url",
  urlSchema
);