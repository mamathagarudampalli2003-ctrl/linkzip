import mongoose from "mongoose";

const clickSchema =
new mongoose.Schema(
  {

  url: {
    type:
      mongoose.Schema.Types.ObjectId,
    ref: "Url",
    required: true,
  },

  team: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Team",
  default: null,
},

  ip: String,

  device: String,

  browser: String,

  os: String,

  country: String,

  city: String,

  region: String,

  latitude: {
  type: Number,
  default: null,
},

longitude: {
  type: Number,
  default: null,
},

  referrer: String,

  revenue: {
  type: Number,
  default: 0,
},

  userAgent: {
  type: String,
  default: "",
},

  timestamp: {
    type: Date,
    default: Date.now,
  },

  },
  {
    timestamps: true,
  }
);

clickSchema.index({
 url: 1,
 timestamp: -1,
});
clickSchema.index({
  url: 1,
  ip: 1,
});

clickSchema.index({
  country: 1,
});

clickSchema.index({
  browser: 1,
});

clickSchema.index({
  device: 1,
});

clickSchema.index({
  timestamp: 1,
});

clickSchema.index({
  url: 1,
  country: 1,
});

clickSchema.index({
  url: 1,
  device: 1,
});

clickSchema.index({
  url: 1,
  browser: 1,
});

export default mongoose.model(
 "Click",
 clickSchema
);