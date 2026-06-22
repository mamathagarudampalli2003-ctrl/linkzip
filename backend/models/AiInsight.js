import mongoose from "mongoose";

const aiInsightSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "User",
      },

      url: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: "Url",
      },

      insight: String,

      recommendation: String,

      score: Number,
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "AiInsight",
  aiInsightSchema
);